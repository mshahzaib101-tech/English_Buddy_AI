import { PresentationTopic, InterviewScenario } from '../types';

export interface ScenarioItem {
  id: string;
  category: 'Daily Life' | 'University' | 'Professional' | 'Social' | 'Communication Skills';
  title: string;
  starterPrompt: string;
  contextUrdu: string;
  suggestedVocab: string[];
}

export interface RoleplayScenario {
  id: string;
  title: string;
  studentRole: string;
  aiRole: string;
  setting: string;
  systemPromptAddon: string;
  firstAiMessage: string;
  urduTip: string;
}

export const CONVERSATION_SCENARIOS: ScenarioItem[] = [
  // Daily Life
  {
    id: 'sc-dl-1',
    category: 'Daily Life',
    title: 'Morning Routine',
    starterPrompt: 'Hello! What time did you wake up this morning, and what is the first thing you do?',
    contextUrdu: 'صبح جاگنے، ناشتہ کرنے اور دن کے آغاز کے بارے میں آسان انگریزی میں بات کریں۔',
    suggestedVocab: ['wake up', 'breakfast', 'get ready', 'commute', 'energetic'],
  },
  {
    id: 'sc-dl-2',
    category: 'Daily Life',
    title: 'Family & Home',
    starterPrompt: 'Tell me a little about your family. Who do you spend the most time with at home?',
    contextUrdu: 'اپنے بہن بھائیوں، والدین اور گھر کے ماحول کے متعلق جملے بنائیں۔',
    suggestedVocab: ['siblings', 'supportive', 'gather', 'dinner', 'chores'],
  },
  {
    id: 'sc-dl-3',
    category: 'Daily Life',
    title: 'Friends & Hobbies',
    starterPrompt: 'What hobbies do you enjoy when you are not studying? Do you play any sports or games with friends?',
    contextUrdu: 'اپنے فارغ وقت، پسندیدہ کھیلوں اور دوستوں کے ساتھ سرگرمیوں پر گفتگو کریں۔',
    suggestedVocab: ['leisure', 'cricket', 'video games', 'unwind', 'hang out'],
  },
  {
    id: 'sc-dl-4',
    category: 'Daily Life',
    title: 'Weekend Plans',
    starterPrompt: 'How do you usually spend your weekends? Are you planning to relax or catch up on studies?',
    contextUrdu: 'ہفتہ اور اتوار کو آپ کیا کرتے ہیں؟ مستقبل کے جملے استعمال کریں۔',
    suggestedVocab: ['weekend', 'relax', 'catch up', 'outing', 'schedule'],
  },
  {
    id: 'sc-dl-5',
    category: 'Daily Life',
    title: 'Food & Cooking',
    starterPrompt: 'What is your favorite food? Do you enjoy eating homemade food or dining out?',
    contextUrdu: 'کھانے پینے، بریانی، چائے اور پسندیدہ کھانوں کا ذکر کریں۔',
    suggestedVocab: ['delicious', 'cuisine', 'spicy', 'homemade', 'dining'],
  },
  {
    id: 'sc-dl-6',
    category: 'Daily Life',
    title: 'Shopping & Market',
    starterPrompt: 'Imagine you are shopping for a new pair of shoes or books. How do you describe what you need?',
    contextUrdu: 'دکان پر خریداری، قیمت پوچھنے اور پسند ناپسند بتانے کا طریقہ۔',
    suggestedVocab: ['budget', 'quality', 'discount', 'browse', 'receipt'],
  },
  {
    id: 'sc-dl-7',
    category: 'Daily Life',
    title: 'Travel & Commuting',
    starterPrompt: 'How do you travel to your university every day? Is the traffic manageable?',
    contextUrdu: 'بس، بائیک یا رکشہ کے سفر اور ٹریفک کے تجربات بتائیں۔',
    suggestedVocab: ['public transport', 'traffic jam', 'commute', 'distance', 'punctual'],
  },

  // University
  {
    id: 'sc-uni-1',
    category: 'University',
    title: 'Introducing Yourself in Class',
    starterPrompt: 'Welcome to our semester! Could you please introduce yourself to the class?',
    contextUrdu: 'کلاس کے پہلے دن استاد اور ہم جماعتوں کے سامنے پراعتماد تعارف۔',
    suggestedVocab: ['department', 'semester', 'aspire', 'keen', 'background'],
  },
  {
    id: 'sc-uni-2',
    category: 'University',
    title: 'Talking to Classmates',
    starterPrompt: 'Hey! Did you take notes during the morning mathematics lecture? That was quite fast!',
    contextUrdu: 'ہم جماعت کے ساتھ نوٹس مانگنے اور لیکچر کے بارے میں بات کرنے کی مشق۔',
    suggestedVocab: ['lecture notes', 'confusing', 'revision', 'library', 'share'],
  },
  {
    id: 'sc-uni-3',
    category: 'University',
    title: 'Talking to a Professor',
    starterPrompt: 'Good afternoon, Professor. I came to your office to discuss my midterm exam paper.',
    contextUrdu: 'استاد کے دفتر میں شائستگی سے اپنی غلطیوں یا گریڈ پر رہنمائی حاصل کریں۔',
    suggestedVocab: ['office hours', 'feedback', 'clarify', 'improve', 'grateful'],
  },
  {
    id: 'sc-uni-4',
    category: 'University',
    title: 'Asking Questions in Class',
    starterPrompt: 'Excuse me, Sir. Could you please explain the difference between the two terms you just mentioned?',
    contextUrdu: 'کلاس میں استاد سے بغیر کسی خوف یا جھجھک کے سوال پوچھنا۔',
    suggestedVocab: ['pardon me', 'could you clarify', 'example', 'concept', 'distinction'],
  },
  {
    id: 'sc-uni-5',
    category: 'University',
    title: 'Group Project Discussion',
    starterPrompt: 'Okay team, we need to divide the four parts of our project report. Who wants to take the research part?',
    contextUrdu: 'گروپ ممبرز کے ساتھ کام کی تقسیم اور ڈیڈ لائن طے کرنا۔',
    suggestedVocab: ['deadline', 'contribution', 'workload', 'coordinate', 'slides'],
  },
  {
    id: 'sc-uni-6',
    category: 'University',
    title: 'Asking for Help from a Senior',
    starterPrompt: 'Hello senior! Could you please share some advice on how to prepare for this professor\'s exam?',
    contextUrdu: 'یونیورسٹی کے سینئرز سے گائیڈنس اور ماضی کے پرچوں کے بارے میں رہنمائی۔',
    suggestedVocab: ['guidance', 'past papers', 'strategy', 'recommendation', 'valuable'],
  },

  // Professional
  {
    id: 'sc-prof-1',
    category: 'Professional',
    title: 'Job Interview Practice',
    starterPrompt: 'Welcome to the interview. Could you walk me through your resume and why you are interested in this position?',
    contextUrdu: 'نوکری کے انٹرویو میں پراعتماد اور باضابطہ انداز میں گفتگو۔',
    suggestedVocab: ['qualification', 'strength', 'experience', 'contribute', 'growth'],
  },
  {
    id: 'sc-prof-2',
    category: 'Professional',
    title: 'Internship Interview',
    starterPrompt: 'Why did you choose our company for your summer internship program?',
    contextUrdu: 'انٹرن شپ کے لیے اپنے سیکھنے کا جذبہ ظاہر کرنے کے جملے۔',
    suggestedVocab: ['hands-on experience', 'mentorship', 'industry', 'eager', 'skills'],
  },
  {
    id: 'sc-prof-3',
    category: 'Professional',
    title: 'Giving a Daily Work Update',
    starterPrompt: 'Hi, what progress did you make on the project yesterday, and what are you tackling today?',
    contextUrdu: 'مینیجر یا ٹیم لیڈ کو اپنے کام کی مختصر اور جامع رپورٹ پیش کرنا۔',
    suggestedVocab: ['progress', 'blockers', 'finalized', 'in-progress', 'milestone'],
  },

  // Social
  {
    id: 'sc-soc-1',
    category: 'Social',
    title: 'Meeting Someone New',
    starterPrompt: 'Hi there! I don\'t think we have met before. Are you also attending this campus seminar?',
    contextUrdu: 'نئے لوگوں سے دوستانہ انداز میں ہیلو کہنا اور بات آگے بڑھانا۔',
    suggestedVocab: ['pleased to meet you', 'first time', 'connect', 'campus', 'interesting'],
  },
  {
    id: 'sc-soc-2',
    category: 'Social',
    title: 'Ordering at a Cafe / Restaurant',
    starterPrompt: 'Good evening! Welcome to the student cafe. What would you like to order today?',
    contextUrdu: 'ریستوران میں آرڈر دینے اور بل کی ادائیگی کے طریقے پر گفتگو۔',
    suggestedVocab: ['menu', 'recommendation', 'beverage', 'bill', 'takeaway'],
  },

  // Communication Skills
  {
    id: 'sc-comm-1',
    category: 'Communication Skills',
    title: 'Expressing Opinions Respectfully',
    starterPrompt: 'Some students think exams should be replaced by practical projects. What is your stance on this?',
    contextUrdu: 'تہذیب کے ساتھ اپنی رائے پیش کریں اور دلائل دیں۔',
    suggestedVocab: ['in my opinion', 'furthermore', 'on the other hand', 'evidence', 'balance'],
  },
  {
    id: 'sc-comm-2',
    category: 'Communication Skills',
    title: 'Handling a Disagreement Diplomatically',
    starterPrompt: 'A teammate says: "Your suggested topic is too hard, we should do something very easy." How do you reply politely?',
    contextUrdu: 'دوسرے کی بات رد کرنے کے بجائے سمجھوتے کا راستہ نکالنے کے فقرے۔',
    suggestedVocab: ['appreciate your concern', 'alternative', 'break it down', 'feasible', 'compromise'],
  },
];

