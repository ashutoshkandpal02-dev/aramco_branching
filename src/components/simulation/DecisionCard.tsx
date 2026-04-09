import { cn } from "@/lib/utils";
import { ChevronRight, Zap, Shield, Heart } from "lucide-react";

interface DecisionCardProps {
  label: string;
  description: string;
  index: number;
  tags?: string[];
  onClick: () => void;
}

const choiceStyles: Record<number, { border: string; bg: string; icon: React.ReactNode; accent: string }> = {
  0: { border: "hover:border-primary/50", bg: "hover:bg-primary/5", icon: <Heart className="w-3.5 h-3.5" />, accent: "from-primary to-accent" },
  1: { border: "hover:border-warning/50", bg: "hover:bg-warning/5", icon: <Zap className="w-3.5 h-3.5" />, accent: "from-warning to-destructive" },
  2: { border: "hover:border-info/50", bg: "hover:bg-info/5", icon: <Shield className="w-3.5 h-3.5" />, accent: "from-info to-primary" },
};

export function DecisionCard({ label, description, index, onClick }: DecisionCardProps) {
  const style = choiceStyles[index] || choiceStyles[0];

  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-left p-5 rounded-xl border border-border/60 bg-card/90 backdrop-blur-sm",
        style.border, style.bg,
        "hover:shadow-elevated hover:-translate-y-0.5",
        "transition-all duration-300 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      style={{ animation: `fadeInUp 0.4s ease-out ${index * 0.12}s both` }}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br flex items-center justify-center text-sm font-bold text-primary-foreground shadow-sm",
          style.accent
        )}>
          {String.fromCharCode(65 + index)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors text-[15px]">
            {label}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1.5" />
      </div>
    </button>
  );
}
