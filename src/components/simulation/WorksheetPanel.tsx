import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brain, ArrowRight, Save, Layout, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorksheetPanelProps {
  onComplete: (data: any) => void;
}

export function WorksheetPanel({ onComplete }: WorksheetPanelProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [data, setData] = useState({
    emotion: "",
    interpretation: "",
    reaction: "",
  });

  const isComplete = data.emotion && data.interpretation && data.reaction;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card p-8 bg-white/90">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
            <Layout className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t('reaction_chain_mapping')}</h2>
            <p className="text-muted-foreground">{t('mapping_instructions')}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]">1</span>
              {t('emotion_label')}
            </label>
            <Input 
              placeholder={isArabic ? "بماذا شعرت؟" : "How did you feel?"}
              value={data.emotion}
              onChange={(e) => setData({ ...data, emotion: e.target.value })}
              className="bg-secondary/30 border-secondary focus:ring-green-500 h-12"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">2</span>
              {t('interpretation_label')}
            </label>
            <Textarea 
              placeholder={isArabic ? "كيف فسرت الموقف؟" : "How did you interpret the situation?"}
              value={data.interpretation}
              onChange={(e) => setData({ ...data, interpretation: e.target.value })}
              className="bg-secondary/30 border-secondary focus:ring-blue-500 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">3</span>
              {t('reaction_label')}
            </label>
            <Input 
              placeholder={isArabic ? "ماذا كان رد فعلك؟" : "What was your reaction?"}
              value={data.reaction}
              onChange={(e) => setData({ ...data, reaction: e.target.value })}
              className="bg-secondary/30 border-secondary focus:ring-blue-500 h-12"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
          <p className="text-sm text-muted-foreground italic flex items-center gap-2">
            <Brain className="w-4 h-4 text-green-500" />
            {t('reflect_patterns')}
          </p>
          <Button 
            onClick={() => onComplete(data)} 
            disabled={!isComplete}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:opacity-90 transition-all px-8 py-6 h-auto text-lg rounded-2xl shadow-lg border-0"
          >
            {t('save_worksheet')}
            <Save className={cn("w-5 h-5", isArabic ? "mr-2" : "ml-2")} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
            <Target className="w-4 h-4" />
          </div>
          <p className="text-xs font-medium text-muted-foreground">{t('self-aware')}</p>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
            <Zap className="w-4 h-4" />
          </div>
          <p className="text-xs font-medium text-muted-foreground">{t('conscious')}</p>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
            <Brain className="w-4 h-4" />
          </div>
          <p className="text-xs font-medium text-muted-foreground">{t('Growth Mindset')}</p>
        </div>
      </div>
    </div>
  );
}
