import { useTranslation } from "react-i18next";
import { SimulationStep, SimulationChoice } from "@/data/simulationData";
import { DecisionCard } from "./DecisionCard";
import { ProgressBar } from "./ProgressBar";
import { FeedbackToast } from "./FeedbackToast";
import { DecisionTimeline } from "./DecisionTimeline";
import { UserDecision } from "@/data/simulationData";
import { ArrowLeft, RotateCcw, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScenarioPanelProps {
  step: SimulationStep;
  stepNumber: number;
  totalSteps: number;
  onChoice: (choice: SimulationChoice) => void;
  onBack: () => void;
  onRestart: () => void;
  canGoBack: boolean;
  decisions: UserDecision[];
  lastFeedback: { text: string; textAr: string; type: string } | null;
}

export function ScenarioPanel({
  step,
  stepNumber,
  totalSteps,
  onChoice,
  onBack,
  onRestart,
  canGoBack,
  decisions,
  lastFeedback,
}: ScenarioPanelProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header & Controls */}
      <div className="flex items-center justify-between bg-white/40 p-3 rounded-2xl border border-white/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white shadow-lg animate-float">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground tracking-tight leading-none mb-1">
              {isArabic ? "تحدي القرار" : "Decision Challenge"}
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
               {isArabic ? "الخطوة" : "Step"} {stepNumber} / {totalSteps}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {canGoBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="h-8 border-border/40 bg-white/50"
            >
              <ArrowLeft className={cn("w-3.5 h-3.5", isArabic ? "rotate-180 ml-1.5" : "mr-1.5")} />
              {t('back')}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRestart}
            className="h-8 text-muted-foreground hover:text-foreground hover:bg-white/50"
          >
            <RotateCcw className={cn("w-3.5 h-3.5", isArabic ? "ml-1.5" : "mr-1.5")} />
            {t('restart')}
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-1">
         <ProgressBar current={stepNumber} total={totalSteps} />
      </div>

      {/* Main Scenario Canvas */}
      <div className="relative flex-1" key={step.id}>
        {/* Feedback Overlay (if any) */}
        {lastFeedback && (
          <div className="absolute -top-4 left-0 w-full z-10 animate-in fade-in slide-in-from-top-2 duration-300 px-4">
            <FeedbackToast 
              text={isArabic && lastFeedback.textAr ? lastFeedback.textAr : lastFeedback.text} 
              type={lastFeedback.type} 
            />
          </div>
        )}

        <div 
          className="glass-card p-8 bg-white/80 border-white/60 shadow-elevated relative overflow-hidden" 
          style={{ animation: "slideInStep 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {isArabic && step.titleAr ? step.titleAr : step.title}
            </div>

            <div className="space-y-4">
              <p className="text-xl font-medium text-foreground leading-relaxed tracking-tight">
                {isArabic && step.scenarioAr ? step.scenarioAr : step.scenario}
              </p>
              
              <div className={cn(
                "p-4 rounded-xl text-sm italic font-medium",
                isArabic ? "border-r-4 pr-6" : "border-l-4 pl-6",
                "bg-secondary/30 border-primary/30 text-muted-foreground"
              )}>
                {isArabic && step.contextAr ? step.contextAr : step.context}
              </div>
            </div>

            {/* Choices Grid */}
            <div className="grid grid-cols-1 gap-4 pt-4">
              {step.choices.map((choice, i) => (
                <DecisionCard
                  key={choice.id}
                  label={isArabic && choice.labelAr ? choice.labelAr : choice.label}
                  description={isArabic && choice.descriptionAr ? choice.descriptionAr : choice.description}
                  index={i}
                  tags={choice.tags}
                  onClick={() => onChoice(choice)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
