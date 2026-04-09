import { useTranslation } from "react-i18next";
import { UserDecision, getStepById, simulationSteps } from "@/data/simulationData";
import { CheckCircle2, Circle, MapPin, ZoomIn, ZoomOut, Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface WorksheetMapProps {
  decisions: UserDecision[];
  currentStepId: string;
}

export function WorksheetMap({ decisions, currentStepId }: WorksheetMapProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [zoom, setZoom] = useState(1);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const isEnd = getStepById(currentStepId)?.isEnd;

  const handleExport = useCallback(() => {
    const content = [
      `=== ${t('journey_report_title')} ===`,
      `${t('date')}: ${new Date().toLocaleDateString(i18n.language)}`,
      `${t('total_decisions')}: ${decisions.length}`,
      "",
      ...decisions.map((d, i) => {
        const step = getStepById(d.stepId);
        const title = isArabic && step?.titleAr ? step.titleAr : step?.title;
        return [
          `${t('step')} ${i + 1}: ${title}`,
          `  ${t('tags')}: ${d.tags.join(", ")}`,
          d.feedback ? `  ${t('feedback')}: ${d.feedback}` : "",
          "",
        ].filter(Boolean).join("\n");
      }),
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "decision-journey.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [decisions, t, i18n.language, isArabic]);

  const selectedDecision = selectedStep
    ? decisions.find((d) => d.stepId === selectedStep)
    : null;

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          {t('journey_map')}
        </h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}>
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <span className="text-[10px] text-muted-foreground w-8 text-center">{Math.round(zoom * 100)}%</span>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom((z) => Math.min(1.5, z + 0.15))}>
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleExport}>
            <Download className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="overflow-auto max-h-[400px] scrollbar-none" style={{ transform: `scale(${zoom})`, transformOrigin: isArabic ? "top right" : "top left" }}>
        <div className="space-y-0.5">
          {decisions.map((d, i) => {
            const step = getStepById(d.stepId);
            const isSelected = selectedStep === d.stepId;
            const title = isArabic && step?.titleAr ? step.titleAr : step?.title;
            const choiceLabel = d.choiceLabel; // Note: choiceLabel is already translated when decision is made

            return (
              <button
                key={d.choiceId}
                onClick={() => setSelectedStep(isSelected ? null : d.stepId)}
                className={cn(
                  "flex items-start gap-3 w-full rounded-lg p-2 transition-all",
                  isArabic ? "text-right" : "text-left",
                  isSelected ? "bg-primary/10" : "hover:bg-secondary/60"
                )}
                style={{ animation: `fadeInUp 0.3s ease-out ${i * 0.05}s both` }}
              >
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                    "bg-success/15 text-success border border-success/30"
                  )}>
                    {i + 1}
                  </div>
                  {i < decisions.length - 1 && <div className="w-0.5 h-6 bg-success/20" />}
                  {i === decisions.length - 1 && !isEnd && <div className="w-0.5 h-6 bg-border" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{title}</p>
                  <p className="text-sm font-medium text-foreground truncate">{choiceLabel}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {d.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
          {!isEnd && (
            <div className={`flex items-start gap-3 p-2 ${isArabic ? 'text-right' : 'text-left'}`}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center border border-primary/40 bg-primary/10">
                <Circle className="w-3 h-3 text-primary animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('current_step_label')}</p>
                <p className="text-sm font-medium text-foreground">
                  {isArabic && getStepById(currentStepId)?.titleAr ? getStepById(currentStepId)?.titleAr : getStepById(currentStepId)?.title}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      {selectedDecision && (
        <div className="mt-3 p-3 rounded-lg bg-secondary/50 border border-border/50" style={{ animation: "fadeInUp 0.2s ease-out" }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Eye className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground">{t('decision_detail')}</span>
          </div>
          <p className="text-xs text-foreground mb-1">{selectedDecision.choiceLabel}</p>
          {selectedDecision.feedback && (
            <p className="text-xs text-muted-foreground italic">{selectedDecision.feedback}</p>
          )}
        </div>
      )}
    </div>
  );
}
