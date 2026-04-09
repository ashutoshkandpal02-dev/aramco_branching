import { useTranslation } from "react-i18next";
import { Bell, Smartphone, Clock, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NudgesScreenProps {
  onRestart: () => void;
}

export function NudgesScreen({ onRestart }: NudgesScreenProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const nudges = [
    { time: "9:00 AM", title: isArabic ? "تذكير الصباح" : "Morning Check-in", desc: isArabic ? "حدد نية لتكون واعياً بردود أفعالك اليوم." : "Set a conscious intention for your reactions today." },
    { time: "2:00 PM", title: isArabic ? "فحص منتصف اليوم" : "Mid-day Pulse", desc: isArabic ? "هل مارست نموذج العاطفة ← التفسير ← رد الفعل؟" : "Did you practice the Emotion → Interpretation → Reaction model?" },
    { time: "5:00 PM", title: isArabic ? "تأمل المساء" : "Evening Reflection", desc: isArabic ? "ما هو أفضل رد فعل واعٍ قمت به اليوم؟" : "What was your best conscious reaction today?" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
          <Bell className="w-3.5 h-3.5" />
          {isArabic ? "تنبيهات سلوكية" : "Behavioral Nudges"}
        </div>
        <h2 className="text-3xl font-bold text-foreground tracking-tight">
          {isArabic ? "تنبيهاتك المخصصة" : "Your Personalized Nudges"}
        </h2>
        <p className="text-muted-foreground">
          {isArabic 
            ? "تنبيهات في الوقت المناسب لمساعدتك على البقاء على المسار الصحيح مع أهداف السلوك الخاصة بك." 
            : "Timely reminders to help you stay on track with your behavior goals."}
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {nudges.map((nudge, idx) => (
          <div key={idx} className="flex gap-6 items-start">
             <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-border flex items-center justify-center text-xs font-bold text-blue-600">
                   {nudge.time.split(' ')[0]}
                </div>
                {idx < nudges.length - 1 && <div className="w-0.5 h-10 bg-border mt-2" />}
             </div>
             <div className="glass-card p-6 flex-1 bg-white/60">
                <h4 className="text-lg font-bold text-foreground mb-1">{nudge.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{nudge.desc}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="pt-10 flex flex-col items-center gap-6">
        <div className="glass-card p-6 bg-green-500 text-white border-0 shadow-lg text-center max-w-sm">
           <CheckCircle2 className="w-10 h-10 mx-auto mb-4" />
           <h3 className="text-xl font-bold mb-2">{isArabic ? "اكتمل الإعداد" : "Setup Complete"}</h3>
           <p className="text-sm opacity-90">{isArabic ? "أنت جاهز تماماً لبدء رحلة تحولك السلوكي." : "You are all set to begin your behavioral transformation journey."}</p>
        </div>
        <Button 
          variant="outline"
          onClick={onRestart}
          className="px-10 py-6 h-auto text-lg rounded-2xl border-2 border-primary/20 hover:bg-primary/5 transition-all"
        >
          <RotateCcw className={isArabic ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
          {isArabic ? "إعادة تشغيل التجربة" : "Restart Experience"}
        </Button>
      </div>
    </div>
  );
}
