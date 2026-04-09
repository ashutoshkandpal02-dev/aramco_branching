import { useTranslation } from "react-i18next";
import { UserDecision, expertPath, expertPathLabels, getStepById } from "@/data/simulationData";
import { RotateCcw, Trophy, Download, Star, MessageSquare, GitCompare, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CompletionPanelProps {
  decisions: UserDecision[];
  onRestart: () => void;
}

export function CompletionPanel({ decisions, onRestart }: CompletionPanelProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const allTags = decisions.flatMap((d) => d.tags);
  const tagCounts: Record<string, number> = {};
  allTags.forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1));
  const topTraits = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const score = Math.min(100, 60 + decisions.length * 8 + topTraits.length * 2);
  const expertMatchCount = decisions.filter((d, i) => expertPath[i] === d.choiceId).length;
  const expertAlignment = decisions.length > 0 ? Math.round((expertMatchCount / decisions.length) * 100) : 0;

  const handleDownload = () => {
    const content = [
      `=== ${t('report_title')} ===`,
      `${t('date')}: ${new Date().toLocaleDateString(i18n.language)}`,
      `${t('score')}: ${score}/100`,
      `${t('expert_alignment')}: ${expertAlignment}%`,
      "",
      `--- ${t('your_decisions')} ---`,
      ...decisions.map((d, i) => {
        const step = getStepById(d.stepId);
        const title = isArabic && step?.titleAr ? step.titleAr : step?.title;
        return `${t('step')} ${i + 1} (${title}): ${d.choiceLabel}\n  ${t('tags')}: ${d.tags.join(", ")}${d.feedback ? `\n  ${t('feedback')}: ${d.feedback}` : ""}`;
      }),
      "",
      `--- ${t('expert_path')} ---`,
      ...expertPathLabels.map((label, i) => `${t('step')} ${i + 1}: ${label}`),
      "",
      `--- ${t('top_traits')} ---`,
      ...topTraits.map(([trait, count]) => `${trait}: ${count} ${t('times')}`),
      "",
      feedback ? `--- ${t('your_feedback')} ---\n${feedback}` : "",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "simulation-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full" style={{ animation: "fadeInUp 0.5s ease-out" }}>
      {/* Hero */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-elevated">
          <Trophy className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-1.5 tracking-tight">{t('simulation_complete')}</h2>
        <p className="text-sm text-muted-foreground">{t('performance_breakdown')}</p>
      </div>

      {/* Score + Expert */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="glass-card p-5 text-center">
          <Award className="w-5 h-5 text-warning mx-auto mb-1.5" />
          <div className="text-4xl font-bold text-foreground mb-1" style={{ animation: "countUp 0.6s ease-out" }}>{score}</div>
          <p className="text-[11px] text-muted-foreground">{t('performance_score')}</p>
          <div className="flex justify-center gap-0.5 mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={cn("w-4 h-4", s <= Math.round(score / 20) ? "text-warning fill-warning" : "text-muted")} />
            ))}
          </div>
        </div>
        <div className="glass-card p-5 text-center">
          <GitCompare className="w-5 h-5 text-primary mx-auto mb-1.5" />
          <div className="text-4xl font-bold text-foreground mb-1">{expertAlignment}%</div>
          <p className="text-[11px] text-muted-foreground">{t('expert_match')}</p>
        </div>
      </div>

      {/* Expert Path Comparison */}
      <div className="glass-card p-4 mb-5">
        <h3 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-primary" />
          {t('path_comparison')}
        </h3>
        <div className="space-y-2">
          {decisions.map((d, i) => {
            const isMatch = expertPath[i] === d.choiceId;
            return (
              <div key={d.choiceId} className={cn(
                "flex items-center gap-3 p-2.5 rounded-lg text-xs",
                isMatch ? "bg-success/10 border border-success/20" : "bg-warning/10 border border-warning/20"
              )}>
                <span className={cn("font-bold", isMatch ? "text-success" : "text-warning")}>
                  {isMatch ? "✓" : "✗"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{d.choiceLabel}</p>
                  {!isMatch && expertPathLabels[i] && (
                    <p className="text-muted-foreground mt-0.5">{t('expert')}: {expertPathLabels[i]}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Traits */}
      <div className="glass-card p-4 mb-5">
        <h3 className="font-semibold text-foreground mb-3 text-sm">{t('skill_tags')}</h3>
        <div className="flex flex-wrap gap-1.5">
          {topTraits.map(([trait]) => (
            <span key={trait} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-accent/10 text-accent border border-accent/20">
              {trait}
            </span>
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div className="glass-card p-4 mb-5">
        <h3 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          {t('your_feedback')}
        </h3>
        {!submitted ? (
          <>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={t('feedback_placeholder')}
              className="w-full p-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              rows={3}
            />
            <Button size="sm" className="mt-2.5 gradient-primary text-primary-foreground border-0" onClick={() => setSubmitted(true)}>
              {t('submit_feedback')}
            </Button>
          </>
        ) : (
          <p className="text-sm text-success">{t('feedback_success')}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <Button variant="outline" className="flex-1" onClick={handleDownload}>
          <Download className={`w-4 h-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          {t('download_report')}
        </Button>
        <Button className="flex-1 gradient-primary text-primary-foreground border-0" onClick={onRestart}>
          <RotateCcw className={`w-4 h-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          {t('try_again')}
        </Button>
      </div>
    </div>
  );
}