export const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  {
    id: 'rp-1',
    title: 'Student & Professor',
    studentRole: 'University Student',
    aiRole: 'Professor Tariq',
    setting: 'Faculty Office, Department of Computing',
    systemPromptAddon: 'You are Professor Tariq, a warm, encouraging, but academically rigorous university professor. Speak gently and clearly in simple English suitable for a beginner/elementary student. If the student makes a grammar error, gently model the correct phrase and explain why in 1 simple Urdu sentence.',
    firstAiMessage: 'Good day! Come on in and have a seat. How can I assist you with your studies today?',
    urduTip: 'استاد سے بات کرتے ہوئے شائستہ القاب (Professor / Sir) اور "Could you please..." استعمال کریں۔',
  },
  {
    id: 'rp-2',
    title: 'Job Candidate & Interviewer',
    studentRole: 'Job Candidate',
    aiRole: 'HR Manager Sarah',
    setting: 'Software House Conference Room',
    systemPromptAddon: 'You are HR Manager Sarah. You are interviewing a fresh graduate student. Ask one question at a time. Be professional and encouraging. If they speak with broken English, help them rephrase naturally with a quick Urdu translation of the ideal phrase.',
    firstAiMessage: 'Welcome to TechNova Solutions! Thank you for coming in today. To start off, could you please introduce yourself and tell me what inspired you to apply for this role?',
    urduTip: 'اپنا تعارف کراتے ہوئے نام، یونیورسٹی اور اپنی قابلیت کا ذکر کریں۔',
  },
  {
    id: 'rp-3',
    title: 'Customer & Bookstore Assistant',
    studentRole: 'Customer',
    aiRole: 'Bookstore Assistant John',
    setting: 'University Bookshop',
    systemPromptAddon: 'You are John, a friendly university bookshop attendant. Help the student find textbooks, ask about their semester courses, and guide them politely.',
    firstAiMessage: 'Hello there! Welcome to the University Bookstore. Are you looking for any specific course textbook or stationery today?',
    urduTip: '"I am looking for..." یا "Do you have..." کہہ کر کتاب کے بارے میں پوچھیں۔',
  },
  {
    id: 'rp-4',
    title: 'Traveler & Airport Staff',
    studentRole: 'Student Traveling for a Conference',
    aiRole: 'Airport Check-in Officer Emily',
    setting: 'International Departure Counter',
    systemPromptAddon: 'You are Emily, a helpful airline check-in officer. Ask for passport/ticket, ask about luggage, and guide the passenger in simple, clear English.',
    firstAiMessage: 'Good morning, welcome to Emirates Airlines. May I please have your passport and ticket confirmation?',
    urduTip: 'پاسپورٹ اور ٹکٹ پیش کرتے ہوئے "Here you go" یا "Here it is" کہیں۔',
  },
];

