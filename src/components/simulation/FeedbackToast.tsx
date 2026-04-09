import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackToastProps {
  text: string;
  type: string;
}

export function FeedbackToast({ text, type }: FeedbackToastProps) {
  const config = {
    positive: { icon: <CheckCircle2 className="w-4 h-4" />, color: "border-success/40 bg-success/10 text-success" },
    caution: { icon: <AlertTriangle className="w-4 h-4" />, color: "border-warning/40 bg-warning/10 text-warning" },
    neutral: { icon: <Info className="w-4 h-4" />, color: "border-info/40 bg-info/10 text-info" },
  }[type] || { icon: <Info className="w-4 h-4" />, color: "border-info/40 bg-info/10 text-info" };

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 rounded-lg border text-sm",
        config.color
      )}
      style={{ animation: "fadeInUp 0.3s ease-out" }}
    >
      <span className="flex-shrink-0 mt-0.5">{config.icon}</span>
      <p className="text-foreground/90 leading-relaxed">{text}</p>
    </div>
  );
}
