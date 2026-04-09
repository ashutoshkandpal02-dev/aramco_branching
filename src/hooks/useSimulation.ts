import { useState, useCallback } from "react";
import { getStepById, UserDecision, SimulationStep, SimulationChoice, getTotalSteps } from "@/data/simulationData";

const STORAGE_KEY = "lms-simulation-progress";

interface SimulationState {
  currentStepId: string;
  decisions: UserDecision[];
  isComplete: boolean;
  startedAt: number;
}

function loadState(): SimulationState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(state: SimulationState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

export function useSimulation() {
  const saved = loadState();
  const [currentStepId, setCurrentStepId] = useState(saved?.currentStepId ?? "step-1");
  const [decisions, setDecisions] = useState<UserDecision[]>(saved?.decisions ?? []);
  const [isComplete, setIsComplete] = useState(saved?.isComplete ?? false);
  const [startedAt] = useState(saved?.startedAt ?? Date.now());
  const [lastFeedback, setLastFeedback] = useState<{ text: string; textAr: string; type: string } | null>(null);

  const currentStep = getStepById(currentStepId);
  const currentStepNumber = decisions.length + 1;

  const makeChoice = useCallback(
    (choice: SimulationChoice) => {
      const decision: UserDecision = {
        stepId: currentStepId,
        choiceId: choice.id,
        choiceLabel: choice.label,
        choiceLabelAr: choice.labelAr,
        tags: choice.tags,
        timestamp: Date.now(),
        feedback: choice.feedback,
        feedbackAr: choice.feedbackAr,
        feedbackType: choice.feedbackType,
      };

      const newDecisions = [...decisions, decision];
      const nextStep = getStepById(choice.nextStepId);
      const complete = nextStep?.isEnd ?? false;

      if (choice.feedback || choice.feedbackAr) {
        setLastFeedback({ 
          text: choice.feedback || "", 
          textAr: choice.feedbackAr || "",
          type: choice.feedbackType || "neutral" 
        });
        setTimeout(() => setLastFeedback(null), 3500);
      }

      setDecisions(newDecisions);
      setCurrentStepId(choice.nextStepId);
      setIsComplete(complete);

      saveState({
        currentStepId: choice.nextStepId,
        decisions: newDecisions,
        isComplete: complete,
        startedAt,
      });
    },
    [currentStepId, decisions, startedAt]
  );

  const goBack = useCallback(() => {
    if (decisions.length === 0) return;
    const prev = decisions.slice(0, -1);
    const targetStepId = decisions[decisions.length - 1].stepId;

    setDecisions(prev);
    setCurrentStepId(targetStepId);
    setIsComplete(false);
    setLastFeedback(null);

    saveState({
      currentStepId: targetStepId,
      decisions: prev,
      isComplete: false,
      startedAt,
    });
  }, [decisions, startedAt]);

  const restart = useCallback(() => {
    setCurrentStepId("step-1");
    setDecisions([]);
    setIsComplete(false);
    setLastFeedback(null);
    clearState();
  }, []);

  return {
    currentStep: currentStep as SimulationStep,
    currentStepNumber,
    totalSteps: getTotalSteps(),
    decisions,
    isComplete,
    makeChoice,
    goBack,
    restart,
    canGoBack: decisions.length > 0,
    lastFeedback,
  };
}
