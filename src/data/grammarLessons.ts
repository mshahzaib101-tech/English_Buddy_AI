import { GrammarLesson } from '../types';

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'g1',
    slug: 'am-is-are',
    title: 'am / is / are (Present Be Verbs)',
    category: 'Basic Verbs',
    difficulty: 'beginner',
    summaryUrdu: 'موجودہ حالت، شناخت، یا صفت بتانے کے لیے استعمال ہوتا ہے۔',
    explanation: 'The verbs "am", "is", and "are" are forms of the verb "to be" in the present tense. We use them to describe a state of being, identity, profession, or feeling—not an action.',
    rules: [
      { rule: 'Use "am" with "I"', explanationUrdu: 'صرف "I" کے ساتھ "am" استعمال کریں (I am Ali / I am a student).' },
      { rule: 'Use "is" with singular subjects (He, She, It, Ali, University)', explanationUrdu: 'واحد اسم یا He/She/It کے ساتھ "is" آتا ہے (He is tired / The campus is big).' },
      { rule: 'Use "are" with plural subjects (You, We, They, Students)', explanationUrdu: 'جمع اسم اور You/We/They کے ساتھ "are" آتا ہے (We are classmates / You are smart).' },
      { rule: 'Negative: add "not" after the verb', explanationUrdu: 'انکاری جملے میں بعد میں not لگائیں (I am not late / He is not here).' },
    ],
    examples: [
      { en: 'I am a computer science student.', ur: 'میں کمپیوٹر سائنس کا طالب علم ہوں۔' },
      { en: 'She is very helpful in group projects.', ur: 'وہ گروپ پروجیکٹس میں بہت مددگار ہے۔' },
      { en: 'They are in the university library.', ur: 'وہ یونیورسٹی کی لائبریری میں ہیں۔' },
      { en: 'Is the professor in the office?', ur: 'کیا پروفیسر آفس میں ہیں؟' },
    ],
    commonMistakes: [
      {
        wrong: 'I is student.',
        right: 'I am a student.',
        explanationUrdu: '"I" کے ساتھ ہمیشہ "am" آتا ہے، "is" نہیں۔ ساتھ میں آرٹیکل "a" بھی ضروری ہے۔',
      },
      {
        wrong: 'They is very busy.',
        right: 'They are very busy.',
        explanationUrdu: '"They" جمع ہے، اس لیے "are" لگے گا۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'My brother and I _____ studying for the exam.',
        options: ['am', 'is', 'are', 'be'],
        correctIndex: 2,
        explanationUrdu: 'کیونکہ دو لوگ ہیں ("My brother and I" = We)، اس لیے جمع کا ورب "are" آئے گا۔',
      },
      {
        id: 'q2',
        question: 'The university library _____ quiet today.',
        options: ['are', 'is', 'am', 'were not'],
        correctIndex: 1,
        explanationUrdu: 'Library واحد (singular) ہے، اس لیے "is" صحیح جواب ہے۔',
      },
    ],
    practicePrompts: [
      'Tell the AI who you are and what subject you study using "am".',
      'Describe your university campus using "is" and "are".',
    ],
  },
  {
    id: 'g2',
    slug: 'was-were',
    title: 'was / were (Past Be Verbs)',
    category: 'Basic Verbs',
    difficulty: 'beginner',
    summaryUrdu: 'ماضی میں کسی حالت، موجودگی یا شناخت کو ظاہر کرنے کے لیے۔',
    explanation: '"Was" and "were" are the past tense of "am", "is", and "are". We use them when talking about past states, locations, or situations.',
    rules: [
      { rule: 'Use "was" with I, He, She, It, and Singular Nouns', explanationUrdu: 'I, He, She, It اور واحد نام کے ساتھ "was" آتا ہے۔' },
      { rule: 'Use "were" with You, We, They, and Plural Nouns', explanationUrdu: 'You, We, They اور جمع ناموں کے ساتھ "were" بولا جاتا ہے۔' },
    ],
    examples: [
      { en: 'I was absent yesterday due to fever.', ur: 'میں بخار کی وجہ سے کل غیر حاضر تھا۔' },
      { en: 'The students were nervous before the presentation.', ur: 'طلبہ پریزنٹیشن سے پہلے گھبرائے ہوئے تھے۔' },
      { en: 'It was a difficult lecture.', ur: 'وہ ایک مشکل لیکچر تھا۔' },
    ],
    commonMistakes: [
      {
        wrong: 'We was late for class.',
        right: 'We were late for class.',
        explanationUrdu: '"We" کے ساتھ "were" لگتا ہے، "was" نہیں لگایا جاتا۔',
      },
      {
        wrong: 'Yesterday I were at home.',
        right: 'Yesterday I was at home.',
        explanationUrdu: '"I" کے ساتھ ماضی میں ہمیشہ "was" آتا ہے۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Where _____ you during the morning lecture?',
        options: ['was', 'were', 'is', 'are'],
        correctIndex: 1,
        explanationUrdu: '"You" کے ساتھ ہمیشہ "were" استعمال ہوتا ہے۔',
      },
    ],
    practicePrompts: ['Where were you yesterday at 5 PM? Answer in a full English sentence.'],
  },
  {
    id: 'g3',
    slug: 'have-has',
    title: 'have / has (Possession & Present Perfect)',
    category: 'Basic Verbs',
    difficulty: 'beginner',
    summaryUrdu: 'ملکیت (میرے پاس ہے) یا مکمل شدہ کام بتانے کے لیے۔',
    explanation: 'We use "have" and "has" to show possession (ownership) or in present perfect tense to express an experience or completed task.',
    rules: [
      { rule: 'Use "has" with He, She, It, and singular subjects', explanationUrdu: 'He, She, It اور اکیلے نام کے ساتھ "has" لگائیں۔' },
      { rule: 'Use "have" with I, You, We, They, and plurals', explanationUrdu: 'I, You, We, They اور جمع کے ساتھ "have" لگائیں۔' },
      { rule: 'For negatives, use: don\'t have / doesn\'t have', explanationUrdu: 'انکاری میں "doesn\'t have" بولیں، "doesn\'t has" بالکل غلط ہے۔' },
    ],
    examples: [
      { en: 'I have an assignment due tomorrow.', ur: 'میری کل ایک اسائنمنٹ جمع کروانے کی آخری تاریخ ہے۔' },
      { en: 'She has great communication skills.', ur: 'اس کی بات چیت کی صلاحیتیں بہترین ہیں۔' },
      { en: 'He doesn\'t have a laptop right now.', ur: 'اس کے پاس اس وقت لیپ ٹاپ نہیں ہے۔' },
    ],
    commonMistakes: [
      {
        wrong: 'He doesn\'t has his ID card.',
        right: 'He doesn\'t have his ID card.',
        explanationUrdu: '"doesn\'t" کے بعد ہمیشہ بنیادی لفظ "have" آتا ہے، "has" نہیں!',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'She _____ two presentations this week.',
        options: ['have', 'has', 'having', 'is have'],
        correctIndex: 1,
        explanationUrdu: 'واحد مؤنث "She" کے ساتھ "has" لگے گا۔',
      },
    ],
    practicePrompts: ['List three items you have in your university bag.'],
  },
  {
    id: 'g4',
    slug: 'do-does',
    title: 'do / does (Questions & Negatives)',
    category: 'Present Tense',
    difficulty: 'beginner',
    summaryUrdu: 'موجودہ معمول میں سوال پوچھنے اور انکار کرنے کا بنیادی طریقہ۔',
    explanation: '"Do" and "does" are auxiliary (helping) verbs used to form questions and negative statements in the Present Simple tense.',
    rules: [
      { rule: 'Use "Does" for He, She, It, Singular nouns', explanationUrdu: 'He, She, It کے سوال میں "Does" آتا ہے اور مین ورب سے s/es ہٹ جاتا ہے۔' },
      { rule: 'Use "Do" for I, You, We, They, Plurals', explanationUrdu: 'I, You, We, They کے سوال کے لیے "Do" سے جملہ شروع کریں۔' },
    ],
    examples: [
      { en: 'Do you understand the question?', ur: 'کیا آپ کو سوال سمجھ آیا؟' },
      { en: 'Does the bus stop near the university?', ur: 'کیا بس یونیورسٹی کے پاس رکتی ہے؟' },
      { en: 'He does not attend evening lectures.', ur: 'وہ شام کے لیکچرز میں شرکت نہیں کرتا۔' },
    ],
    commonMistakes: [
      {
        wrong: 'Does he speaks English?',
        right: 'Does he speak English?',
        explanationUrdu: 'جب "Does" آ جائے تو "speaks" کا "s" ختم ہو کر سادہ "speak" بن جاتا ہے۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: '_____ your friend live in the campus hostel?',
        options: ['Do', 'Does', 'Is', 'Are'],
        correctIndex: 1,
        explanationUrdu: '"your friend" ایک شخص ہے، اس لیے "Does" آئے گا۔',
      },
    ],
    practicePrompts: ['Ask your AI tutor a question starting with "Do you..."'],
  },
  {
    id: 'g5',
    slug: 'did',
    title: 'did (Past Simple Questions & Negatives)',
    category: 'Past Tense',
    difficulty: 'beginner',
    summaryUrdu: 'ماضی میں سوال کرنے یا انکار کرنے کا فارمولا (Did + 1st Form)',
    explanation: '"Did" is the past tense auxiliary verb. The golden rule: after "did" or "didn\'t", the main verb MUST be in its base form (1st form), never 2nd form.',
    rules: [
      { rule: 'Did / Didn\'t + Base Form of Verb', explanationUrdu: 'Did یا Didn\'t کے بعد ہمیشہ پہلی فارم لگتی ہے، سیکنڈ فارم نہیں!' },
      { rule: 'Applies to ALL subjects equally', explanationUrdu: 'I, You, He, She, We, They سب کے ساتھ "did" ہی لگتا ہے۔' },
    ],
    examples: [
      { en: 'Did you submit your project?', ur: 'کیا تم نے اپنا پروجیکٹ جمع کروا دیا؟' },
      { en: 'I didn\'t understand the formula.', ur: 'مجھے فارمولا سمجھ نہیں آیا تھا۔' },
      { en: 'Why did she leave early?', ur: 'وہ جلدی کیوں چلی گئی تھی؟' },
    ],
    commonMistakes: [
      {
        wrong: 'I didn\'t went to university yesterday.',
        right: 'I didn\'t go to university yesterday.',
        explanationUrdu: 'انتہائی عام غلطی! "didn\'t" کے بعد "went" نہیں بلکہ پہلی فارم "go" آئے گی۔',
      },
      {
        wrong: 'Did you saw the announcement?',
        right: 'Did you see the announcement?',
        explanationUrdu: '"Did" کے ساتھ "see" لگے گا، "saw" نہیں۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'He didn\'t _____ the email from the university.',
        options: ['received', 'receive', 'receives', 'receiving'],
        correctIndex: 1,
        explanationUrdu: '"didn\'t" کے بعد ورب کی پہلی فارم "receive" آئے گی۔',
      },
    ],
    practicePrompts: ['Tell what you didn\'t do last Sunday using "I didn\'t..."'],
  },
  {
    id: 'g6',
    slug: 'present-simple',
    title: 'Present Simple Tense (Daily Routine & Habits)',
    category: 'Tenses',
    difficulty: 'beginner',
    summaryUrdu: 'روزمرہ کی عادات، معمولات اور حقائق بتانے کے لیے (s / es کا اضافہ)',
    explanation: 'We use the Present Simple tense for general truths, routines, and habits. Add -s or -es when the subject is he, she, it, or a singular noun.',
    rules: [
      { rule: 'Subject + Verb(+s/es) + Object', explanationUrdu: 'واحد فاعل کے ساتھ ورب میں s یا es کا اضافہ کریں۔' },
      { rule: 'Use time words: always, usually, often, everyday', explanationUrdu: 'معمول کے الفاظ جیسے روزانہ، اکثر، ہمیشہ اس میں استعمال ہوتے ہیں۔' },
    ],
    examples: [
      { en: 'I wake up at 7 AM every morning.', ur: 'میں روز صبح 7 بجے جاگتا ہوں۔' },
      { en: 'The professor explains difficult concepts clearly.', ur: 'پروفیسر مشکل تصورات کو واضح انداز میں سمجھاتے ہیں۔' },
      { en: 'Water boils at 100 degrees Celsius.', ur: 'پانی 100 ڈگری سینٹی گریڈ پر ابلتا ہے۔' },
    ],
    commonMistakes: [
      {
        wrong: 'He go to university by bus.',
        right: 'He goes to university by bus.',
        explanationUrdu: '"He" کے ساتھ "go" نہیں بلکہ "goes" بولا جاتا ہے۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'My friend usually _____ notes during the lecture.',
        options: ['take', 'takes', 'taking', 'taken'],
        correctIndex: 1,
        explanationUrdu: '"My friend" واحد ہے اس لیے "takes" صحیح ہے۔',
      },
    ],
    practicePrompts: ['Write or speak 2 sentences about your daily morning routine.'],
  },
  {
    id: 'g7',
    slug: 'present-continuous',
    title: 'Present Continuous (Actions Happening Now)',
    category: 'Tenses',
    difficulty: 'beginner',
    summaryUrdu: 'وہ کام جو اس وقت جاری ہے (am/is/are + verb-ing)',
    explanation: 'Used for actions that are happening right now at the moment of speech, or ongoing projects in your life right now.',
    rules: [
      { rule: 'am/is/are + Verb-ing', explanationUrdu: 'مددگار فعل کے بعد ورب کے ساتھ -ing لگائیں۔' },
      { rule: 'Never skip the "be" verb', explanationUrdu: '"I doing" غلط ہے، "I am doing" کہیں۔' },
    ],
    examples: [
      { en: 'I am preparing my slide presentation right now.', ur: 'میں اس وقت اپنی سلائیڈ پریزنٹیشن تیار کر رہا ہوں۔' },
      { en: 'We are working on a semester project.', ur: 'ہم ایک سمسٹر پروجیکٹ پر کام کر رہے ہیں۔' },
    ],
    commonMistakes: [
      {
        wrong: 'I reading book.',
        right: 'I am reading a book.',
        explanationUrdu: '"am" چھوڑنا غلطی ہے۔ "I am reading" صحیح ہے۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Listen! The teacher _____ important instructions.',
        options: ['is giving', 'gives', 'are giving', 'give'],
        correctIndex: 0,
        explanationUrdu: 'اس لمحے استاد ہدایات دے رہے ہیں، اس لیے "is giving" درست ہے۔',
      },
    ],
    practicePrompts: ['What are you doing right now? Say: "Right now, I am..."'],
  },
  {
    id: 'g8',
    slug: 'past-simple',
    title: 'Past Simple (Completed Actions)',
    category: 'Tenses',
    difficulty: 'elementary',
    summaryUrdu: 'ماضی میں مکمل ہو جانے والے کام کے لیے (Verb 2nd Form)',
    explanation: 'We use the Past Simple tense for actions that started and finished at a specific time in the past (yesterday, last night, two days ago).',
    rules: [
      { rule: 'Positive: Subject + Verb 2nd form', explanationUrdu: 'مثبت جملے میں فعل کی دوسری فارم (went, saw, played) آتی ہے۔' },
      { rule: 'Irregular verbs change forms', explanationUrdu: 'گو (go) کی دوسری فارم وینٹ (went)، بائے (buy) کی باٹ (bought) ہے۔' },
    ],
    examples: [
      { en: 'I went to university yesterday.', ur: 'میں کل یونیورسٹی گیا تھا۔' },
      { en: 'She passed the midterm exam with an A grade.', ur: 'اس نے مڈٹرم امتحان اے گریڈ کے ساتھ پاس کیا۔' },
    ],
    commonMistakes: [
      {
        wrong: 'Yesterday I am go to college.',
        right: 'Yesterday I went to college.',
        explanationUrdu: 'کل کی بات ہے تو "am go" کے بجائے "went" آئے گا۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Last week our group _____ the final project report.',
        options: ['submit', 'submitted', 'submitting', 'submits'],
        correctIndex: 1,
        explanationUrdu: 'ماضی کی بات ہے، اس لیے 2nd form "submitted" استعمال ہوگی۔',
      },
    ],
    practicePrompts: ['Describe one thing you completed yesterday.'],
  },
  {
    id: 'g9',
    slug: 'future',
    title: 'Future Tense (will / going to)',
    category: 'Tenses',
    difficulty: 'elementary',
    summaryUrdu: 'مستقبل کے ارادے اور پیشگوئی (will / be going to)',
    explanation: 'Use "will" for instant decisions, promises, and predictions. Use "be going to" for planned future actions.',
    rules: [
      { rule: 'will + Base verb (1st form)', explanationUrdu: '"will" کے بعد ہمیشہ فعل کی پہلی سادہ فارم آتی ہے۔' },
      { rule: 'am/is/are + going to + verb', explanationUrdu: 'پہلے سے طے شدہ پلان کے لیے "going to" موزوں ہے۔' },
    ],
    examples: [
      { en: 'I will help you with this assignment.', ur: 'میں اس اسائنمنٹ میں آپ کی مدد کروں گا۔' },
      { en: 'We are going to give a presentation on Monday.', ur: 'ہم پیر کو ایک پریزنٹیشن دینے والے ہیں۔' },
    ],
    commonMistakes: [
      {
        wrong: 'I will going to market.',
        right: 'I will go to the market / I am going to go...',
        explanationUrdu: '"will" کے بعد سادھا "go" آئے گا۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Don\'t worry, I _____ send you the PDF notes tonight.',
        options: ['will', 'going to', 'am', 'was'],
        correctIndex: 0,
        explanationUrdu: 'وعدہ اور فوری فیصلے کے لیے "will" درست ہے۔',
      },
    ],
    practicePrompts: ['What will you do after practicing English today?'],
  },
  {
    id: 'g10',
    slug: 'articles',
    title: 'Articles (a, an, the)',
    category: 'Parts of Speech',
    difficulty: 'elementary',
    summaryUrdu: 'عام اور خاص اشیاء کی نشاندہی (a, an, the)',
    explanation: 'Articles define a noun as specific or unspecific. "A" and "an" are indefinite (any one item). "The" is definite (a specific or already known item).',
    rules: [
      { rule: 'Use "an" before vowel sounds (A, E, I, O, U sound)', explanationUrdu: 'آواز وول ہو تو "an" لگائیں (an hour, an apple, an engineer).' },
      { rule: 'Use "a" before consonant sounds', explanationUrdu: 'حروف صحیح کی آواز سے پہلے "a" لگائیں (a university [یو ساؤنڈ], a laptop).' },
      { rule: 'Use "the" when both speaker and listener know which one', explanationUrdu: 'جب خاص یا معلوم چیز ہو تو "the" لگائیں۔' },
    ],
    examples: [
      { en: 'He is an honest person.', ur: 'وہ ایک ایماندار شخص ہے (H خاموش ہے، آواز O کی ہے)۔' },
      { en: 'I study at a university.', ur: 'میں یونیورسٹی میں پڑھتا ہوں ("یو" آواز ہے اس لیے "a" آئے گا)۔' },
      { en: 'The presentation was very clear.', ur: 'وہ پریزنٹیشن بہت واضح تھی۔' },
    ],
    commonMistakes: [
      {
        wrong: 'I have an university degree.',
        right: 'I have a university degree.',
        explanationUrdu: '"University" کی آواز "یو" (consonant sound) سے نکلتی ہے، اس لیے "a" لگے گا۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Our class will start in _____ hour.',
        options: ['a', 'an', 'the', 'no article'],
        correctIndex: 1,
        explanationUrdu: '"Hour" کا تلفظ "آؤر" (vowel sound) سے ہوتا ہے، اس لیے "an" درست ہے۔',
      },
    ],
    practicePrompts: ['Name three items in your room using "a", "an", or "the".'],
  },
  {
    id: 'g11',
    slug: 'prepositions',
    title: 'Prepositions (in, on, at, with, by)',
    category: 'Parts of Speech',
    difficulty: 'elementary',
    summaryUrdu: 'وقت اور جگہ کے حروف ربط (in, on, at کا صحیح چناؤ)',
    explanation: 'Prepositions show relationships between words in time, location, or direction. For time: at (exact time), on (days/dates), in (months/years/long periods).',
    rules: [
      { rule: 'Time: AT specific time (at 3 PM), ON day (on Monday), IN month/year (in July, in 2026)', explanationUrdu: 'وقت کے لیے: at 9:00, on Friday, in September.' },
      { rule: 'Place: AT a point (at the door), ON a surface (on the table), IN an enclosed area (in the classroom)', explanationUrdu: 'جگہ کے لیے: at home, on the desk, in Pakistan.' },
    ],
    examples: [
      { en: 'The lecture begins at 9:00 AM on Monday.', ur: 'لیکچر پیر کے روز صبح 9 بجے شروع ہوگا۔' },
      { en: 'Please submit the assignment in December.', ur: 'براہ کرم دسمبر میں اسائنمنٹ جمع کرائیں۔' },
    ],
    commonMistakes: [
      {
        wrong: 'I will meet you in Monday at the evening.',
        right: 'I will meet you on Monday in the evening.',
        explanationUrdu: 'دن کے لیے "on" اور "in the evening" اصول ہے۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Our final exams begin _____ July.',
        options: ['at', 'on', 'in', 'by'],
        correctIndex: 2,
        explanationUrdu: 'مہینوں کے ساتھ "in" استعمال کیا جاتا ہے۔',
      },
    ],
    practicePrompts: ['Tell your AI tutor what time and day your favorite class is.'],
  },
  {
    id: 'g12',
    slug: 'pronouns',
    title: 'Pronouns (Subject, Object, Possessive)',
    category: 'Parts of Speech',
    difficulty: 'beginner',
    summaryUrdu: 'اسم کی جگہ استعمال ہونے والے الفاظ (I/Me/My, He/Him/His)',
    explanation: 'Pronouns replace nouns so we don’t repeat names. Subject pronouns do the action; object pronouns receive the action; possessive pronouns show ownership.',
    rules: [
      { rule: 'Subject: I, You, He, She, It, We, They', explanationUrdu: 'کام کرنے والا فاعل جملے کے شروع میں آتا ہے۔' },
      { rule: 'Object: Me, You, Him, Her, It, Us, Them', explanationUrdu: 'مفعول فعل کے بعد آتا ہے (Help me / Talk to him).' },
      { rule: 'Possessive: My, Your, His, Her, Our, Their', explanationUrdu: 'ملکیت ظاہر کرنے کے لیے (This is my book).' },
    ],
    examples: [
      { en: 'The teacher praised him for his honest answer.', ur: 'استاد نے ان کے سچے جواب پر ان کی تعریف کی۔' },
      { en: 'Can you help us with this group project?', ur: 'کیا آپ اس گروپ پروجیکٹ میں ہماری مدد کر سکتے ہیں؟' },
    ],
    commonMistakes: [
      {
        wrong: 'Me and Ali went to library.',
        right: 'Ali and I went to the library.',
        explanationUrdu: 'جب آپ خود کام کر رہے ہوں تو "I" استعمال کریں، "Me" نہیں۔ تہذیب کے طور پر دوسرے کا نام پہلے لیں۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'The professor sent the assignment file to _____ yesterday.',
        options: ['we', 'us', 'our', 'ours'],
        correctIndex: 1,
        explanationUrdu: 'حرف ربط (to) کے بعد مفعول ضمیر "us" آئے گا۔',
      },
    ],
    practicePrompts: ['Introduce a friend and their hobby using pronouns.'],
  },
  {
    id: 'g13',
    slug: 'adjectives',
    title: 'Adjectives (Describing Nouns)',
    category: 'Parts of Speech',
    difficulty: 'elementary',
    summaryUrdu: 'کسی چیز یا شخص کی اچھائی، برائی یا حالت بتانے والے الفاظ',
    explanation: 'Adjectives describe, quantify, or identify nouns. In English, adjectives almost always come BEFORE the noun they describe.',
    rules: [
      { rule: 'Adjective + Noun order', explanationUrdu: 'صفت ہمیشہ اسم سے پہلے آتی ہے: "an interesting lecture", نہ کہ "lecture interesting".' },
      { rule: 'Comparatives (-er / more) and Superlatives (-est / most)', explanationUrdu: 'موازنے کے لیے: harder / more difficult; hardest / most difficult.' },
    ],
    examples: [
      { en: 'She gave an impressive presentation.', ur: 'اس نے ایک شاندار پریزنٹیشن دی۔' },
      { en: 'This semester is more challenging than the last one.', ur: 'یہ سمسٹر پچھلے سمسٹر سے زیادہ چیلنجنگ ہے۔' },
    ],
    commonMistakes: [
      {
        wrong: 'He is more taller than me.',
        right: 'He is taller than me.',
        explanationUrdu: '"Taller" کے ساتھ دوبارہ "more" لگانا غلط ہے۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'This is the _____ project I have ever worked on.',
        options: ['more important', 'most important', 'importanter', 'importants'],
        correctIndex: 1,
        explanationUrdu: 'سب سے بڑھ کر بتانے کے لیے "most important" استعمال ہوتا ہے۔',
      },
    ],
    practicePrompts: ['Describe your university library using three adjectives.'],
  },
  {
    id: 'g14',
    slug: 'adverbs',
    title: 'Adverbs (Modifying Verbs & Adjectives)',
    category: 'Parts of Speech',
    difficulty: 'intermediate',
    summaryUrdu: 'کام کا انداز بتانے والے الفاظ (عام طور پر -ly پر ختم ہوتے ہیں)',
    explanation: 'Adverbs describe HOW, WHEN, or WHERE an action happens. Many adverbs of manner are formed by adding -ly to an adjective (quick -> quickly).',
    rules: [
      { rule: 'Adjectives describe things; Adverbs describe actions', explanationUrdu: 'صفت چیز کو بتاتی ہے، جبکہ ایڈورب کام کے انداز کو (Speak clearly).' },
      { rule: 'Irregular: Good (adjective) -> Well (adverb)', explanationUrdu: '"He speaks English well", "He speaks English good" غلط ہے۔' },
    ],
    examples: [
      { en: 'The student explained his viewpoint confidently.', ur: 'طالب علم نے اعتماد سے اپنا نقطہ نظر بیان کیا۔' },
      { en: 'Please speak slowly so everyone can understand.', ur: 'براہ کرم آہستہ بولیں تاکہ سب سمجھ سکیں۔' },
    ],
    commonMistakes: [
      {
        wrong: 'He speaks English very good.',
        right: 'He speaks English very well.',
        explanationUrdu: 'بولنے کے انداز (verb) کی وضاحت کے لیے "well" آتا ہے، "good" نہیں۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'She answered the interviewer\'s questions _____.',
        options: ['polite', 'politely', 'politeness', 'more polite'],
        correctIndex: 1,
        explanationUrdu: 'جواب دینے کے انداز کے لیے adverb یعنی "politely" درست ہے۔',
      },
    ],
    practicePrompts: ['Describe how you would like to speak English in an interview.'],
  },
  {
    id: 'g15',
    slug: 'conjunctions',
    title: 'Conjunctions (and, but, because, although)',
    category: 'Sentence Building',
    difficulty: 'elementary',
    summaryUrdu: 'دو جملوں یا خیالات کو جوڑنے والے کلمات (وجہ، تضاد، اضافہ)',
    explanation: 'Conjunctions connect words, phrases, or clauses together. They make your English sound fluent instead of choppy.',
    rules: [
      { rule: 'and (addition), but (contrast), because (reason), so (result)', explanationUrdu: 'and اضافے کے لیے، but تضاد کے لیے، because وجہ کے لیے، so نتیجے کے لیے۔' },
      { rule: 'although / even though show surprise or contrast', explanationUrdu: 'اگرچہ / باوجود اس کے (Although it rained, he came to class).' },
    ],
    examples: [
      { en: 'I was tired, but I finished my assignment.', ur: 'میں تھکا ہوا تھا، لیکن میں نے اپنی اسائنمنٹ مکمل کی۔' },
      { en: 'He improved his English because he practiced daily.', ur: 'اس کی انگریزی بہتر ہوئی کیونکہ وہ روزانہ مشق کرتا تھا۔' },
    ],
    commonMistakes: [
      {
        wrong: 'Because I was sick, so I could not come.',
        right: 'Because I was sick, I could not come. (or: I was sick, so...)',
        explanationUrdu: 'انگریزی میں "because" اور "so" ایک ہی جملے میں اکٹھے نہیں آتے۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'I wanted to ask a question, _____ I felt nervous.',
        options: ['and', 'but', 'so', 'because'],
        correctIndex: 1,
        explanationUrdu: 'خواہش اور گھبراہٹ کے تضاد کے لیے "but" لگے گا۔',
      },
    ],
    practicePrompts: ['Combine two thoughts about university using "because".'],
  },
  {
    id: 'g16',
    slug: 'question-formation',
    title: 'Question Formation (Wh- Questions & Inversion)',
    category: 'Communication',
    difficulty: 'elementary',
    summaryUrdu: 'سوال پوچھنے کا صحیح سٹرکچر (Wh-word + Helping Verb + Subject + Main Verb)',
    explanation: 'University students must know how to ask questions politely and correctly. The structure is usually: Question Word + Auxiliary Verb + Subject + Main Verb?',
    rules: [
      { rule: 'Question Formula: Q-word + Helper + Subject + Verb', explanationUrdu: 'مثلاً: What do you study? / Where does the professor sit?' },
      { rule: 'Don\'t forget the helping verb in questions', explanationUrdu: '"What you want?" غلط ہے، "What do you want?" درست ہے۔' },
    ],
    examples: [
      { en: 'What time does the semester exam start?', ur: 'سمسٹر امتحان کس وقت شروع ہوتا ہے؟' },
      { en: 'Could you please explain that point again?', ur: 'کیا آپ برائے مہربانی وہ نقطہ دوبارہ سمجھا سکتے ہیں؟' },
    ],
    commonMistakes: [
      {
        wrong: 'Where you are going?',
        right: 'Where are you going?',
        explanationUrdu: 'سوال میں مددگار ورب "are" فاعل "you" سے پہلے آتا ہے۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: '_____ did you discuss in the group meeting?',
        options: ['What', 'Who', 'Where', 'When'],
        correctIndex: 0,
        explanationUrdu: 'موضوع یا مواد معلوم کرنے کے لیے "What" کا لفظ مناسب ہے۔',
      },
    ],
    practicePrompts: ['Ask the AI tutor three questions about improving your English.'],
  },
  {
    id: 'g17',
    slug: 'subject-verb-agreement',
    title: 'Subject-Verb Agreement',
    category: 'Grammar Accuracy',
    difficulty: 'intermediate',
    summaryUrdu: 'فاعل اور فعل کا تال میل (واحد کے ساتھ واحد، جمع کے ساتھ جمع)',
    explanation: 'Singular subjects take singular verbs; plural subjects take plural verbs. This is one of the most tested areas in academic writing and presentations.',
    rules: [
      { rule: 'The subject determines the verb, not the words in between', explanationUrdu: '"The quality of these books is great" (بات quality کی ہو رہی ہے)۔' },
      { rule: '"Everyone", "Each", "Nobody" take singular verbs', explanationUrdu: 'Everyone is ready (are ready نہیں بولا جاتا)۔' },
    ],
    examples: [
      { en: 'The list of shortlisted candidates is published.', ur: 'شارٹ لسٹ امیدواروں کی فہرست شائع ہو چکی ہے (list واحد ہے)۔' },
      { en: 'Everyone in the class has submitted the form.', ur: 'کلاس میں ہر کسی نے فارم جمع کروا دیا ہے۔' },
    ],
    commonMistakes: [
      {
        wrong: 'The students of this university is hard-working.',
        right: 'The students of this university are hard-working.',
        explanationUrdu: 'بات "students" (جمع) کی ہو رہی ہے، اس لیے "are" آئے گا۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Each of the participants _____ given a certificate.',
        options: ['was', 'were', 'are', 'have been'],
        correctIndex: 0,
        explanationUrdu: '"Each" ہمیشہ واحد مانا جاتا ہے، اس لیے "was" درست ہے۔',
      },
    ],
    practicePrompts: ['Write a sentence starting with "Everyone in my class..."'],
  },
  {
    id: 'g18',
    slug: 'common-mistakes',
    title: 'Common University Student Mistakes',
    category: 'Mistake Review',
    difficulty: 'elementary',
    summaryUrdu: 'پاکستانی اور یونیورسٹی طلبہ کی سب سے عام بول چال کی غلطیاں اور ان کا حل',
    explanation: 'Many non-native English speakers directly translate Urdu idioms into English. Learning these frequent fixes instantly boosts your spoken fluency.',
    rules: [
      { rule: 'Say "discuss the topic", NOT "discuss about the topic"', explanationUrdu: '"Discuss" کے ساتھ "about" مت لگائیں۔' },
      { rule: 'Say "cousin", NOT "cousin brother / cousin sister"', explanationUrdu: 'صرف "my cousin Ali" یا "my cousin Sara" کہیں۔' },
      { rule: 'Say "revert" means return to state, say "reply to email"', explanationUrdu: 'ای میل کے جواب کے لیے "I will reply" بولیں، "revert back" غیر معیاری ہے۔' },
    ],
    examples: [
      { en: 'Let\'s discuss the semester schedule.', ur: 'آئیے سمسٹر کے شیڈول پر بات کریں۔' },
      { en: 'He graduated from university last year.', ur: 'اس نے پچھلے سال یونیورسٹی سے گریجویشن کی۔' },
    ],
    commonMistakes: [
      {
        wrong: 'We will discuss about this project tomorrow.',
        right: 'We will discuss this project tomorrow.',
        explanationUrdu: '"Discuss" میں "کے بارے میں" کا مفہوم شامل ہے، "about" غیر ضروری ہے۔',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Choose the correct sentence:',
        options: [
          'She gave me an advice.',
          'She gave me a piece of advice.',
          'She gave me advices.',
          'She gave me an advices.',
        ],
        correctIndex: 1,
        explanationUrdu: '"Advice" غیر شمار ہونے والا (uncountable) لفظ ہے، اس کے ساتھ "a piece of advice" کہا جاتا ہے۔',
      },
    ],
    practicePrompts: ['Write a corrected sentence without using "discuss about".'],
  },
];
