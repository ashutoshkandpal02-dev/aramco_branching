import { useTranslation } from "react-i18next";
import { ScenarioPanel } from "@/components/simulation/ScenarioPanel";
import { CompletionPanel } from "@/components/simulation/CompletionPanel";
import { AIInsightsPanel } from "@/components/simulation/AIInsightsPanel";
import { DecisionTimeline } from "@/components/simulation/DecisionTimeline";
import { WorksheetMap } from "@/components/simulation/WorksheetMap";
import { WorksheetPanel } from "@/components/simulation/WorksheetPanel";
import { AssessmentPanel } from "@/components/simulation/AssessmentPanel";
import { useSimulation } from "@/hooks/useSimulation";
import { useState } from "react";
import { Monitor, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Phase = "simulation" | "worksheet" | "assessment";

const Index = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const {
    currentStep,
    currentStepNumber,
    totalSteps,
    decisions,
    isComplete: isSimulationComplete,
    makeChoice,
    restart: restartSimulation,
    canGoBack,
    goBack,
    lastFeedback
  } = useSimulation();

  const [phase, setPhase] = useState<Phase>("simulation");
  const [worksheetData, setWorksheetData] = useState(null);

  const handleWorksheetComplete = (data: any) => {
    setWorksheetData(data);
    setPhase("assessment");
  };

  const handleRestart = () => {
    restartSimulation();
    setWorksheetData(null);
    setPhase("simulation");
  };

  const journeyProgress = phase === "simulation" ? 0 : phase === "worksheet" ? 50 : 100;

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/40">
        <div className="container max-w-7xl mx-auto h-20 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-green-500/10">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-foreground">{t('app_name')}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  {t('platform_subtitle')}
                </span>
              </div>
            </div>

            {/* Phase Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-secondary/40 p-1 rounded-xl">
              <button 
                onClick={() => setPhase("simulation")}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-semibold transition-all",
                  phase === "simulation" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t('simulation')}
              </button>
              <button 
                onClick={() => setPhase("worksheet")}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-semibold transition-all",
                  phase === "worksheet" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t('worksheet')}
              </button>
              <button 
                onClick={() => setPhase("assessment")}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-semibold transition-all",
                  phase === "assessment" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t('assessment')}
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-secondary/50 rounded-full p-1 border border-border/40">
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold transition-all",
                  i18n.language === 'en' ? "bg-green-500 text-white shadow-sm" : "text-muted-foreground"
                )}
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage('ar')}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold transition-all",
                  i18n.language === 'ar' ? "bg-green-500 text-white shadow-sm" : "font-arabic"
                )}
              >
                عربي
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 sm:px-8 pt-10">
        {/* Journey Progress */}
        <div className="max-w-md mx-auto mb-16 text-center">
            <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground mb-3 uppercase">
              {t('journey_progress', { percent: journeyProgress })}
            </p>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden border border-border/20 shadow-inner">
               <div 
                  className="h-full bg-gradient-to-r from-green-500 to-blue-600 transition-all duration-1000 ease-out"
                  style={{ width: `${journeyProgress}%` }}
               />
            </div>
        </div>

        <div className={cn(
            "grid grid-cols-1 gap-10",
            phase === "simulation" ? "lg:grid-cols-12" : "max-w-4xl mx-auto"
        )}>
          {/* Main Content Area */}
          <div className={cn(
            phase === "simulation" ? "lg:col-span-8 flex flex-col gap-6" : "w-full"
          )}>
            {phase === "simulation" && (
              <>
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-bold tracking-tight">{t('simulation_header')}</h2>
                   </div>
                   <DecisionTimeline decisions={decisions} currentStepId={currentStep?.id} />
                </div>
                {!isSimulationComplete ? (
                  <ScenarioPanel
                    step={currentStep}
                    stepNumber={currentStepNumber}
                    totalSteps={totalSteps}
                    onChoice={makeChoice}
                    onRestart={handleRestart}
                    onBack={goBack}
                    canGoBack={canGoBack}
                    decisions={decisions}
                    lastFeedback={lastFeedback}
                  />
                ) : (
                  <div className="animate-in fade-in duration-700">
                    <CompletionPanel 
                      decisions={decisions} 
                      onRestart={handleRestart} 
                    />
                    <div className="mt-8 p-6 glass-card bg-green-50 border-green-100 text-center">
                       <p className="text-sm text-green-700 font-medium mb-4">
                          {t('simulation_success_msg')}
                       </p>
                       <Button 
                          onClick={() => setPhase("worksheet")}
                          className="bg-green-600 hover:bg-green-700 text-white px-8 h-12 rounded-xl border-0 shadow-lg shadow-green-600/20"
                       >
                          {t('next_phase')}: {t('worksheet_mapping')}
                          <ArrowRight className={isArabic ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                       </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {phase === "worksheet" && (
              <WorksheetPanel onComplete={handleWorksheetComplete} />
            )}

            {phase === "assessment" && (
              <AssessmentPanel 
                simulationData={decisions} 
                worksheetData={worksheetData}
                onRestart={handleRestart}
              />
            )}
          </div>

          {/* Sidebar - only show during simulation */}
          {phase === "simulation" && (
            <aside className="lg:col-span-4 flex flex-col gap-6">
              <AIInsightsPanel decisions={decisions} isComplete={isSimulationComplete} />
              <WorksheetMap decisions={decisions} currentStepId={currentStep?.id} />
            </aside>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
