import { FC } from "react";
import { Zap } from "lucide-react";

export const PlanTab: FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl bg-gradient-to-br from-background-200 to-background-300 border border-foreground/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Zap className="h-32 w-32" />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] mb-2">
                Current Plan
              </p>
              <h3 className="text-3xl font-black text-foreground">
                Pro Professional
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-[10px] font-black uppercase tracking-wider border border-primary-500/20">
              Active
            </span>
          </div>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-4xl font-black">$29</span>
            <span className="text-foreground-400 font-medium text-sm">
              /month
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-foreground/5">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-500" />
              <span className="text-sm text-foreground-300">
                Unlimited Projects
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-500" />
              <span className="text-sm text-foreground-300">
                Advanced Analytics
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 py-3 rounded-2xl bg-foreground text-background font-black text-sm uppercase tracking-wider hover:opacity-90 transition-all">
          Change Plan
        </button>
        <button className="px-6 py-3 rounded-2xl bg-background-200 text-foreground-300 font-bold text-sm hover:text-red-400 transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
};
