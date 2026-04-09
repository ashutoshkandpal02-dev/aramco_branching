import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackToastProps {
  text: string;
  type: string;
}

export function FeedbackToast({ text, type }: FeedbackToastProps) {
  const config = {
    positive: { icon: <CheckCircle2 className="w-5 h-5" />, color: "border-green-500/30 bg-green-50/80 text-green-700", label: "Insight" },
    caution: { icon: <AlertTriangle className="w-5 h-5" />, color: "border-amber-500/30 bg-amber-50/80 text-amber-700", label: "Warning" },
    neutral: { icon: <Info className="w-5 h-5" />, color: "border-blue-500/30 bg-blue-50/80 text-blue-700", label: "Tip" },
  }[type] || { icon: <Info className="w-5 h-5" />, color: "border-blue-500/30 bg-blue-50/80 text-blue-700", label: "Tip" };

  return (
    <div
      className={cn(
        "flex items-start gap-4 px-5 py-4 rounded-2xl border shadow-soft backdrop-blur-md",
        config.color
      )}
      style={{ animation: "fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="flex-shrink-0 p-1 rounded-lg bg-white/50 shadow-sm">
        {config.icon}
      </div>
      <div>
        <p className="font-bold text-[10px] uppercase tracking-widest opacity-60 mb-1">{config.label}</p>
        <p className="text-foreground/80 leading-relaxed font-medium text-sm">{text}</p>
      </div>
    </div>
  );
}
