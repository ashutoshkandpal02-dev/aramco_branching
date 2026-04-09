import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  Map, 
  Sparkles, 
  ArrowRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentPanelProps {
  simulationData: any;
  worksheetData: any;
  onRestart: () => void;
  onComplete?: () => void;
}

export function AssessmentPanel({ simulationData, worksheetData, onRestart, onComplete }: AssessmentPanelProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 max-w-4xl mx-auto">
      <div className="glass-card p-12 bg-white/95 text-center relative overflow-hidden shadow-elevated border-white">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-blue-600" />
        
        <div className="relative mb-10">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center text-primary mx-auto shadow-inner border border-white">
            <Award className="w-12 h-12 text-primary animate-float" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-green-500 text-[10px] font-black text-white uppercase tracking-widest shadow-lg">
             {isArabic ? "مستوى الخبير" : "Expert Level"}
          </div>
        </div>

        <h2 className="text-4xl font-black text-foreground mb-3 tracking-tight">{t('assessment_title')}</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto font-medium">{t('assessment_intro')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-card p-8 bg-gradient-to-br from-white to-green-50/30 border-green-500/10 text-left hover:shadow-card transition-all">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 rounded-xl bg-green-500/10 text-green-600">
                  <TrendingUp className="w-5 h-5" />
               </div>
               <h3 className="font-black text-foreground uppercase tracking-widest text-[11px]">
                 {t('simulation_results')}
               </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-muted-foreground">{t('score')}</span>
                <span className="text-3xl font-black text-foreground tracking-tighter">94<span className="text-sm opacity-30">/100</span></span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{ width: '94%' }} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {isArabic 
                  ? "أداء استثنائي. تظهر مهاراتك توافقاً كبيراً مع المسارات القيادية الموصى بها." 
                  : "Exceptional performance. Your decisions show high alignment with recommended leadership paths."}
              </p>
            </div>
          </div>

          <div className="glass-card p-8 bg-gradient-to-br from-white to-blue-50/30 border-blue-500/10 text-left hover:shadow-card transition-all">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
                  <Map className="w-5 h-5" />
               </div>
               <h3 className="font-black text-foreground uppercase tracking-widest text-[11px]">
                 {t('worksheet_completion')}
               </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-green-100 shadow-soft">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                   <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-sm font-bold text-foreground">{t('reaction_chain_mapped')}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {isArabic 
                  ? "تم تحليل الأنماط السلوكية وتوثيقها في ملفك المهني." 
                  : "Behavioral patterns analyzed and documented in your professional profile."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-4">
          <Button 
            onClick={onComplete}
            className="bg-gradient-to-r from-green-600 to-blue-700 hover:opacity-90 transition-all px-12 py-8 h-auto text-xl font-bold rounded-2xl shadow-xl border-0 group"
          >
            <Sparkles className={cn("w-6 h-6", isArabic ? "ml-3" : "mr-3")} />
            {isArabic ? "إنشاء رؤى الذكاء الاصطناعي" : "Generate AI Insights"}
            <ArrowRight className={cn("h-5 w-5 opacity-0 group-hover:opacity-100 transition-all", isArabic ? "mr-2" : "ml-2")} />
          </Button>
          <Button 
            variant="outline" 
            onClick={onRestart}
            className="px-10 py-8 h-auto text-lg font-bold rounded-2xl border-2 border-primary/20 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary"
          >
            {isArabic ? "إعادة البدء" : "Restart"}
          </Button>
        </div>
      </div>

      <div className="glass-card p-6 bg-secondary/30 backdrop-blur-sm border-white/40 text-center animate-pulse">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/60 mb-2">
          {isArabic ? "خطوتك التالية" : "Next Recommended Action"}
        </p>
        <p className="text-sm text-foreground font-bold italic">
          “Now, let’s unlock your AI-driven behavioral profile to visualize your Emotion → Interpretation flow.”
        </p>
      </div>
    </div>
  );
}
