import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialization of Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set in environment. Mock fallbacks will be used.');
    }
    genAIClient = new GoogleGenAI({
      apiKey: apiKey || 'dummy-key',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

const MODEL_NAME = 'gemini-3.8-flash';

// Server-side daily request counter for safety limits
let dailyServerRequests = 0;
let lastResetDay = new Date().toISOString().split('T')[0];

function checkAndIncrementQuota(): { allowed: boolean; count: number } {
  const today = new Date().toISOString().split('T')[0];
  if (today !== lastResetDay) {
    dailyServerRequests = 0;
    lastResetDay = today;
  }
  dailyServerRequests += 1;
  // Safety threshold at 250 requests/day per container
  return {
    allowed: dailyServerRequests <= 250,
    count: dailyServerRequests,
  };
}

// 1. Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    requestsToday: dailyServerRequests,
  });
});

// 2. Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const quota = checkAndIncrementQuota();
    if (!quota.allowed) {
      return res.status(429).json({
        error: 'Application daily safety limit reached. Please practice with static lessons and vocabulary flashcards.',
        isQuotaLimit: true,
      });
    }

    const {
      messages,
      scenario = 'General English',
      roleplay,
      studentLevel = 'beginner',
      explanationLang = 'both',
      correctionFrequency = 'normal',
    } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      // Return realistic fallback response
      const lastStudentMsg = messages[messages.length - 1]?.text || 'Hello';
      return res.json({
        reply: `That is a good sentence! I understood you well. Could you tell me more about what you enjoy most about your studies?`,
        correction: lastStudentMsg.toLowerCase().includes('go') ? 'I go to university every day.' : null,
        explanationUrdu: 'روزمرہ معمول کے لیے فعل کی پہلی فارم استعمال کی جاتی ہے۔',
        suggestedVocabulary: ['semester', 'curriculum'],
      });
    }

    const ai = getGemini();

    const systemInstruction = `You are Alex, a remarkably patient, kind, and encouraging English tutor for a Pakistani university student whose English is weak.
Student English Level: ${studentLevel} (Beginner = use short, clear 5-8 word sentences, simple words, no jargon).
Current Scenario: ${scenario}
Roleplay context: ${roleplay || 'None, you are tutor Alex speaking with student'}.
Preferred Explanation Language: ${explanationLang}.
Correction Frequency: ${correctionFrequency}.

RULES:
1. Speak simple, natural, and friendly English.
2. Ask ONLY ONE question at a time so the student is never overwhelmed.
3. Prioritize genuine communication. Never insult, embarrass, or say harsh words like "Wrong!".
4. If the student makes a clear grammar, tense, or preposition mistake:
   - Provide a gentle, natural correction.
   - Explain the mistake simply in Urdu (or Roman Urdu like "Yesterday past time hai is liye went use hoga").
5. If the student answered well, encourage them: "Well said!", "Nice sentence!", or "Almost there!".
6. Output MUST be valid JSON with this exact schema:
{
  "reply": "string (your friendly spoken response to the student with exactly one simple follow-up question)",
  "correction": "string or null (the corrected sentence if student made a mistake, otherwise null)",
  "explanationUrdu": "string or null (simple Urdu explanation for the grammar correction, otherwise null)",
  "suggestedVocabulary": ["array of 1 or 2 relevant words"]
}`;

    const formattedHistory = messages.map((m: any) => `${m.sender === 'student' ? 'Student' : 'Alex'}: ${m.text}`).join('\n');

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Conversation History:\n${formattedHistory}\n\nRespond as Alex to the latest student message. Return strictly valid JSON:`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING },
            correction: { type: Type.STRING },
            explanationUrdu: { type: Type.STRING },
            suggestedVocabulary: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['reply'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Chat endpoint error:', err);
    res.status(500).json({
      error: 'Failed to generate AI response. Please try typing or try again in a moment.',
      details: err.message,
    });
  }
});

// 3. Session summary feedback
app.post('/api/session-summary', async (req: Request, res: Response) => {
  try {
    const { messages, scenario, studentLevel = 'beginner' } = req.body;
    if (!messages || messages.length === 0) {
      return res.json({
        praise: 'Good effort starting the conversation!',
        grammarReview: [],
        vocabularySuggestions: ['focus', 'practice'],
        urduSummary: 'آپ نے بات چیت کی اچھی ابتدا کی۔ روزانہ چند منٹ بولنے سے اعتماد میں اضافہ ہوگا۔',
        scoreIndicator: 'Learning Effort: 100%',
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        praise: 'You communicated your ideas bravely and stayed engaged throughout the conversation!',
        grammarReview: [
          'Watch out for past tense forms (e.g. use "went" instead of "am go").',
          'Use "discuss" without "about".',
        ],
        vocabularySuggestions: ['perspective', 'deadline', 'articulate'],
        urduSummary: 'آپ کی کوشش بہت قابل تحسین رہی۔ جملوں میں ماضی کے صیغوں اور چھوٹے حروف ربط (prepositions) کی مشق پر توجہ دیں۔',
        scoreIndicator: 'Approximate Learning Indicator: 78% (Progressive)',
      });
    }

    const ai = getGemini();
    const convoText = messages.map((m: any) => `${m.sender}: ${m.text}`).join('\n');

    const prompt = `Analyze this English conversation practice session between a university student (Level: ${studentLevel}) and AI tutor.