export const PRESENTATION_TOPICS: PresentationTopic[] = [
  {
    id: 'pres-1',
    title: 'Artificial Intelligence in Education',
    category: 'Technology',
    description: 'Explain how AI tools are transforming how university students learn and research.',
    suggestedDuration: '1 - 2 minutes',
    outline: [
      'Hook: AI is no longer the future, it is already here in our classrooms.',
      'Main Point 1: Personalized learning (students learn at their own speed).',
      'Main Point 2: Ethical use (avoiding copy-pasting, using AI as a tutor).',
      'Conclusion: AI combined with human effort leads to great academic growth.',
    ],
    usefulPhrases: [
      { en: 'Today, I would like to shed light on...', ur: 'آج میں اس موضوع پر روشنی ڈالنا چاہوں گا...' },
      { en: 'Moving on to my primary point...', ur: 'اپنے بنیادی نقطے کی طرف بڑھتے ہوئے...' },
      { en: 'In conclusion, the key takeaway is...', ur: 'حاصل کلام یہ ہے کہ...' },
    ],
  },
  {
    id: 'pres-2',
    title: 'The Impact of Social Media on Youth',
    category: 'Society',
    description: 'Discuss the benefits of digital connection versus the risks of distraction and screen time.',
    suggestedDuration: '1 - 2 minutes',
    outline: [
      'Introduction: Social media connects billions globally.',
      'Positive aspects: Networking, knowledge sharing, student communities.',
      'Challenges: Digital addiction, sleep disruption, comparison anxiety.',
      'Recommendation: Mindful usage and setting time limits.',
    ],
    usefulPhrases: [
      { en: 'There are two sides to every coin...', ur: 'ہر تصویر کے دو رخ ہوتے ہیں...' },
      { en: 'Studies indicate that excessive screen time...', ur: 'تحقیقات بتاتی ہیں کہ ضرورت سے زیادہ اسکرین ٹائم...' },
    ],
  },
  {
    id: 'pres-3',
    title: 'My University & Future Career Goals',
    category: 'Personal & Academic',
    description: 'Share your academic journey, why you chose your major, and what you aim to achieve after graduation.',
    suggestedDuration: '1 - 2 minutes',
    outline: [
      'My academic major and why I chose it.',
      'Two key skills I have learned so far.',
      'My ambition after graduating (job, research, or entrepreneurship).',
    ],
    usefulPhrases: [
      { en: 'Ever since I enrolled in this degree...', ur: 'جب سے میں نے اس ڈگری میں داخلہ لیا...' },
      { en: 'My ultimate goal is to contribute to...', ur: 'میرا حتمی مقصد یہ ہے کہ میں اپنا کردار ادا کروں...' },
    ],
  },
  {
    id: 'pres-4',
    title: 'Climate Change & Everyday Habits',
    category: 'Environment',
    description: 'Explain simple actions university students can take to protect our environment.',
    suggestedDuration: '1 - 2 minutes',
    outline: [
      'The reality of extreme weather in our region.',
      'Campus initiatives: reducing plastic bottles and planting trees.',
      'Conclusion: Small collective actions create massive change.',
    ],
    usefulPhrases: [
      { en: 'Climate change is no longer a distant threat...', ur: 'ماحولیاتی تبدیلی اب کوئی دور کا خطرہ نہیں رہی...' },
      { en: 'Every small step counts towards...', ur: 'ہر چھوٹا قدم اہم ہے...' },
    ],
  },
];

