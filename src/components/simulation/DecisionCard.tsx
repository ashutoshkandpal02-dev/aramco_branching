import { cn } from "@/lib/utils";
import { ChevronRight, Zap, Shield, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DecisionCardProps {
  label: string;
  description: string;
  index: number;
  tags?: string[];
  onClick: () => void;
}

const choiceStyles: Record<number, { border: string; bg: string; icon: React.ReactNode; accent: string }> = {
  0: { border: "hover:border-green-500/50", bg: "hover:bg-green-50/50", icon: <Heart className="w-3.5 h-3.5" />, accent: "from-green-500 to-green-600" },
  1: { border: "hover:border-blue-500/50", bg: "hover:bg-blue-50/50", icon: <Zap className="w-3.5 h-3.5" />, accent: "from-blue-500 to-blue-600" },
  2: { border: "hover:border-green-600/50", bg: "hover:bg-green-100/30", icon: <Shield className="w-3.5 h-3.5" />, accent: "from-green-600 to-blue-500" },
};

export function DecisionCard({ label, description, index, tags, onClick }: DecisionCardProps) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const style = choiceStyles[index] || choiceStyles[0];

  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-left p-6 rounded-2xl border border-border/40 bg-white/90 backdrop-blur-md",
        style.border, style.bg,
        "hover:shadow-elevated hover:-translate-y-1 active:scale-[0.98]",
        "transition-all duration-400 cubic-bezier(0.16, 1, 0.3, 1)",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      )}
      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
    >
      <div className="flex items-start gap-5">
        <div className={cn(
          "flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br flex flex-col items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3",
          style.accent
        )}>
          <span className="text-xs opacity-70 font-bold uppercase tracking-tighter -mb-1">{isArabic ? "خيار" : "OPTION"}</span>
          <span className="text-lg font-black">{String.fromCharCode(65 + index)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors text-[17px] tracking-tight">
              {label}
            </h4>
            {tags && tags.slice(0, 1).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full bg-secondary text-[8px] font-black uppercase tracking-widest text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-[14px] text-muted-foreground leading-relaxed font-medium">
            {description}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 self-center opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
           <ChevronRight className="w-6 h-6 text-primary" />
        </div>
      </div>
    </button>
  );
}