Scenario: ${scenario}
Transcript:
${convoText}

Provide an encouraging, constructive session summary in JSON:
{
  "praise": "Warm encouraging comment highlighting their courage to speak and effort",
  "grammarReview": ["list of 2-3 specific grammatical patterns they struggled with, with clear corrections"],
  "vocabularySuggestions": ["3 useful university vocabulary words they can adopt"],
  "urduSummary": "A supportive paragraph in simple Urdu summarizing their progress and what to focus on next",
  "scoreIndicator": "e.g. 'Approximate Learning Indicator: 82% (Formative)' - Clearly state it is an approximate learning indicator, not a scientific test"
}`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            praise: { type: Type.STRING },
            grammarReview: { type: Type.ARRAY, items: { type: Type.STRING } },
            vocabularySuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            urduSummary: { type: Type.STRING },
            scoreIndicator: { type: Type.STRING },
          },
          required: ['praise', 'grammarReview', 'vocabularySuggestions', 'urduSummary', 'scoreIndicator'],
        },
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (err: any) {
    console.error('Session summary error:', err);
    res.status(500).json({
      error: 'Failed to generate session summary.',
      details: err.message,
    });
  }
});

// 4. Translation evaluation (Urdu -> English or English -> Urdu)
app.post('/api/translate-evaluate', async (req: Request, res: Response) => {
  try {
    checkAndIncrementQuota();
    const { direction, sourceText, studentAnswer, expectedAnswer, level = 'beginner' } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback evaluation
      const cleanStudent = (studentAnswer || '').trim().toLowerCase().replace(/[.,!?;:]/g, '');
      const cleanExpected = (expectedAnswer || '').trim().toLowerCase().replace(/[.,!?;:]/g, '');
      const isCorrect = cleanStudent === cleanExpected || cleanExpected.includes(cleanStudent);
      return res.json({
        isCorrect,
        scorePercent: isCorrect ? 95 : 65,
        feedback: isCorrect ? 'Excellent translation! Very natural.' : 'Good attempt. Notice the verb tense.',
        naturalCorrection: expectedAnswer,
        explanationUrdu: 'جملے کی ساخت اور ورب کی فارم پر غور کریں۔',
        grammarTopic: 'Sentence Structure & Tenses',
      });
    }

    const ai = getGemini();
    const prompt = `Evaluate the student's translation:
Direction: ${direction === 'urdu_to_english' ? 'Urdu to English' : 'English to Urdu'}
Source Text: "${sourceText}"
Student's Answer: "${studentAnswer}"
Expected Reference: "${expectedAnswer}"
Student Level: ${level}

