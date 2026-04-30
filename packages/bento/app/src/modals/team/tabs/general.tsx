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
            <label className="text-[12px] font-semibold text-neutral-content-subtle ml-1">
              Team Name
            </label>
            <input
              type="text"
              defaultValue={team?.name}
              placeholder="e.g. Acme Corp"
              className="w-full px-4 py-3 rounded-xl bg-neutral-surface border border-neutral-border focus:border-neutral-border-hover focus:ring-1 focus:ring-neutral-border/10 outline-none transition-all text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-semibold text-neutral-content-subtle ml-1">
              Team Handle
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-content-muted text-sm">
                ubento.pro/
              </span>
              <input
                type="text"
                defaultValue={team?.handle}
                placeholder="acme"
                className="w-full pl-24 pr-4 py-3 rounded-xl bg-neutral-surface border border-neutral-border focus:border-neutral-border-hover focus:ring-1 focus:ring-neutral-border/10 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 border-t border-neutral-border">
        <h4 className="text-sm font-bold text-neutral-content mb-4">Danger Zone</h4>
        <div className="p-4 rounded-2xl border border-destructive-border bg-destructive-surface">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-destructive-content">Delete Team</p>
              <p className="text-xs text-destructive-content/60">
                Permanently remove this team and all associated data.
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-destructive-surface-hover text-destructive-content text-xs font-bold hover:bg-destructive-surface-active transition-all">
              Delete
            </button>
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-4">
        <button className="px-8 py-3 rounded-xl bg-neutral-content text-neutral-contrast font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-neutral-content/10">
          Save Changes
        </button>
      </div>
    </div>
  );
};
