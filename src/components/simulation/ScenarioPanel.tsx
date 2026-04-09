import { useTranslation } from "react-i18next";
import { SimulationStep, SimulationChoice } from "@/data/simulationData";
import { DecisionCard } from "./DecisionCard";
import { ProgressBar } from "./ProgressBar";
import { FeedbackToast } from "./FeedbackToast";
import { DecisionTimeline } from "./DecisionTimeline";
import { UserDecision } from "@/data/simulationData";
import { ArrowLeft, RotateCcw, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground tracking-tight">{t('simulation_header')}</h2>
            <p className="text-xs text-muted-foreground">{t('simulation_subtitle')}</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            disabled={!canGoBack}
            className="text-muted-foreground hover:text-foreground h-8 px-2.5"
          >
            <ArrowLeft className={`w-4 h-4 ${isArabic ? 'ml-1' : 'mr-1'} ${isArabic ? 'rotate-180' : ''}`} />
            {t('back')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRestart}
            className="text-muted-foreground hover:text-foreground h-8 px-2.5"
          >
            <RotateCcw className={`w-4 h-4 ${isArabic ? 'ml-1' : 'mr-1'}`} />
            {t('restart')}
          </Button>
        </div>
      </div>

      {/* Decision Timeline */}
      {decisions.length > 0 && (
        <div className="mb-4">
          <DecisionTimeline decisions={decisions} currentStepId={step.id} />
        </div>
      )}

      {/* Progress */}
      <ProgressBar current={stepNumber} total={totalSteps} />

      {/* Feedback Toast */}
      {lastFeedback && (
        <div className="mt-4">
          <FeedbackToast 
            text={isArabic && lastFeedback.textAr ? lastFeedback.textAr : lastFeedback.text} 
            type={lastFeedback.type} 
          />
        </div>
      )}

      {/* Scenario */}
      <div className="mt-6 flex-1" key={step.id} style={{ animation: "slideInStep 0.4s ease-out" }}>
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold gradient-primary text-primary-foreground shadow-sm">
            {isArabic && step.titleAr ? step.titleAr : step.title}
          </span>
        </div>
        <p className="text-foreground leading-relaxed mb-2 text-[15px]">
          {isArabic && step.scenarioAr ? step.scenarioAr : step.scenario}
        </p>
        <p className={`text-sm text-muted-foreground italic mb-6 ${isArabic ? 'border-r-2 pr-3' : 'border-l-2 pl-3'} border-primary/20`}>
          {isArabic && step.contextAr ? step.contextAr : step.context}
        </p>

        {/* Choices */}
        <div className="space-y-3">
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
  );
}
