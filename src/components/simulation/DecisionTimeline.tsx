import { useTranslation } from "react-i18next";
import { UserDecision, getStepById } from "@/data/simulationData";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DecisionTimelineProps {
  decisions: UserDecision[];
  currentStepId: string;
}

export function DecisionTimeline({ decisions, currentStepId }: DecisionTimelineProps) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const isEnd = getStepById(currentStepId)?.isEnd;

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none" dir={isArabic ? 'rtl' : 'ltr'}>
      {decisions.map((d, i) => {
        const step = getStepById(d.stepId);
        const choiceLabel = isArabic && d.choiceLabelAr ? d.choiceLabelAr : d.choiceLabel;
        const title = isArabic && step?.titleAr ? step.titleAr : step?.title;
        
        return (
          <div key={d.choiceId} className="flex items-center gap-1 flex-shrink-0">
            <div className="group relative">
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                "bg-success/15 text-success border border-success/30"
              )}>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                <div className="bg-card border border-border rounded-lg shadow-elevated px-3 py-2 text-xs whitespace-nowrap">
                  <p className="font-medium text-foreground">{choiceLabel}</p>
                  <p className="text-muted-foreground">{title}</p>
                </div>
              </div>
            </div>
            <div className={`w-6 h-0.5 bg-success/30 flex-shrink-0`} />
          </div>
        );
      })}
      {!isEnd && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center border border-primary/40 bg-primary/10 flex-shrink-0">
          <Circle className="w-3 h-3 text-primary animate-pulse" />
        </div>
      )}
    </div>
  );
}
