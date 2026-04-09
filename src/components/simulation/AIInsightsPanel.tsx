import { useTranslation } from "react-i18next";
import { UserDecision, expertPath } from "@/data/simulationData";
import { Brain, TrendingUp, Lightbulb, BarChart3, Shield, Zap, Target, Award, GitCompare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface AIInsightsPanelProps {
  decisions: UserDecision[];
  isComplete: boolean;
}

interface Insight {
  icon: React.ReactNode;
  title: string;
  description: string;
  type: "pattern" | "prediction" | "suggestion";
}

function countMatching(tags: string[], targets: string[]): number {
  return tags.filter((t) => targets.includes(t)).length;
}

export function AIInsightsPanel({ decisions, isComplete }: AIInsightsPanelProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const { insights, traits, prediction, expertAlignment, score, skillTags } = useMemo(() => {
    const allTags = decisions.flatMap((d) => d.tags);

    const traits = [
      { id: "Empathy", label: t('empathy'), value: countMatching(allTags, ["empathetic", "patient", "relationship-focused", "personalized"]) },
      { id: "Strategy", label: t('strategy'), value: countMatching(allTags, ["analytical", "strategic", "consultative", "data-driven"]) },
      { id: "Action", label: t('action'), value: countMatching(allTags, ["action-oriented", "direct", "product-focused", "ambitious"]) },
      { id: "Caution", label: t('caution_label'), value: countMatching(allTags, ["risk-averse", "risk-mitigating", "thorough", "realistic"]) },
    ].map((t) => ({ ...t, value: Math.min(100, t.value * 25 + 10) }));

    const insights: Insight[] = [];
    const maxTrait = traits.reduce((a, b) => (a.value > b.value ? a : b));

    if (decisions.length >= 1) {
      insights.push({
        icon: <TrendingUp className="w-5 h-5" />,
        title: t('approach_pattern', { trait: maxTrait.label }),
        description: t('approach_description', { trait: maxTrait.label.toLowerCase() }),
        type: "pattern",
      });
    }

    if (decisions.length >= 2) {
      const hasRiskTags = allTags.some((t) => t.includes("risk"));
      insights.push({
        icon: <Shield className="w-5 h-5" />,
        title: hasRiskTags ? t('risk_conscious') : t('opportunity_focused'),
        description: hasRiskTags ? t('risk_description') : t('opportunity_description'),
        type: "prediction",
      });
    }

    if (decisions.length >= 3) {
      const tipDescription = 
        maxTrait.id === "Empathy" ? t('empathy_tip') :
        maxTrait.id === "Strategy" ? t('strategy_tip') :
        maxTrait.id === "Action" ? t('action_tip') :
        t('caution_tip');

      insights.push({
        icon: <Lightbulb className="w-5 h-5" />,
        title: t('coaching_tip'),
        description: tipDescription,
        type: "suggestion",
      });
    }

    if (decisions.length === 0) {
      insights.push({
        icon: <Brain className="w-5 h-5" />,
        title: t('awaiting_first_decision'),
        description: t('awaiting_description'),
        type: "prediction",
      });
    }

    const expertMatchCount = decisions.filter((d, i) => expertPath[i] === d.choiceId).length;
    const expertAlignment = decisions.length > 0 ? Math.round((expertMatchCount / decisions.length) * 100) : 0;

    const predictionText =
      decisions.length < 2
        ? t('more_data_needed')
        : maxTrait.id === "Empathy" ? t('empathy_prediction')
        : maxTrait.id === "Strategy" ? t('strategy_prediction')
        : maxTrait.id === "Action" ? t('action_prediction')
        : t('caution_prediction');

    const score = Math.min(100, 60 + decisions.length * 8 + maxTrait.value * 0.1 + expertMatchCount * 5);

    const skillTags = [
      ...new Set(allTags.slice(0, 6)),
    ].slice(0, 4);

    return { insights, traits, prediction: predictionText, expertAlignment, score: Math.round(score), skillTags };
  }, [decisions, t]);

  const typeColors = {
    pattern: "border-info/30 bg-info/5",
    prediction: "border-accent/30 bg-accent/5",
    suggestion: "border-success/30 bg-success/5",
  };
  const typeIconColors = {
    pattern: "text-info",
    prediction: "text-accent",
    suggestion: "text-success",
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
          <Brain className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-bold text-foreground tracking-tight">{t('ai_coaching_engine')}</h3>
          <p className="text-[11px] text-muted-foreground">{t('behavioral_intelligence')}</p>
        </div>
      </div>

      {/* Score + Expert Alignment */}
      {decisions.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Award className="w-4 h-4 text-warning" />
              <span className="text-[11px] text-muted-foreground font-medium">{t('score')}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{score}</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <GitCompare className="w-4 h-4 text-primary" />
              <span className="text-[11px] text-muted-foreground font-medium">{t('expert_match')}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{expertAlignment}%</p>
          </div>
        </div>
      )}

      {/* Skill Tags */}
      {skillTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {skillTags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-accent/10 text-accent font-medium border border-accent/20">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Trait Bars */}
      <div className="glass-card p-4">
        <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
          <BarChart3 className="w-3.5 h-3.5 text-primary" />
          {t('behavioral_profile')}
        </h4>
        <div className="space-y-2.5">
          {traits.map((trait) => (
            <div key={trait.id}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-foreground font-medium">{trait.label}</span>
                <span className="text-muted-foreground tabular-nums">{trait.value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${trait.value}%`,
                    background:
                      trait.id === "Empathy"
                        ? "hsl(var(--success))"
                        : trait.id === "Strategy"
                        ? "hsl(var(--info))"
                        : trait.id === "Action"
                        ? "hsl(var(--warning))"
                        : "hsl(var(--accent))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction */}
      <div className="glass-card p-4">
        <h4 className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-2">
          <Target className="w-3.5 h-3.5 text-accent" />
          {t('predicted_outcome')}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{prediction}</p>
      </div>

      {/* Insight Cards */}
      <div className="space-y-2.5">
        {insights.map((insight, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl border p-3.5 transition-all duration-300",
              typeColors[insight.type]
            )}
            style={{ animation: `${isArabic ? 'slideInLeft' : 'slideInRight'} 0.4s ease-out ${i * 0.1}s both` }}
          >
            <div className="flex items-start gap-3">
              <div className={cn("mt-0.5 flex-shrink-0", typeIconColors[insight.type])}>
                {insight.icon}
              </div>
              <div>
                <h5 className="text-xs font-semibold text-foreground mb-0.5">{insight.title}</h5>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick stat */}
      {decisions.length > 0 && (
        <div className="flex items-center gap-3 glass-card p-3.5">
          <Zap className="w-4 h-4 text-warning" />
          <div>
            <p className="text-[10px] text-muted-foreground">{t('decisions_made_label')}</p>
            <p className="text-base font-bold text-foreground">{decisions.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
