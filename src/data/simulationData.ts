export interface SimulationChoice {
  id: string;
  label: string;
  labelAr?: string;
  description: string;
  descriptionAr?: string;
  nextStepId: string;
  tags: string[];
  feedback?: string;
  feedbackAr?: string;
  feedbackType?: "positive" | "neutral" | "caution";
}

export interface SimulationStep {
  id: string;
  title: string;
  titleAr?: string;
  scenario: string;
  scenarioAr?: string;
  context: string;
  contextAr?: string;
  choices: SimulationChoice[];
  isEnd?: boolean;
  endSummary?: string;
  endSummaryAr?: string;
}

export interface UserDecision {
  stepId: string;
  choiceId: string;
  choiceLabel: string;
  choiceLabelAr?: string;
  tags: string[];
  timestamp: number;
  feedback?: string;
  feedbackAr?: string;
  feedbackType?: "positive" | "neutral" | "caution";
}

export const simulationSteps: SimulationStep[] = [
  {
    id: "step-1",
    title: "1. The Emotional Trigger",
    titleAr: "1. المحفز العاطفي",
    scenario: "Your manager calls you into a meeting and says, 'I reviewed your last report. It's not up to our usual standards and missed several key metrics.' You felt proud of that report.",
    scenarioAr: "يدعوك مديرك إلى اجتماع ويقول: 'راجعت تقريرك الأخير. إنه ليس بالمستوى المعتاد وقد فوت عدة مقاييس رئيسية.' كنت تشعر بالفخر بذلك التقرير.",
    context: "PHASE: EMOTION. You feel a surge of heat and your heart rate increases. React to the physical sensation.",
    contextAr: "المرحلة: العاطفة. تشعر بموجة حرارة ويزداد معدل ضربات قلبك. تفاعل مع الشعور الجسدي.",
    choices: [
      {
        id: "1a",
        label: "The Three-Second Breath",
        labelAr: "توقف وتنفس لثلاث ثوانٍ",
        description: "Take a deep breath and count to three before responding. Calm the nervous system.",
        descriptionAr: "خذ نفساً عميقاً وعد إلى ثلاثة قبل الرد. قم بتهدئة الجهاز العصبي.",
        nextStepId: "step-2a",
        tags: ["self-regulated", "conscious"],
        feedback: "Excellent start. By breathing, you've regained control from your Amygdala.",
        feedbackAr: "بداية ممتازة. من خلال التنفس، استعدت السيطرة من اللوزة الدماغية.",
        feedbackType: "positive",
      },
      {
        id: "1b",
        label: "Instant Counter-Argument",
        labelAr: "حجة مضادة فورية",
        description: "Quickly state that the data was late from other departments, causing the metrics to dip.",
        descriptionAr: "وضح بسرعة أن البيانات تأخرت من الإدارات الأخرى، مما تسبب في انخفاض المقاييس.",
        nextStepId: "step-2b",
        tags: ["reactive", "external-blame"],
        feedback: "The 'Fight' response triggered. This often signals defensiveness to the manager.",
        feedbackAr: "تم تفعيل استجابة 'القتال'. هذا غالباً ما يشير إلى الدفاعية للمدير.",
        feedbackType: "caution",
      },
    ],
  },
  {
    id: "step-2a",
    title: "2. Interpretation Phase",
    titleAr: "2. مرحلة التفسير",
    scenario: "You have calmed your physiological response. Now, your internal voice whispers. How do you define this feedback?",
    scenarioAr: "لقد هدأت استجابتك الفسيولوجية. الآن، يهمس صوتك الداخلي. كيف تعرف هذه الملاحظات؟",
    context: "PHASE: INTERPRETATION. Your story determines your next move.",
    contextAr: "المرحلة: التفسير. قصتك تحدد خطوتك التالية.",
    choices: [
      {
        id: "2a1",
        label: "A Data Gift for Growth",
        labelAr: "هدية بيانات للنمو",
        description: "View this as valuable performance data to help you reach the next professional level.",
        descriptionAr: "انظر إلى هذا كبيانات أداء قيمة لمساعدتك في الوصول إلى المستوى المهني التالي.",
        nextStepId: "step-3a",
        tags: ["growth-mindset", "rational"],
        feedback: "Brilliant interpretation. You've turned a threat into an opportunity.",
        feedbackAr: "تفسير رائع. لقد حولت التهديد إلى فرصة.",
        feedbackType: "positive",
      },
      {
        id: "2a2",
        label: "An Unfair Critique",
        labelAr: "نقد غير عادل",
        description: "Think: 'They don't understand how much work I put in. This is personal.'",
        descriptionAr: "تفكير: 'إنهم لا يفهمون مقدار الجهد الذي بذلته. هذا أمر شخصي.'",
        nextStepId: "step-3b",
        tags: ["fixed-mindset", "emotional"],
        feedback: "Personalizing feedback creates a cognitive wall that prevents learning.",
        feedbackAr: "تشخيص الملاحظات يخلق جداراً معرفياً يمنع التعلم.",
        feedbackType: "caution",
      },
    ],
  },
  {
    id: "step-2b",
    title: "2. The Defensive Loop",
    titleAr: "2. الحلقة الدفاعية",
    scenario: "The manager frowns. 'Regardless of the sources, the report is your responsibility.' You feel even more frustrated.",
    scenarioAr: "عقد المدير حاجبيه. 'بغض النظر عن المصادر، التقرير مسؤوليتك.' تشعر بإحباط أكبر.",
    context: "You've entered a reactive loop. Can you re-center your interpretation?",
    contextAr: "لقد دخلت في حلقة رد فعل. هل يمكنك إعادة تركيز تفسيرك؟",
    choices: [
      {
        id: "2b1",
        label: "Pivot to Accountability",
        labelAr: "التحول نحو المسؤولية",
        description: "Acknowledge the responsibility: 'You're right. I am responsible for the final output.'",
        descriptionAr: "الاعتراف بالمسؤولية: 'أنت على حق. أنا مسؤول عن المخرجات النهائية.'",
        nextStepId: "step-3a",
        tags: ["accountable", "resilient"],
        feedback: "Strong pivot. You've successfully broken the defensive cycle.",
        feedbackAr: "تحول قوي. لقد نجحت في كسر الحلقة الدفاعية.",
        feedbackType: "positive",
      },
      {
        id: "2b2",
        label: "Defend Effort Over Outcome",
        labelAr: "الدفاع عن الجهد بدلاً من النتيجة",
        description: "Say, 'I stayed late for a week on this. It's unfair to say it's not up to standard.'",
        descriptionAr: "قل: 'لقد سهرت لأسبوع على هذا. من غير العادل القول إنه ليس بالمستوى.'",
        nextStepId: "step-3b",
        tags: ["effort-focus", "victim-mindset"],
        feedback: "Focusing on effort rather than outcome often frustrates management.",
        feedbackAr: "التركيز على الجهد بدلاً من النتيجة غالباً ما يحبط الإدارة.",
        feedbackType: "caution",
      },
    ],
  },
  {
    id: "step-3a",
    title: "3. Strategic Inquiry",
    titleAr: "3. استقصاء استراتيجي",
    scenario: "You are aligned to learn. You ask for specifics. The manager mentions that the 'Operational Efficiency' section was too vague.",
    scenarioAr: "أنت مستعد للتعلم. تطلب تفاصيل. يشير المدير إلى أن قسم 'الكفاءة التشغيلية' كان غامضاً للغاية.",
    context: "PHASE: REACTION. How do you dig deeper to ensure a better outcome next time?",
    contextAr: "المرحلة: رد الفعل. كيف تتعمق لضمان نتيجة أفضل في المرة القادمة؟",
    choices: [
      {
        id: "3a1",
        label: "Seek Expert Examples",
        labelAr: "البحث عن أمثلة استرشادية",
        description: "Ask, 'Could you show me a report that models the depth you're looking for?'",
        descriptionAr: "اسأل: 'هل يمكنك أن تريني تقريراً يمثل العمق الذي تبحث عنه؟'",
        nextStepId: "step-4a",
        tags: ["solution-seeking", "humble"],
        feedback: "Excellent. Modeling success is the fastest way to improve.",
        feedbackAr: "ممتاز. محاكاة النجاح هي أسرع طريقة للتحسين.",
        feedbackType: "positive",
      },
      {
        id: "3a2",
        label: "Propose an Immediate Fix",
        labelAr: "اقتراح إصلاح فوري",
        description: "Say, 'I'll add the cost-saving percentages and re-submit by 5 PM.'",
        descriptionAr: "قل: 'سأضيف نسب توفير التكاليف وأعيد الإرسال بحلول الساعة 5 مساءً.'",
        nextStepId: "step-4b",
        tags: ["action-oriented", "speed"],
        feedback: "Proactive and fast, which shows high engagement.",
        feedbackAr: "استباقي وسريع، مما يظهر مشاركة عالية.",
        feedbackType: "neutral",
      },
    ],
  },
  {
    id: "step-3b",
    title: "3. The Friction Point",
    titleAr: "3. نقطة الاحتكاك",
    scenario: "The manager sighs. 'I need you to be more proactive about these metrics.' The tension in the room is palpable.",
    scenarioAr: "تنهد المدير. 'أريدك أن تكون أكثر استباقية بشأن هذه المقاييس.' التوتر في الغرفة ملموس.",
    context: "Your internal dialogue is 'Why is this so hard?'. Can you still find a professional path forward?",
    contextAr: "حوارك الداخلي هو 'لماذا هذا صعب للغاية؟'. هل ما زلت تجد مساراً مهنياً للمضي قدماً؟",
    choices: [
      {
        id: "3b1",
        label: "Ask for Support",
        labelAr: "طلب الدعم",
        description: "Acknowledge the gap: 'I see the gap. I'd like to reach that standard—can we have a weekly 10-minute brief?'",
        descriptionAr: "الاعتراف بالفجوة: 'أرى الفجوة. أود الوصول إلى هذا المعيار - هل يمكننا الحصول على إيجاز أسبوعي لمدة 10 دقائق؟'",
        nextStepId: "step-4a",
        tags: ["reparative", "brave"],
        feedback: "Good recovery. Asking for a system shows self-awareness and commitment.",
        feedbackAr: "تعافٍ جيد. طلب نظام عمل يظهر الوعي الذاتي والالتزام.",
        feedbackType: "positive",
      },
      {
        id: "3b2",
        label: "Passive Agreement",
        labelAr: "موافقة سلبية",
        description: "Just nod and say 'Okay, I'll do better next time.'",
        descriptionAr: "اكتفِ بالإيماء والقول 'حسناً، سأفعل بشكل أفضل في المرة القادمة.'",
        nextStepId: "step-4b",
        tags: ["passive", "avoidant"],
        feedback: "Vague commitments rarely lead to improved outcomes and can seem dismissive.",
        feedbackAr: "الالتزامات الغامضة نادراً ما تؤدي إلى نتائج أفضل ويمكن أن تبدو مستهينة.",
        feedbackType: "caution",
      },
    ],
  },
  {
    id: "step-4a",
    title: "4. Collaborative Closing",
    titleAr: "4. إغلاق تعاوني",
    scenario: "The manager's stance softens. 'I appreciate your openness. Let's make sure this report is the hallmark of your growth.'",
    scenarioAr: "خفت حدة موقف المدير. 'أقدر صراحتك. لنحرص على أن يكون هذا التقرير هو علامة نموك.'",
    context: "Success is near. How do you cement this transition from critique to coaching?",
    contextAr: "النجاح قريب. كيف تثبت هذا الانتقال من النقد إلى التوجيه؟",
    choices: [
      {
        id: "4a1",
        label: "Summarize Alignment",
        labelAr: "تلخيص التوافق",
        description: "Summarize the 3 key changes you'll make to the report to ensure you're aligned.",
        descriptionAr: "لخص التغييرات الثلاثة الرئيسية التي ستجريها على التقرير لضمان توافقك.",
        nextStepId: "step-5a",
        tags: ["aligned", "detail-oriented"],
        feedback: "Active listening at its best. This builds immense trust.",
        feedbackAr: "الاستماع النشط في أبهى صوره. هذا يبني ثقة هائلة.",
        feedbackType: "positive",
      },
      {
        id: "4a2",
        label: "Express Gratitude",
        labelAr: "التعبير عن الامتنان",
        description: "Say, 'Thank you for being direct. It helps me know exactly where I need to focus.'",
        descriptionAr: "قل: 'شكراً لصراحتك. هذا يساعدني في معرفة أين يجب أن أركز تحديداً.'",
        nextStepId: "step-5a",
        tags: ["appreciative", "emotionally-intelligent"],
        feedback: "Gratitude reframes the manager as a mentor, strengthening the professional bond.",
        feedbackAr: "الامتنان يعيد تصوير المدير كمرشد، مما يعزز الرابط المهني.",
        feedbackType: "positive",
      },
    ],
  },
  {
    id: "step-4b",
    title: "4. Maintaining Momentum",
    titleAr: "4. الحفاظ على الزخم",
    scenario: "You rush back to your desk to fix the report. But now, you receive an urgent email from a client. Your stress levels rise again.",
    scenarioAr: "تسرع بالعودة إلى مكتبك لإصلاح التقرير. ولكن الآن، تتلقى بريداً إلكترونياً عاجلاً من أحد العملاء. ترتفع مستويات التوتر لديك مرة أخرى.",
    context: "The real test. Can you maintain your new regulated state under pressure?",
    contextAr: "الاختبار الحقيقي. هل يمكنك الحفاظ على حالتك المنظمة الجديدة تحت الضغط؟",
    choices: [
      {
        id: "4b1",
        label: "Prioritize Regulated Action",
        labelAr: "إعطاء الأولوية للعمل المنظم",
        description: "Spend 5 minutes planning how to balance both without sacrificing quality.",
        descriptionAr: "اقضِ 5 دقائق في التخطيط لكيفية الموازنة بين الاثنين دون التضحية بالجودة.",
        nextStepId: "step-5a",
        tags: ["strategic", "self-management"],
        feedback: "Brilliant. Pausing during a second trigger proves you've learned the skill.",
        feedbackAr: "رائع. التوقف أثناء محفز ثانٍ يثبت أنك تعلمت المهارة.",
        feedbackType: "positive",
      },
      {
        id: "4b2",
        label: "Rush to Finish",
        labelAr: "الاندفاع للإنهاء",
        description: "Work as fast as possible on both. Skim the report details to save time.",
        descriptionAr: "اعمل بأسرع ما يمكن على كليهما. تصفح تفاصيل التقرير لتوفير الوقت.",
        nextStepId: "step-5b",
        tags: ["hustle", "low-detail"],
        feedback: "Speed often leads to the same errors the manager just flagged.",
        feedbackAr: "السرعة غالباً ما تؤدي إلى نفس الأخطاء التي أشار إليها المدير للتو.",
        feedbackType: "caution",
      },
    ],
  },
  {
    id: "step-5a",
    title: "5. Sustaining the Change",
    titleAr: "5. استدامة التغيير",
    scenario: "A week later, the new report is a success. You feel more confident. How do you ensure this 'Reaction Chain' becomes a permanent habit?",
    scenarioAr: "بعد أسبوع، نجح التقرير الجديد. تشعر بمزيد من الثقة. كيف تضمن أن تصبح 'سلسلة رد الفعل' هذه عادة دائمة؟",
    context: "The final step in behavioral integration.",
    contextAr: "الخطوة الأخيرة في التكامل السلوكي.",
    choices: [
      {
        id: "5a1",
        label: "Set Daily Mindful Checks",
        labelAr: "ضبط فحوصات وعي يومية",
        description: "Commit to checking your 'internal weather' for 2 minutes every morning.",
        descriptionAr: "التزم بفحص 'طقسك الداخلي' لمدة دقيقتين كل صباح.",
        nextStepId: "end-success",
        tags: ["disciplined", "mindful"],
        feedback: "Consistency is key. You are now a conscious decision-maker.",
        feedbackAr: "الاتساق هو المفتاح. أنت الآن متخذ قرار واعٍ.",
        feedbackType: "positive",
      },
      {
        id: "5a2",
        label: "Teach the Model to a Peer",
        labelAr: "تعليم النموذج لزميل",
        description: "Share the 'Emotion -> Interpretation -> Reaction' model with a teammate.",
        descriptionAr: "شارك نموذج 'العاطفة -> التفسير -> رد الفعل' مع زميل في الفريق.",
        nextStepId: "end-success",
        tags: ["leadership", "mentor"],
        feedback: "Teaching others is the highest form of mastery. Excellent.",
        feedbackAr: "تعليم الآخرين هو أعلى أشكال الإتقان. ممتاز.",
        feedbackType: "positive",
      },
    ],
  },
  {
    id: "step-5b",
    title: "5. Temporary Fix",
    titleAr: "5. إصلاح مؤقت",
    scenario: "The stress catch-up worked, but you feel exhausted and the new report still had a few typos.",
    scenarioAr: "نجحت محاولة تدارك التوتر، لكنك تشعر بالإرهاق ولا يزال التقرير الجديد يحتوي على بعض الأخطاء المطبعية.",
    context: "You survived, but was it sustainable? Reflect on your energy levels.",
    contextAr: "لقد نجوت، ولكن هل كان ذلك مستداماً؟ تأمل في مستويات طاقتك.",
    choices: [
      {
        id: "5b1",
        label: "Acknowledge the Burnout",
        labelAr: "الاعتراف بالاحتراق الرقمي",
        description: "Decide to re-visit the simulation paths to find a calmer way forward.",
        descriptionAr: "قرر إعادة زيارة مسارات المحاكاة لإيجاد طريقة أكثر هدوءاً للمضي قدماً.",
        nextStepId: "end-failure",
        tags: ["reflective", "self-aware"],
        feedback: "Brave. Admitting when a system isn't working is the first step to scaling it.",
        feedbackAr: "شجاع. الاعتراف عندما لا يعمل نظام ما هو الخطوة الأولى لتطويره.",
        feedbackType: "neutral",
      },
      {
        id: "5b2",
        label: "Carry On as Usual",
        labelAr: "الاستمرار كالمعتاد",
        description: "Just keep working. This is just how 'office life' is.",
        descriptionAr: "واصل العمل فحسب. هكذا هي 'حياة المكتب' بكل بساطة.",
        nextStepId: "end-failure",
        tags: ["resigned", "passive"],
        feedback: "Accepting stress as inevitable often leads to long-term decline in performance.",
        feedbackAr: "قبول التوتر كأمر حتمي غالباً ما يؤدي إلى تراجع الأداء على المدى الطويل.",
        feedbackType: "caution",
      },
    ],
  },
  {
    id: "end-success",
    title: "Aramco Leadership Standard Achieved",
    titleAr: "تم تحقيق معيار أرامكو للقيادة",
    scenario: "Success! You have navigated one of the most difficult workplace challenges: turning personal defensiveness into professional partnership.",
    scenarioAr: "نجاح! لقد اجتزت واحداً من أصعب تحديات مكان العمل: تحويل الدفاعية الشخصية إلى شراكة مهنية.",
    context: "You've successfully mastered the Reaction Chain flow.",
    contextAr: "لقد أتقنت بنجاح تدفق سلسلة رد الفعل.",
    choices: [],
    isEnd: true,
    endSummary: "You demonstrated that conscious processing of feedback leads to professional growth and stronger working relationships.",
    endSummaryAr: "لقد أثبتت أن المعالجة الواعية للملاحظات تؤدي إلى النمو المهني وعلاقات عمل أقوى.",
  },
  {
    id: "end-failure",
    title: "Simulation Concluded",
    titleAr: "انتهت المحاكاة",
    scenario: "The simulation has ended. While you finished the tasks, your journey through the Reaction Model suggests there are opportunities for deeper regulation.",
    scenarioAr: "انتهت المحاكاة. بينما أنهيت المهام، تشير رحلتك عبر نموذج رد الفعل إلى وجود فرص لتنظيم أعمق.",
    context: "There is always room for growth.",
    contextAr: "هناك دائماً مجال للنمو.",
    choices: [],
    isEnd: true,
    endSummary: "Reflect on the 'Emotion -> Interpretation -> Reaction' model and try a different path focusing on growth interpretation.",
    endSummaryAr: "تأمل في نموذج 'العاطفة -> التفسير -> رد الفعل' وجرب مساراً مختلفاً يركز على تفسير النمو.",
  },
];

export const expertPath = ["1a", "2a1", "3a1", "4a1", "5a1"];
export const expertPathLabels = ["Breath", "Growth", "Expert Examples", "Summarize", "Daily Checks"];

export function getStepById(id: string): SimulationStep | undefined {
  return simulationSteps.find((s) => s.id === id);
}

export function getTotalSteps(): number {
  return 5;
}
