import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Award, ClipboardList, TrendingUp, ShieldCheck, Map } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentPanelProps {
  simulationData: any;
  worksheetData: any;
  onRestart: () => void;
}

export function AssessmentPanel({ simulationData, worksheetData, onRestart }: AssessmentPanelProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="glass-card p-10 bg-white/90 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 to-blue-600" />
        
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500/20 to-blue-600/20 flex items-center justify-center text-primary mx-auto mb-6 shadow-sm">
          <Award className="w-10 h-10 text-green-600" />
        </div>

        <h2 className="text-3xl font-bold text-foreground mb-2">{t('assessment_title')}</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{t('assessment_intro')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          <div className="glass-card p-6 bg-secondary/20 border-border/40 text-left">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              {t('simulation_results')}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">{t('score')}</span>
                <span className="font-bold text-foreground">85/100</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }} />
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {isArabic 
                  ? "لقد أظهرت وعياً سلوكياً قوياً في إدارة المحادثات الصعبة." 
                  : "You demonstrated strong behavioral awareness in managing critical feedback."}
              </p>
            </div>
          </div>

          <div className="glass-card p-6 bg-secondary/20 border-border/40 text-left">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-500" />
              {t('worksheet_completion')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/60 border border-green-200">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-foreground">{t('reaction_chain_mapped')}</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {isArabic 
                  ? "تم تحليل الأنماط الشخصية بنجاح." 
                  : "Personal reaction patterns have been successfully mapped and analyzed."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:opacity-90 transition-all px-10 py-6 h-auto text-lg rounded-2xl shadow-xl border-0"
          >
            <ShieldCheck className={cn("w-5 h-5", isArabic ? "ml-2" : "mr-2")} />
            {t('download_report')}
          </Button>
          <Button 
            variant="outline" 
            onClick={onRestart}
            className="px-10 py-6 h-auto text-lg rounded-2xl border-2 border-primary/20 hover:bg-primary/5 transition-all"
          >
            {t('restart')}
          </Button>
        </div>
      </div>

      <div className="glass-card p-6 bg-blue-50/50 border-blue-100 italic text-center">
        <p className="text-sm text-blue-700 font-medium">
          {t('debrief')} : “Finally, let’s review a visual job aid to help you manage reactions in real situations.”
        </p>
      </div>
    </div>
  );
}
