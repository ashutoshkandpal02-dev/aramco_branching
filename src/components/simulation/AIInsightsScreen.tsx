import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { 
  Sparkles, 
  Brain, 
  ArrowRight, 
  TrendingUp, 
  MessageSquare, 
  ShieldCheck, 
  Layout, 
  UserCheck, 
  Target 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIInsightsScreenProps {
  onComplete: () => void;
}

export function AIInsightsScreen({ onComplete }: AIInsightsScreenProps) {
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-8 animate-in fade-in duration-700">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center">
             <Brain className="w-16 h-16 text-primary animate-float" />
          </div>
          <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin" />
        </div>
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">
            {isArabic ? "جاري تحليل سلوكك..." : "Analyzing Behavioral Patterns..."}
          </h3>
          <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-green-500 to-blue-600 animate-progress origin-left" />
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">
            {isArabic ? "استخلاص الأنماط من قراراتك" : "Extracting patterns from your decisions"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* Dashboard Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
          <Sparkles className="w-4 h-4" />
          {isArabic ? "رؤى الذكاء الاصطناعي" : "AI Intelligence Dashboard"}
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
          {isArabic ? "ملفك الشخصي السلوكي" : "Your Behavioral Profile"}
        </h2>
        <p className="text-lg text-muted-foreground font-medium">
          {isArabic 
            ? "بناءً على محاكاة اليوم، قمنا برسم خريطة لنقاط القوة السلوكية الأبرز لديك." 
            : "Based on today's simulation, we've mapped your most prominent behavioral strengths."}
        </p>
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Trait Card */}
        <div className="lg:col-span-2 glass-card p-10 bg-gradient-to-br from-white/90 to-blue-50/50 border-white relative overflow-hidden group shadow-elevated">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
             <Layout className="w-40 h-40" />
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
               <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-lg">
                 {isArabic ? "السمة الأساسية" : "Primary Strength"}
               </span>
               <h3 className="text-4xl font-black text-foreground">
                 {isArabic ? "المفكر الاستراتيجي" : "Strategic Navigator"}
               </h3>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl font-medium">
              {isArabic 
                ? "تُظهر قراراتك ميلاً نحو الاستقرار العاطفي وإعادة التفسير الإيجابي. أنت لا تتفاعل مع الضغط فحسب، بل تقوم بصياغته كفرصة للنمو المؤسسي." 
                : "Your decisions show a high propensity for emotional regulation and positive reframing. You don't just react to pressure—you frame it as an opportunity for organizational growth."}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
               {['Agility', 'Resilience', 'Empathy'].map(tag => (
                 <div key={tag} className="px-5 py-2 rounded-2xl bg-white shadow-soft border border-border/40 text-sm font-bold text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {tag}
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Confidence/Stats Card */}
        <div className="glass-card p-8 bg-gradient-to-br from-green-600 to-blue-700 text-white border-0 shadow-elevated flex flex-col justify-between">
           <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <ShieldCheck className="w-8 h-8 opacity-80" />
                 <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{isArabic ? "دقة التحليل" : "Analysis Accuracy"}</span>
              </div>
              <div className="space-y-2">
                 <h4 className="text-5xl font-black">94%</h4>
                 <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{isArabic ? "مستوى الثقة" : "Confidence Score"}</p>
              </div>
           </div>
           
           <div className="space-y-4 pt-10">
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                 <div className="h-full bg-white w-[94%]" />
              </div>
              <p className="text-xs font-medium opacity-90 leading-relaxed italic">
                {isArabic 
                  ? "تم التحقق من هذه الرؤى مقابل معيار أرامكو للكفاءات القيادية." 
                  : "These insights are validated against the Aramco Leadership Competency Framework."}
              </p>
           </div>
        </div>
      </div>

      {/* Trait Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: isArabic ? "القيادة" : "Leadership", score: 88, icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
          { label: isArabic ? "التواصل" : "Communication", score: 92, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
          { label: isArabic ? "التفكير النقدي" : "Critical Thinking", score: 85, icon: Target, color: "text-amber-600", bg: "bg-amber-50" }
        ].map((trait, i) => (
          <div key={i} className="glass-card p-6 border-white/60 bg-white/60 hover:bg-white transition-all hover:shadow-card group">
            <div className="flex items-center justify-between mb-4">
               <div className={cn("p-3 rounded-2xl group-hover:scale-110 transition-transform", trait.bg, trait.color)}>
                  <trait.icon className="w-6 h-6" />
               </div>
               <span className="text-2xl font-black text-foreground">{trait.score}%</span>
            </div>
            <h4 className="font-bold text-foreground text-lg mb-1">{trait.label}</h4>
            <div className="w-full h-1 bg-secondary rounded-full mt-3 overflow-hidden">
               <div 
                 className={cn("h-full transition-all duration-1000 delay-300", 
                   trait.color.replace('text', 'bg'))} 
                 style={{ width: `${trait.score}%` }} 
               />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-10 flex justify-center">
        <Button 
          onClick={onComplete}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:opacity-90 transition-all px-12 py-7 h-auto text-xl font-bold rounded-2xl shadow-xl border-0 group"
        >
          {isArabic ? "متابعة إلى خطة العمل" : "Continue to Action Plan"}
          <ArrowRight className={isArabic ? "mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" : "ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform"} />
        </Button>
      </div>
    </div>
  );
}