CRITICAL RULES:
1. Do NOT mark a grammatically correct alternative as wrong simply because it uses different synonyms or word order from the reference!
2. If it conveys the full meaning naturally in good English/Urdu, mark isCorrect: true.
3. If minor grammatical errors exist, mark isCorrect: false, provide the natural correction, and explain in simple Urdu.
4. Score percent should be between 0 and 100.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            scorePercent: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
            naturalCorrection: { type: Type.STRING },
            explanationUrdu: { type: Type.STRING },
            grammarTopic: { type: Type.STRING },
          },
          required: ['isCorrect', 'scorePercent', 'feedback', 'naturalCorrection', 'explanationUrdu', 'grammarTopic'],
        },
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (err: any) {
    console.error('Translate evaluate error:', err);
    res.status(500).json({ error: 'Failed to evaluate translation', details: err.message });
  }
});

// 5. "Correct My English" mode
app.post('/api/correct-english', async (req: Request, res: Response) => {
  try {
    checkAndIncrementQuota();
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        originalText: text,
        correctedText: text.replace(/\bam go\b/gi, 'went').replace(/\bdiscuss about\b/gi, 'discuss'),
        explanationUrdu: 'ماضی کے صیغے اور مناسب الفاظ کے چناؤ کی درستگی کی گئی ہے۔',
        grammarTopic: 'Verb Tenses & Idiomatic Usage',
        exampleSentence: 'I went to the university library to prepare my slides.',
        praise: 'Keep practicing! Writing full sentences is the fastest path to fluency.',
      });
    }

    const ai = getGemini();
    const prompt = `Student input: "${text}"
You are an English tutor for a Pakistani student.
1. Provide the natural, grammatically correct version.
2. Explain the exact mistake in simple, friendly Urdu (e.g. "Yesterday ماضی کا وقت ہے، اس لیے 'went' استعمال ہوگا۔").
3. Give one additional clear example sentence using the same pattern.
4. Identify the grammar topic.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            originalText: { type: Type.STRING },
            correctedText: { type: Type.STRING },
            explanationUrdu: { type: Type.STRING },
            grammarTopic: { type: Type.STRING },
            exampleSentence: { type: Type.STRING },
            praise: { type: Type.STRING },
          },
          required: ['originalText', 'correctedText', 'explanationUrdu', 'grammarTopic', 'exampleSentence', 'praise'],
        },
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (err: any) {
    console.error('Correct English error:', err);
    res.status(500).json({ error: 'Failed to correct sentence', details: err.message });
  }
});

// 6. Presentation Feedback
app.post('/api/presentation-feedback', async (req: Request, res: Response) => {
  try {
    checkAndIncrementQuota();
    const { topic, speechText } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        strengths: ['Clear introduction of the topic', 'Logical flow from problem to solution'],
        grammarCorrections: [
          {
            wrong: 'In our university many student facing this.',
            right: 'In our university, many students face this issue.',
            explanationUrdu: '"Many" کے بعد جمع اسم "students" آئے گا اور ورب "face" ہوگا۔',
          },
        ],
        vocabularyEnhancements: [
          { original: 'very big problem', better: 'significant challenge' },
          { original: 'do something', better: 'take proactive measures' },
        ],
        clarityRating: 'Good - Message was easily understood',
        fillerWordAnalysis: 'Minimal filler words observed; pacing appears consistent.',
        overallTipsUrdu: 'آپ نے موضوع پر اچھے دلائل دیے۔ اگلے مرحلے میں signpost الفاظ (First, Furthermore, In conclusion) کا اضافہ کریں۔',
      });
    }

    const ai = getGemini();
    const prompt = `Topic: "${topic}"
Student's Presentation Speech:
"${speechText}"

