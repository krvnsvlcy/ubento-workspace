import { FC } from "react";
import { Package } from "lucide-react";

export const AddonsTab: FC = () => {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="p-6 rounded-2xl bg-background-200 border border-foreground/5 flex justify-between items-center">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
            <Package className="h-6 w-6 text-primary-400" />
          </div>
          <div>
            <h4 className="font-bold text-foreground">Extra AI Credits</h4>
            <p className="text-xs text-foreground-300">
              Add 5,000 more AI credits to your plan.
            </p>
          </div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-foreground text-background text-xs font-black uppercase tracking-wider">
          Add $10
        </button>
      </div>
    </div>
  );
};
