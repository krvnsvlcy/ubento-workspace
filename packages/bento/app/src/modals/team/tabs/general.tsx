import { FC } from "react";

interface GeneralTabProps {
  team: any;
}

export const GeneralTab: FC<GeneralTabProps> = ({ team }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <section className="space-y-6">
        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-[12px] font-semibold text-foreground-200 ml-1">
              Team Name
            </label>
            <input
              type="text"
              defaultValue={team?.name}
              placeholder="e.g. Acme Corp"
              className="w-full px-4 py-3 rounded-xl bg-background-200 border border-foreground/5 focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10 outline-none transition-all text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-semibold text-foreground-200 ml-1">
              Team Handle
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400 text-sm">
                ubento.pro/
              </span>
              <input
                type="text"
                defaultValue={team?.handle}
                placeholder="acme"
                className="w-full pl-24 pr-4 py-3 rounded-xl bg-background-200 border border-foreground/5 focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 border-t border-foreground/5">
        <h4 className="text-sm font-bold text-foreground mb-4">Danger Zone</h4>
        <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-red-400">Delete Team</p>
              <p className="text-xs text-red-400/60">
                Permanently remove this team and all associated data.
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all">
              Delete
            </button>
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-4">
        <button className="px-8 py-3 rounded-xl bg-foreground text-background font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-foreground/10">
          Save Changes
        </button>
      </div>
    </div>
  );
};
