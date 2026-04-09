import { useTranslation } from "react-i18next";
import { ListChecks, Calendar, Target, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionPlanScreenProps {
  onComplete: () => void;
}

export function ActionPlanScreen({ onComplete }: ActionPlanScreenProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const actions = [
    { title: isArabic ? "ممارسة وقف الملحق" : "Practice Pausing", desc: isArabic ? "انتظر 3 ثوانٍ قبل الرد في الاجتماعات عالية الضغط." : "Wait 3 seconds before responding in high-pressure meetings." },
    { title: isArabic ? "طلب التوضيح" : "Seek Clarification", desc: isArabic ? "اطرح سؤالين تفصيلين عند تلقي الملاحظات." : "Ask two clarifying questions when receiving feedback." },
    { title: isArabic ? "إعادة الصياغة الإيجابية" : "Positive Reframing", desc: isArabic ? "أعد كتابة ردود الأفعال النقدية كفرص للنمو." : "Rewrite critical feedback as growth opportunities." }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          {isArabic ? "خطة مخصصة" : "Personalized Plan"}
        </div>
        <h2 className="text-3xl font-bold text-foreground tracking-tight">
          {isArabic ? "خطة عملك السلوكية" : "Your Behavioral Action Plan"}
        </h2>
        <p className="text-muted-foreground">
          {isArabic 
            ? "خطوات عملية لمساعدتك على تحويل رؤى الذكاء الاصطناعي إلى عادات دائمة." 
            : "Concrete steps to help you turn AI insights into lasting habits."}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {actions.map((action, idx) => (
          <div key={idx} className="glass-card p-6 flex items-start gap-5 hover:bg-white transition-colors border-l-4 border-l-green-500">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-1">{action.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{action.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-10 flex justify-center">
        <Button 
          onClick={onComplete}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:opacity-90 transition-all px-10 py-6 h-auto text-lg rounded-2xl shadow-xl border-0"
        >
          {isArabic ? "متابعة إلى التنبيهات" : "Continue to Nudges"}
          <ArrowRight className={isArabic ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
        </Button>
      </div>
    </div>
  );
}
