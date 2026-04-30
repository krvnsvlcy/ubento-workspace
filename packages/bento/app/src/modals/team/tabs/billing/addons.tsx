import { FC } from "react";
import { Package } from "lucide-react";

export const AddonsTab: FC = () => {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="p-6 rounded-2xl bg-neutral-surface border border-neutral-border flex justify-between items-center">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-xl bg-accent-surface flex items-center justify-center">
            <Package className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-content">Extra AI Credits</h4>
            <p className="text-xs text-neutral-content-subtle">
              Add 5,000 more AI credits to your plan.
            </p>
          </div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-neutral-content text-neutral-contrast text-xs font-black uppercase tracking-wider">
          Add $10
        </button>
      </div>
    </div>
  );
};
