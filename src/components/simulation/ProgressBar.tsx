import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-1 max-w-[240px]">
          {Array.from({ length: total }).map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-1.5 rounded-full flex-1 transition-all duration-500",
                i < current ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]" : 
                i === current ? "bg-blue-400" : "bg-secondary"
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-lg">
             {t('step')} {current}/{total}
           </span>
        </div>
      </div>
    </div>
  );
}
