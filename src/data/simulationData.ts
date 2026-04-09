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
    title: "The Emotional Trigger",
    titleAr: "المحفز العاطفي",
    scenario: "Your manager calls you into a meeting and says, 'I reviewed your last report. It's not up to our usual standards and missed several key metrics.' You felt proud of that report.",
    scenarioAr: "يدعوك مديرك إلى اجتماع ويقول: 'راجعت تقريرك الأخير. إنه ليس بالمستوى المعتاد وقد فوت عدة مقاييس رئيسية.' كنت تشعر بالفخر بذلك التقرير.",
    context: "Initial Reaction: You feel a surge of heat and your heart rate increases. This is the 'Emotion' phase.",
    contextAr: "رد الفعل الأولي: تشعر بموجة حرارة ويزداد معدل ضربات قلبك. هذه هي مرحلة 'العاطفة'.",
    choices: [
      {
        id: "1a",
        label: "Pause and Breathe",
        labelAr: "توقف وتنفس",
        description: "Take a 3-second pause before saying anything to lower your physiological arousal.",
        descriptionAr: "توقف لمدة 3 ثوانٍ قبل قول أي شيء لتقليل استثارتك الفسيولوجية.",
        nextStepId: "step-2a",
        tags: ["self-regulated", "composed", "conscious"],
        feedback: "Great work. Pausing prevents an immediate 'Amydgala Hijack'.",
        feedbackAr: "عمل رائع. التوقف يمنع 'اختطاف اللوزة الدماغية' الفوري.",
        feedbackType: "positive",
      },
      {
        id: "1b",
        label: "Immediate Defense",
        labelAr: "الدفاع الفوري",
        description: "Quickly explain why the metrics were missed due to external factors.",
        descriptionAr: "اشرح بسرعة سبب تفويت المقاييس بسبب عوامل خارجية.",
        nextStepId: "step-2b",
        tags: ["reactive", "defensive", "unconscious"],
        feedback: "Natural reaction, but often perceived as a lack of accountability.",
        feedbackAr: "رد فعل طبيعي، ولكنه غالباً ما يُنظر إليه على أنه نقص في المسؤولية.",
        feedbackType: "caution",
      },
    ],
  },
  {
    id: "step-2a",
    title: "Interpretation Phase",
    titleAr: "مرحلة التفسير",
    scenario: "Now that you're calm, how do you choose to interpret their words? They said it was 'not up to standards.'",
    scenarioAr: "الآن وقد هدأت، كيف تختار تفسير كلماتهم؟ قالوا إنها 'ليست بالمستوى'.",
    context: "Your internal dialogue determines your next move.",
    contextAr: "حوارك الداخلي يحدد خطوتك التالية.",
    choices: [
      {
        id: "2a1",
        label: "Growth Interpretation",
        labelAr: "تفسير النمو",
        description: "Interpret this as a chance to clarify expectations and improve your technical skills.",
        descriptionAr: "فسر ذلك على أنه فرصة لتوضيح التوقعات وتحسين مهاراتك التقنية.",
        nextStepId: "step-3a",
        tags: ["growth-mindset", "constructive", "logical"],
        feedback: "Reframing feedback as growth data is a superpower.",
        feedbackAr: "إعادة صياغة الملاحظات كبيانات للنمو هي قوة خارقة.",
        feedbackType: "positive",
      },
      {
        id: "2a2",
        label: "Personal Attack",
        labelAr: "هجوم شخصي",
        description: "Interpret this as the manager not liking your work or being out to get you.",
        descriptionAr: "فسر ذلك على أن المدير لا يحب عملك أو يسعى للنيل منك.",
        nextStepId: "step-3b",
        tags: ["fixed-mindset", "emotional", "stressed"],
        feedback: "Personalizing feedback leads to resentment and shuts down learning.",
        feedbackAr: "تشخيص الملاحظات يؤدي إلى الاستياء ويوقف التعلم.",
        feedbackType: "caution",
      },
    ],
  },
  {
    id: "step-2b",
    title: "The Reactive Loop",
    titleAr: "حلقة رد الفعل",
    scenario: "The manager looks unimpressed by your excuses. 'I'm looking for solutions, not justifications,' they say.",
    scenarioAr: "يبدو المدير غير متأثر بأعذارك. يقول: 'أنا أبحث عن حلول، وليس مبررات'.",
    context: "You are now in a defensive cycle. Can you pivot?",
    contextAr: "أنت الآن في دورة دفاعية. هل يمكنك التحول؟",
    choices: [
      {
        id: "2b1",
        label: "Acknowledge and Pivot",
        labelAr: "الاعتراف والتحول",
        description: "Stop justifying. Say, 'You're right, I should have focused on the solutions. Let me re-examine the data.'",
        descriptionAr: "توقف عن التبرير. قل: 'أنت على حق، كان يجب أن أركز على الحلول. دعني أعيد فحص البيانات'.",
        nextStepId: "step-3a",
        tags: ["accountable", "resilient", "professional"],
        feedback: "Strong recovery. Admitting a mistake builds respect.",
        feedbackAr: "تعافٍ قوي. الاعتراف بالخطأ يبني الاحترام.",
        feedbackType: "positive",
      },
      {
        id: "2b2",
        label: "Escalate Frustration",
        labelAr: "تصعيد الإحباط",
        description: "Express that you feel unsupported given the tight deadlines.",
        descriptionAr: "عبر عن شعورك بعدم الدعم بالنظر إلى المواعيد النهائية الضيقة.",
        nextStepId: "step-3b",
        tags: ["aggressive", "victim-mindset", "unfiltered"],
        feedback: "This damages the relationship further and creates a toxic dynamic.",
        feedbackAr: "هذا يضر بالعلاقة أكثر ويخلق ديناميكية سامة.",
        feedbackType: "caution",
      },
    ],
  },
  {
    id: "step-3a",
    title: "Conscious Reaction",
    titleAr: "رد الفعل الواعي",
    scenario: "You decide to engage constructively. How do you conclude this conversation?",
    scenarioAr: "تقرر المشاركة بشكل بناء. كيف تختتم هذا الحديث؟",
    context: "The final 'Reaction' phase of the model.",
    contextAr: "مرحلة 'رد الفعل' النهائية في النموذج.",
    choices: [
      {
        id: "3a1",
        label: "Ask for Specifics",
        labelAr: "طلب التفاصيل",
        description: "Ask, 'Can you highlight specifically which metrics were most critical so I can prioritize them?'",
        descriptionAr: "اسأل: 'هل يمكنك توضيح أي المقاييس كانت الأكثر أهمية تحديداً حتى أتمكن من إعطائها الأولوية؟'",
        nextStepId: "end-success",
        tags: ["curious", "solution-focused", "collaborative"],
        feedback: "Perfect. Curiosity is the antidote to defensiveness.",
        feedbackAr: "مثالي. الفضول هو ترياق الدفاعية.",
        feedbackType: "positive",
      },
      {
        id: "3a2",
        label: "Commit to Revision",
        labelAr: "الالتزام بالمراجعة",
        description: "Say, 'I'll have a revised version with all metrics addressed by tomorrow morning.'",
        descriptionAr: "قل: 'سأقوم بإعداد نسخة مراجعة تتضمن جميع المقاييس بحلول صباح الغد'.",
        nextStepId: "end-success",
        tags: ["diligent", "committed", "reliable"],
        feedback: "Action-oriented and builds confidence in your reliability.",
        feedbackAr: "موجه نحو العمل ويبني الثقة في موثوقيتك.",
        feedbackType: "positive",
      },
    ],
  },
  {
    id: "step-3b",
    title: "Strained Outcome",
    titleAr: "نتيجة متوترة",
    scenario: "The conversation ends on a cold note. Your manager seems worried about your professional maturity.",
    scenarioAr: "ينتهي الحديث بنبرة باردة. يبدو مديرك قلقاً بشأن نضجك المهني.",
    context: "Reactions have consequences. This path creates friction.",
    contextAr: "ردود الفعل لها عواقب. هذا المسار يخلق احتكاكاً.",
    choices: [
      {
        id: "3b1",
        label: "Reflect and Apologize",
        labelAr: "التأمل والاعتذار",
        description: "Later, send a brief message acknowledging your defensiveness and committing to feedback.",
        descriptionAr: "لاحقاً، أرسل رسالة قصيرة تعترف فيها بدفاعيتك وتلتزم بالملاحظات.",
        nextStepId: "end-success",
        tags: ["self-aware", "humble", "reparative"],
        feedback: "Good recovery. It's never too late to regulate after the fact.",
        feedbackAr: "تعافٍ جيد. لم يفت الأوان أبداً للتنظيم بعد وقوع الأمر.",
        feedbackType: "positive",
      },
      {
        id: "3b2",
        label: "Walk Away Disengaged",
        labelAr: "الابتعاد بفك ارتباط",
        description: "Wait for the manager to approach you next, essentially 'ghosting' the feedback.",
        descriptionAr: "انتظر حتى يقترب منك المدير تالياً، وهو ما يعني تجاهل الملاحظات أساساً.",
        nextStepId: "end-failure",
        tags: ["withdrawn", "passive-aggressive", "fixed"],
        feedback: "This is a high-risk path for your long-term career growth.",
        feedbackAr: "هذا مسار عالي المخاطر لنموك المهني على المدى الطويل.",
        feedbackType: "caution",
      },
    ],
  },
  {
    id: "end-success",
    title: "Simulation Complete",
    titleAr: "اكتملت المحاكاة",
    scenario: "Congratulations! You've navigated a difficult feedback conversation by moving through Emotion, Interpretation, and Reaction.",
    scenarioAr: "تهانينا! لقد نجحت في إدارة محادثة ملاحظات صعبة من خلال المرور بالعاطفة والتفسير ورد الفعل.",
    context: "Review your decisions to see how conscious your choices were.",
    contextAr: "راجع قراراتك لترى مدى وعي خياراتك.",
    choices: [],
    isEnd: true,
    endSummary: "You demonstrated that conscious processing of feedback leads to professional growth and stronger working relationships.",
    endSummaryAr: "لقد أثبتت أن المعالجة الواعية للملاحظات تؤدي إلى النمو المهني وعلاقات عمل أقوى.",
  },
  {
    id: "end-failure",
    title: "Simulation Ended",
    titleAr: "انتهت المحاكاة",
    scenario: "The simulation has concluded. Choosing not to engage with feedback often leads to missed opportunities for growth.",
    scenarioAr: "انتهت المحاكاة. اختيار عدم التفاعل مع الملاحظات غالباً ما يؤدي إلى ضياع فرص النمو.",
    context: "Consider how a shift in interpretation could change the outcome.",
    contextAr: "فكر في كيف يمكن لتغيير التفسير أن يغير النتيجة.",
    choices: [],
    isEnd: true,
    endSummary: "Reflect on the 'Emotion -> Interpretation -> Reaction' model and try a different path next time.",
    endSummaryAr: "تأمل في نموذج 'العاطفة -> التفسير -> رد الفعل' وجرب مساراً مختلفاً في المرة القادمة.",
  },
];

export const expertPath = ["1a", "2a1", "3a1"];
export const expertPathLabels = ["Pause and Breathe", "Growth Interpretation", "Ask for Specifics"];

export function getStepById(id: string): SimulationStep | undefined {
  return simulationSteps.find((s) => s.id === id);
}

export function getTotalSteps(): number {
  return 3;
}
