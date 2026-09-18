import { CommunicationLesson } from '../types';

export const COMMUNICATION_LESSONS: CommunicationLesson[] = [
  {
    id: 'comm-1',
    order: 1,
    title: 'Self Introduction (Tell Me About Yourself)',
    summary: 'Master introducing yourself with confidence in class, presentations, and interviews.',
    explanationUrdu: 'اپنا تعارف کروانا یونیورسٹی اور انٹرویو کا پہلا مرحلہ ہوتا ہے۔ اپنا نام، تعلیم، دلچسپی اور مقصد 30 سے 45 سیکنڈ میں بتانا سیکھیں۔',
    keyTechniques: [
      'Use the Present + Past + Future formula (What you do now, your background, and your future ambition).',
      'Smile, keep upright posture, and speak at a steady pace.',
      'Never memorize like a robot—connect genuinely.',
    ],
    realWorldScenarios: [
      {
        situation: 'Classroom First Day Introduction',
        goodPhrase: 'Good morning everyone! My name is Usman, and I am a second-semester Software Engineering student.',
        avoidPhrase: 'Myself Usman and I come from Lahore.',
        urduTip: 'کبھی بھی "Myself Usman" مت کہیں، ہمیشہ "My name is..." یا "I am..." بولیں۔',
      },
      {
        situation: 'Group Project Icebreaker',
        goodPhrase: 'Hi team, I am excited to collaborate on this project. I am comfortable handling the research and presentation slides.',
        avoidPhrase: 'I will do whatever you guys tell me.',
        urduTip: 'پراعتماد انداز میں بتائیں کہ آپ پروجیکٹ میں کیا تعاون کر سکتے ہیں۔',
      },
    ],
    speakingTask: {
      prompt: 'Introduce yourself to your university class in 3-4 sentences: your name, your department, one skill you enjoy, and your goal for this semester.',
      outline: ['Greeting & Name', 'Department / University', 'Interests or Hobbies', 'Semester Goal'],
      sampleResponse: 'Hello everyone, my name is Bilal. I am currently studying Business Administration at the university. I have a keen interest in digital marketing, and this semester I aim to sharpen my presentation and public speaking skills.',
    },
    quiz: {
      question: 'Which is the most professional way to start introducing yourself in English?',
      options: ['Myself Ali.', 'Hello everyone, my name is Ali.', 'I am myself Ali.', 'Ali is my good name.'],
      correctIndex: 1,
      explanationUrdu: '"Hello everyone, my name is Ali" سب سے معیاری اور قدرتی طریقہ ہے۔',
    },
  },
  {
    id: 'comm-2',
    order: 2,
    title: 'Effective Communication Principles',
    summary: 'The 7 Cs of communication: Clear, Concise, Concrete, Correct, Coherent, Complete, and Courteous.',
    explanationUrdu: 'مؤثر گفتگو کا مطلب ہے کہ سننے والے کو آپ کی بات فوراً اور بغیر کسی غلط فہمی کے سمجھ آ جائے۔',
    keyTechniques: [
      'Be concise: get to the point without unnecessary repetition.',
      'Check for understanding: "Does that make sense?" or "Would you like me to clarify?"',
      'Choose respectful vocabulary.',
    ],
    realWorldScenarios: [
      {
        situation: 'Explaining a problem to a university teacher',
        goodPhrase: 'Excuse me, Professor. I reviewed the assignment rubric, but I need clarification on question 3.',
        avoidPhrase: 'Sir I don\'t understand anything in your paper.',
        urduTip: 'خاص نقطہ بیان کریں بجائے اس کے کہ مبہم شکایت کریں۔',
      },
    ],
    speakingTask: {
      prompt: 'Explain why effective communication is essential for university students.',
      outline: ['Core reason', 'Impact on grades & team projects', 'Future job benefit'],
      sampleResponse: 'Effective communication is vital for university students because it helps us collaborate smoothly in group assignments, express our ideas to teachers clearly, and build confidence for upcoming job interviews.',
    },
    quiz: {
      question: 'Which of the following makes communication effective?',
      options: ['Using very complicated vocabulary', 'Speaking very loudly', 'Being clear, concise, and respectful', 'Interrupting others quickly'],
      correctIndex: 2,
      explanationUrdu: 'واضح، مختصر اور باادب گفتگو ہی مؤثر ہوتی ہے۔',
    },
  },
  {
    id: 'comm-3',
    order: 3,
    title: 'Verbal Communication & Tone',
    summary: 'Mastering tone of voice, pitch, pace, and vocal clarity in English.',
    explanationUrdu: 'الفاظ کے ساتھ ساتھ آپ کی آواز کا اتار چڑھاؤ (Tone) اور رفتار بتاتی ہے کہ آپ کتنے پراعتماد اور مہذب ہیں۔',
    keyTechniques: [
      'Avoid a monotone voice by varying pitch on key words.',
      'Pause before important ideas instead of using "umm", "err", or "aaah".',
      'Articulate end consonants clearly (e.g. don\'t swallow "t" and "d").',
    ],
    realWorldScenarios: [
      {
        situation: 'Disagreeing politely in a seminar',
        goodPhrase: 'I see your point, however, another perspective to consider is...',
        avoidPhrase: 'No, you are completely wrong.',
        urduTip: 'اختلاف رائے کو نرم لہجے میں پیش کریں تاکہ بحث تلخ نہ ہو۔',
      },
    ],
    speakingTask: {
      prompt: 'Practice speaking at a steady, calm pace: State your opinion about online learning vs classroom learning.',
      outline: ['State preference', 'Give one strong reason', 'Conclusion'],
      sampleResponse: 'In my view, classroom learning is more engaging because it allows direct interaction with teachers and classmates, creating a livelier academic environment.',
    },
    quiz: {
      question: 'When you need a moment to think while speaking, what should you do?',
      options: ['Say "umm ahh" repeatedly', 'Take a calm 1-2 second pause', 'Talk extremely fast', 'Stop talking and walk away'],
      correctIndex: 1,
      explanationUrdu: 'ایک مختصر اور پراعتماد وقفہ (pause) فالتو آوازوں سے ہزار گنا بہتر ہے۔',
    },
  },
  {
    id: 'comm-4',
    order: 4,
    title: 'Non-Verbal Communication & Body Language',
    summary: 'Eye contact, posture, gestures, and active listening cues.',
    explanationUrdu: 'آپ کے چہرے کے تاثرات، ہاتھوں کی حرکات اور آنکھوں کا رابطہ (Eye Contact) الفاظ سے زیادہ اثر رکھتے ہیں۔',
    keyTechniques: [
      'Maintain natural eye contact (not staring, but looking in 3-5 second intervals).',
      'Keep open posture: avoid crossing arms or looking down at your phone.',
      'Nod affirmatively when the teacher or classmate is speaking.',
    ],
    realWorldScenarios: [
      {
        situation: 'During a viva or presentation',
        goodPhrase: 'Smile gently, stand with shoulders back, and look across the panel.',
        avoidPhrase: 'Looking down at the floor or fiddling with a pen.',
        urduTip: 'فرش پر دیکھنے کے بجائے سامنے دیکھ کر بات کریں تاکہ اعتماد جھلکے۔',
      },
    ],
    speakingTask: {
      prompt: 'Describe what good body language looks like during an oral presentation.',
      outline: ['Stance & Posture', 'Eye Contact', 'Hand Gestures'],
      sampleResponse: 'Good body language in a presentation includes standing tall, keeping your shoulders relaxed, making natural eye contact across the audience, and using purposeful hand gestures to emphasize main points.',
    },
    quiz: {
      question: 'Crossing your arms tightly across your chest during a discussion usually signals:',
      options: ['Defensiveness or being closed off', 'Extreme enthusiasm', 'Great listening skills', 'Deep happiness'],
      correctIndex: 0,
      explanationUrdu: 'ہاتھ باندھ کر کھڑے ہونا عام طور پر کھچاؤ یا بے رغبتی کا اشارہ سمجھا جاتا ہے۔',
    },
  },
  {
    id: 'comm-5',
    order: 5,
    title: 'Active Listening Skills',
    summary: 'Listening to understand, not just to reply. Paraphrasing and confirming.',
    explanationUrdu: 'ایک اچھا بولنے والا بننے سے پہلے اچھا سننے والا بننا ضروری ہے تاکہ بات کی گہرائی سمجھ آئے۔',
    keyTechniques: [
      'Don\'t plan your answer while the other person is still talking.',
      'Use reflecting phrases: "So what you mean is...", "If I understand correctly..."',
      'Take brief notes during lectures or team meetings.',
    ],
    realWorldScenarios: [
      {
        situation: 'Confirming teacher\'s assignment instructions',
        goodPhrase: 'Just to confirm, should our report include both the literature review and the data charts?',
        avoidPhrase: 'I forgot what you said.',
        urduTip: 'وضاحت مانگتے ہوئے تصدیق کا انداز اپنائیں: "Just to confirm..."',
      },
    ],
    speakingTask: {
      prompt: 'Practice summarizing what a friend told you about an upcoming quiz.',
      outline: ['Start with confirmation phrase', 'Summarize key detail', 'Verify'],
      sampleResponse: 'If I understand correctly, our teacher mentioned that the quiz will cover chapters 3 and 4, and it will be held on Thursday morning, right?',
    },
    quiz: {
      question: 'What is a key sign of active listening?',
      options: ['Interrupting as soon as you get an idea', 'Nodding, summarizing, and asking clarifying questions', 'Checking notifications on your phone', 'Changing the topic immediately'],
      correctIndex: 1,
      explanationUrdu: 'سر ہلانا، بات کا خلاصہ دہرانا اور وضاحت طلب کرنا فعال سننے کی علامت ہے۔',
    },
  },
  {
    id: 'comm-6',
    order: 6,
    title: 'Asking Questions with Confidence',
    summary: 'Polite formulas for asking questions in lectures, meetings, and seminars.',
    explanationUrdu: 'کلاس میں سوال پوچھتے ہوئے جھجھک محسوس کرنا ایک عام مسئلہ ہے۔ شائستہ فقرے سیکھ کر یہ خوف دور کریں۔',
    keyTechniques: [
      'Use softening words: "Could you please...", "Would you mind...", "I was wondering if..."',
      'Express appreciation after receiving an answer: "Thank you, that clarifies it."',
      'Frame the question specifically rather than broadly.',
    ],
    realWorldScenarios: [
      {
        situation: 'Interrupting politely during a lecture Q&A',
        goodPhrase: 'Pardon me, Sir. Could you please give a brief real-world example of this concept?',
        avoidPhrase: 'Explain this again, I didn\'t get it.',
        urduTip: '"Could you please give an example..." بہت ہی شائستہ انداز ہے۔',
      },
    ],
    speakingTask: {
      prompt: 'Formulate two polite questions you would ask a guest speaker about job opportunities.',
      outline: ['Greeting', 'First question with "Could you..."', 'Second question with "I would like to ask..."'],
      sampleResponse: 'Thank you for your valuable session. Could you please share what skills fresh graduates should focus on first? Also, I would like to ask how your company evaluates internship candidates.',
    },
    quiz: {
      question: 'Which question is phrased most politely?',
      options: ['Tell me what page we are on.', 'Where is the page?', 'Could you please tell me which page we are referring to?', 'What page?'],
      correctIndex: 2,
      explanationUrdu: '"Could you please..." گفتگو میں شائستگی پیدا کرتا ہے۔',
    },
  },
  {
    id: 'comm-7',
    order: 7,
    title: 'Conversation Skills & Small Talk',
    summary: 'Starting, maintaining, and gracefully ending casual conversations with peers.',
    explanationUrdu: 'یونیورسٹی میں نئے دوست بنانے اور کینٹین یا لائبریری میں بات شروع کرنے کا ہنر۔',
    keyTechniques: [
      'Ask open-ended questions (starting with What, How, Why) rather than yes/no questions.',
      'Find common ground (shared classes, difficult assignments, campus events).',
      'Exit politely: "It was great talking to you, I should head to my next class."',
    ],
    realWorldScenarios: [
      {
        situation: 'Meeting a new classmate before lecture starts',
        goodPhrase: 'Hi! Are you taking Professor Tariq\'s course this semester as well? How are you finding it so far?',
        avoidPhrase: 'Do you study here?',
        urduTip: 'اوپن سوال پوچھیں تاکہ دوسرا شخص تفصیل سے بات کر سکے۔',
      },
    ],
    speakingTask: {
      prompt: 'Roleplay a 30-second casual chat with a university classmate about the weather and semester exams.',
      outline: ['Casual greeting', 'Comment on exam schedule', 'Ask their opinion'],
      sampleResponse: 'Hey Hamza! How is your exam preparation going? The schedule seems pretty tight this week with three exams in a row.',
    },
    quiz: {
      question: 'Which question keeps a conversation going best?',
      options: ['Do you like pizza?', 'What did you think of today\'s presentation?', 'Are you a student?', 'Is today Tuesday?'],
      correctIndex: 1,
      explanationUrdu: 'اوپن سوال جیسے "What did you think..." دوسرے کو اپنے خیالات شیئر کرنے کی ترغیب دیتا ہے۔',
    },
  },
  {
    id: 'comm-8',
    order: 8,
    title: 'Formal vs Informal Communication',
    summary: 'Knowing when to use academic/professional English versus casual conversational English.',
    explanationUrdu: 'دوستوں سے گفتگو اور اساتذہ یا جاب انٹرویو میں استعمال ہونے والی انگریزی کا فرق پہچانیں۔',
    keyTechniques: [
      'Avoid slang ("gonna", "wanna", "bro") in emails, reports, and formal talks.',
      'Use formal modal verbs: "May I", "Could you", "Would it be possible".',
      'Replace casual words with academic equivalents (get -> receive, ask for -> request).',
    ],
    realWorldScenarios: [
      {
        situation: 'Requesting an extension on an assignment deadline',
        goodPhrase: 'Dear Dr. Ahmad, I am writing to respectfully request a short extension on the project deadline due to family reasons.',
        avoidPhrase: 'Hey sir, need more time for project, please extend date.',
        urduTip: 'استاد کو ای میل کرتے وقت ہمیشہ باضابطہ اور باادب الفاظ استعمال کریں۔',
      },
    ],
    speakingTask: {
      prompt: 'Translate this informal sentence into professional English: "Gimme your slides coz I wanna copy the notes."',
      outline: ['State formal version', 'Explain why it is better'],
      sampleResponse: 'A formal and polite version would be: "Could you please share your presentation slides with me so I can review the lecture notes?"',
    },
    quiz: {
      question: 'Which phrase is appropriate for a formal email to a university professor?',
      options: ['Hey bro, send me the syllabus', 'Respected Professor, could you please provide the course syllabus?', 'Yo teacher where is syllabus?', 'Send syllabus ASAP'],
      correctIndex: 1,
      explanationUrdu: 'پروفیسر کے لیے ادب و احترام والا جملہ ضروری ہے۔',
    },
  },
  {
    id: 'comm-9',
    order: 9,
    title: 'Group Discussion & Team Collaboration',
    summary: 'Contributing ideas, agreeing, disagreeing diplomatically, and managing time in teams.',
    explanationUrdu: 'یونیورسٹی کے گروپ پروجیکٹس میں اپنا نکتہ نظر رکھنا اور دوسروں کی بات کاٹنا نہیں بلکہ سراہنا۔',
    keyTechniques: [
      'Build on others\' ideas: "Adding to what Sarah mentioned...", "That\'s a great point, and we could also..."',
      'Encourage quiet team members: "Ali, what are your thoughts on this approach?"',
      'Keep the team on track: "Let\'s make sure we stick to the main agenda for today."',
    ],
    realWorldScenarios: [
      {
        situation: 'Brainstorming a project topic',
        goodPhrase: 'I really like that idea. To build on it, we could conduct a survey among second-year students.',
        avoidPhrase: 'That\'s useless, listen to my idea instead.',
        urduTip: 'دوسرے کی بات میں اضافہ کر کے اپنا نقطہ پیش کریں: "To build on that..."',
      },
    ],
    speakingTask: {
      prompt: 'Deliver a short intervention in a team meeting where you propose dividing the research workload.',
      outline: ['Acknowledge the deadline', 'Propose division of tasks', 'Ask for team consensus'],
      sampleResponse: 'Since our project deadline is next Friday, I suggest we split the tasks: two of us can handle data collection while the other two prepare the slide deck. What does everyone think?',
    },
    quiz: {
      question: 'What is the best way to invite a shy teammate into the discussion?',
      options: ['Ignore them completely', 'Say: "Hassan, we would love to hear your input on this"', 'Tell everyone Hassan has no ideas', 'Make all decisions alone'],
      correctIndex: 1,
      explanationUrdu: 'شائستگی سے ان کی رائے مانگنا ٹیم اسپرٹ کو بڑھاتا ہے۔',
    },
  },
  {
    id: 'comm-10',
    order: 10,
    title: 'Presentation Skills & Slide Delivery',
    summary: 'Structuring a presentation: Hook, Agenda, Main Body, Conclusion, and Handling Q&A.',
    explanationUrdu: 'کلاس میں پریزنٹیشن دیتے وقت سلائیڈز پڑھنے کے بجائے سامعین سے بات کرنے کا طریقہ۔',
    keyTechniques: [
      'Follow the 10/20/30 rule or keep slides uncluttered—bullet points, not full paragraphs.',
      'Use transition signposts: "Moving on to my next point...", "Turning our attention to..."',
      'Never read word-for-word from the screen; look at your classmates and teacher.',
    ],
    realWorldScenarios: [
      {
        situation: 'Starting an academic presentation',
        goodPhrase: 'Good morning ladies and gentlemen. Today, I will walk you through the key findings of our research on renewable energy.',
        avoidPhrase: 'Today my topic is renewable energy. (read slides silently)',
        urduTip: 'پرجوش انداز میں تعارف کرائیں اور بتائیں کہ سامعین کیا نیا سیکھیں گے۔',
      },
    ],
    speakingTask: {
      prompt: 'Present the introduction of a topic of your choice in 45 seconds using signposting language.',
      outline: ['Greeting & Hook', 'State Topic', 'Outline 2 main points'],
      sampleResponse: 'Good morning everyone. Have you ever wondered how Artificial Intelligence is reshaping higher education? Today, our team will explore two key dimensions: personalized student learning and ethical considerations.',
    },
    quiz: {
      question: 'Which is a sign of an effective presenter?',
      options: ['Turning back completely to read every line off the slide', 'Speaking in a whisper', 'Making eye contact and using signpost phrases like "Moving to the next point"', 'Rushing through all slides in 30 seconds'],
      correctIndex: 2,
      explanationUrdu: 'سامعین کی طرف دیکھنا اور اشاروں والے فقرے (signposts) استعمال کرنا اچھے مقرر کی پہچان ہے۔',
    },
  },
  {
    id: 'comm-11',
    order: 11,
    title: 'Public Speaking & Overcoming Stage Fear',
    summary: 'Managing nerves, breathing techniques, stage presence, and engaging an audience.',
    explanationUrdu: 'مجمع کے سامنے بولتے وقت ہاتھ کانپنا یا گلا خشک ہونا عام بات ہے۔ اس خوف پر قابو پانے کی تکنیک۔',
    keyTechniques: [
      'Take 3 deep diaphragmatic breaths before taking the stage.',
      'Reframe nervousness as excitement ("My body is getting energized to share my knowledge").',
      'Pick 3 friendly faces in different parts of the hall and talk directly to them.',
    ],
    realWorldScenarios: [
      {
        situation: 'Speaking at a university student society event',
        goodPhrase: 'Take a calm breath, pause for 2 seconds, look at the audience with a smile, then begin clearly.',
        avoidPhrase: 'Apologizing right at the start: "Sorry I am very bad at English."',
        urduTip: 'کبھی بھی شروع میں یہ مت کہیں کہ "میری انگلش خراب ہے"، اعتماد سے شروع کریں۔',
      },
    ],
    speakingTask: {
      prompt: 'Deliver an inspiring 30-second speech about never giving up on learning English.',
      outline: ['Core message', 'Personal reflection', 'Encouraging call to action'],
      sampleResponse: 'Learning a language is not about being flawless; it is about having the courage to speak up every single day. Every mistake we make is simply proof that we are trying and growing.',
    },
    quiz: {
      question: 'If you feel nervous right before speaking in public, what should you do?',
      options: ['Immediately apologize for your poor English', 'Take slow deep breaths and focus on delivering value', 'Run out of the room', 'Drink 5 cups of strong coffee'],
      correctIndex: 1,
      explanationUrdu: 'گہرے سانس لیں اور اس بات پر توجہ دیں کہ آپ دوسروں کو کیا فائدہ پہنچا رہے ہیں۔',
    },
  },
  {
    id: 'comm-12',
    order: 12,
    title: 'Interview Skills & Behavioral Questions',
    summary: 'Structuring answers with the STAR method (Situation, Task, Action, Result).',
    explanationUrdu: 'انٹرویو میں پوچھے جانے والے سوالات کے جامع اور مدلل جوابات دینے کا طریقہ۔',
    keyTechniques: [
      'STAR Method: Situation (set context), Task (challenge), Action (what you specifically did), Result (outcome).',
      'Highlight soft skills: teamwork, problem solving, adaptability.',
      'Prepare thoughtful questions to ask the interviewer at the end.',
    ],
    realWorldScenarios: [
      {
        situation: 'Answering: "Tell me about a time you faced a challenge in a project."',
        goodPhrase: 'In our 3rd semester database project, our dataset had errors (Situation). My task was to clean it (Task). I wrote a Python validation script (Action), which allowed us to submit on time and score an A (Result).',
        avoidPhrase: 'My group members were very lazy and did nothing.',
        urduTip: 'دوسروں پر الزامات لگانے کے بجائے اپنے کیے گئے مثبت کام اور حل (Action & Result) پر فوکس کریں۔',
      },
    ],
    speakingTask: {
      prompt: 'Answer the question: "Why do you want to join our university internship program?"',
      outline: ['Passion for learning', 'Relevance to studies', 'What you can contribute'],
      sampleResponse: 'I want to join this internship program because your organization is renowned for innovation. This opportunity will allow me to apply my academic knowledge to real-world projects while learning from seasoned professionals.',
    },
    quiz: {
      question: 'What does the "A" in the STAR interview technique stand for?',
      options: ['Argument', 'Action', 'Agreement', 'Apology'],
      correctIndex: 1,
      explanationUrdu: 'STAR میں "A" سے مراد "Action" یعنی آپ کا کیا گیا عمل ہے۔',
    },
  },
  {
    id: 'comm-13',
    order: 13,
    title: 'Professional Workplace Communication',
    summary: 'Workplace etiquette, giving status updates, asking for help without sounding helpless.',
    explanationUrdu: 'دفتر اور انٹرن شپ میں سینئرز اور کولیگز کے ساتھ پروفیشنل طریقے سے گفتگو کا سلیقہ۔',
    keyTechniques: [
      'Provide concise status updates: What is done, what is in progress, any blockers.',
      'Ask for feedback constructively: "What are one or two areas where I could refine this draft?"',
      'Respect colleagues\' time by being punctual for meetings.',
    ],
    realWorldScenarios: [
      {
        situation: 'Giving a daily update to a team lead',
        goodPhrase: 'Good morning, Team Lead. Yesterday I completed the module testing. Today I am documenting the API endpoints, with no blockers so far.',
        avoidPhrase: 'I did some stuff yesterday and today I will do some more.',
        urduTip: 'واضح اور مخصوص الفاظ میں بتائیں کہ کیا کام مکمل ہوا اور آگے کیا ہے۔',
      },
    ],
    speakingTask: {
      prompt: 'Give a 30-second standup meeting update about your coursework progress.',
      outline: ['Completed task', 'Today\'s priority', 'Blocker or assistance needed'],
      sampleResponse: 'Hi team. Yesterday, I finalized the literature review section. Today, my primary focus is drafting the methodology. I might need 10 minutes with Hassan to review the survey questionnaire.',
    },
    quiz: {
      question: 'Which status update is the most professional?',
      options: ['Everything is cool bro.', 'I am busy doing work.', 'I finished the data cleanup yesterday, and today I am drafting the summary report.', 'Don\'t ask me right now.'],
      correctIndex: 2,
      explanationUrdu: 'مخصوص نتائج اور آج کی ترجیح بتانا ہی پروفیشنل طریقہ ہے۔',
    },
  },
  {
    id: 'comm-14',
    order: 14,
    title: 'Professional Email & Written Etiquette',
    summary: 'Subject lines, salutations, body structure, action items, and professional sign-offs.',
    explanationUrdu: 'پروفیسرز اور اداروں کو شائستہ اور مؤثر ای میلز لکھنے کا باقاعدہ فارمیٹ۔',
    keyTechniques: [
      'Write a clear subject line (e.g., "Inquiry Regarding Midterm Exam Syllabus - CS201").',
      'Use proper salutations ("Dear Dr. Khan", "Dear Professor Fatima").',
      'Keep paragraphs short (2-3 sentences max) and use bullet points for lists.',
      'Sign off professionally ("Best regards", "Sincerely", followed by Full Name and Student ID).',
    ],
    realWorldScenarios: [
      {
        situation: 'Emailing a professor for an appointment',
        goodPhrase: 'Dear Professor Bilal, I hope this email finds you well. Could I schedule a brief 15-minute appointment during your office hours this Wednesday to discuss my semester project proposal? Sincerely, Ali Khan (ID: 24102).',
        avoidPhrase: 'Sir meet me in your office.',
        urduTip: 'وقت کی گنجائش مانگیں اور اپنا تعارف و مقصد پہلی ہی سطر میں واضح کریں۔',
      },
    ],
    speakingTask: {
      prompt: 'Dictate a spoken version of a polite email asking for recommendation letter for a scholarship.',
      outline: ['Salutation', 'State scholarship opportunity', 'Request recommendation', 'Attach resume & deadline'],
      sampleResponse: 'Dear Professor Nadeem, I hope you are having a pleasant week. I am applying for the Higher Education Scholarship and would be deeply honored if you could write a letter of recommendation on my behalf. I have attached my updated CV and transcript for your reference. The deadline is October 15th. Thank you for your continued mentorship. Sincerely, Usman.',
    },
    quiz: {
      question: 'Which subject line is most effective for an email to a teacher?',
      options: ['Urgent please open', 'Assignment Question - CS101 - Usman Tariq', 'Hey', 'No subject'],
      correctIndex: 1,
      explanationUrdu: 'سبجیکٹ میں موضوع، کورس کوڈ اور اپنا نام ہونا چاہیے تاکہ استاد فوراً پہچان سکیں۔',
    },
  },
];