Provide detailed, encouraging feedback on:
1. Strengths
2. Grammar corrections (with clear explanations in Urdu)
3. 2-3 Vocabulary upgrades
4. Clarity & organization rating (labeled as approximate learning observation, not clinical assessment)
5. Filler words or repetitive phrasing notes
6. Summary advice in Urdu.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            grammarCorrections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  wrong: { type: Type.STRING },
                  right: { type: Type.STRING },
                  explanationUrdu: { type: Type.STRING },
                },
                required: ['wrong', 'right', 'explanationUrdu'],
              },
            },
            vocabularyEnhancements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  better: { type: Type.STRING },
                },
                required: ['original', 'better'],
              },
            },
            clarityRating: { type: Type.STRING },
            fillerWordAnalysis: { type: Type.STRING },
            overallTipsUrdu: { type: Type.STRING },
          },
          required: ['strengths', 'grammarCorrections', 'vocabularyEnhancements', 'clarityRating', 'fillerWordAnalysis', 'overallTipsUrdu'],
        },
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (err: any) {
    console.error('Presentation feedback error:', err);
    res.status(500).json({ error: 'Failed to analyze presentation', details: err.message });
  }
});

// 7. Interview Response & Questioning
app.post('/api/interview-respond', async (req: Request, res: Response) => {
  try {
    checkAndIncrementQuota();
    const { interviewType, questionIndex, studentAnswer, history = [] } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        evalPraise: 'Solid answer! You highlighted your personal motivation well.',
        betterWording: 'Instead of "I like computers so I do this", consider: "My fascination with technology inspired me to pursue this degree."',
        explanationUrdu: 'جواب میں اپنے شوق کے ساتھ ساتھ اپنی عملی کوششوں کا ذکر کرنا زیادہ مؤثر ہوتا ہے۔',
        nextQuestion: questionIndex < 3 ? 'Could you describe a situation where you had to meet a strict project deadline?' : null,
        isCompleted: questionIndex >= 3,
      });
    }

    const ai = getGemini();
    const prompt = `Interview Type: ${interviewType}
Current Question Index: ${questionIndex}
Student's Answer: "${studentAnswer}"
Interview History: ${JSON.stringify(history)}

Act as an interviewer and coach.
1. Give brief positive evaluation of their answer.
2. Suggest a more polished, professional English wording of what they said.
3. Explain the enhancement in simple Urdu.
4. If questionIndex < 3, provide the next natural interview question. If >= 3, set nextQuestion: null and isCompleted: true.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            evalPraise: { type: Type.STRING },
            betterWording: { type: Type.STRING },
            explanationUrdu: { type: Type.STRING },
            nextQuestion: { type: Type.STRING },
            isCompleted: { type: Type.BOOLEAN },
          },
          required: ['evalPraise', 'betterWording', 'explanationUrdu', 'isCompleted'],
        },
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (err: any) {
    console.error('Interview respond error:', err);
    res.status(500).json({ error: 'Failed to process interview response', details: err.message });
  }
});

// 8. Pronunciation Guide & Word Comparison
app.post('/api/pronunciation-guide', async (req: Request, res: Response) => {
  try {
    const { targetSentence, spokenTranscript } = req.body;
    const targetWords = (targetSentence || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean);
    const spokenWords = (spokenTranscript || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean);

    const spokenSet = new Set(spokenWords);
    const missingWords = targetWords.filter((w: string) => !spokenSet.has(w));
    const matchCount = targetWords.filter((w: string) => spokenSet.has(w)).length;
    const ratio = targetWords.length > 0 ? matchCount / targetWords.length : 1;

    let status: 'Needs practice' | 'Good' | 'Very good' = 'Very good';
    if (ratio < 0.6) {
      status = 'Needs practice';
    } else if (ratio < 0.85) {
      status = 'Good';
    }

    res.json({
      status,
      ratioPercent: Math.round(ratio * 100),
      missingWords,
      matchedWordsCount: matchCount,
      totalWords: targetWords.length,
      disclaimer: 'Note: This comparison is based on browser speech recognition and serves as an approximate learning guide, not an accredited phonetic exam.',
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to evaluate pronunciation', details: err.message });
  }
});

// Vite middleware in dev or static files in prod
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`English Buddy AI Server running on http://0.0.0.0:${PORT}`);
  });
}

setupViteOrStatic();