export const INTERVIEW_SCENARIOS: InterviewScenario[] = [
  {
    id: 'int-1',
    type: 'university',
    title: 'University Admission / Department Viva',
    description: 'Practice questions commonly asked by professors during oral exams, viva voce, or admissions.',
    questions: [
      'Why did you choose this field of study at our university?',
      'What was your favorite subject in your previous semester, and why?',
      'Can you explain one challenging project or topic you worked on?',
      'How do you manage your time between classes, assignments, and personal life?',
    ],
    tipsUrdu: [
      'استاد کو دیکھ کر پرسکون انداز میں جواب دیں۔',
      'اگر کوئی سوال سمجھ نہ آئے تو شائستگی سے پوچھیں: "Could you please rephrase the question, Sir?"',
    ],
  },
  {
    id: 'int-2',
    type: 'internship',
    title: 'Summer Internship Interview',
    description: 'Behavioral and motivation questions for landing your first professional internship.',
    questions: [
      'Tell me about yourself and your primary academic interests.',
      'What technical and soft skills do you hope to develop during this internship?',
      'Describe a situation where you had to work with a difficult teammate in a group project.',
      'Why do you want to intern at our organization specifically?',
    ],
    tipsUrdu: [
      'اپنے پروجیکٹس اور سیکھنے کے جذبے پر زور دیں۔',
      'STAR تکنیک (Situation, Task, Action, Result) استعمال کریں۔',
    ],
  },
  {
    id: 'int-3',
    type: 'scholarship',
    title: 'Merit / Need-Based Scholarship Interview',
    description: 'Convince the panel of your dedication, financial need, and future potential.',
    questions: [
      'How will receiving this scholarship help you accomplish your career dreams?',
      'What academic or community achievements are you most proud of?',
      'Where do you see yourself five years after completing your degree?',
    ],
    tipsUrdu: [
      'سچائی اور عاجزی کے ساتھ اپنے عزائم بیان کریں۔',
      'بتائیں کہ آپ معاشرے کو کیسے فائدہ پہنچائیں گے۔',
    ],
  },
];
