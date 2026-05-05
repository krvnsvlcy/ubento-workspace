import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/engine";
import { Loader2 } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface GeneralTabProps {
  team?: any;
}

export const GeneralTab: FC<GeneralTabProps> = ({ team: initialTeam }) => {
  const ubento = useUbento();
  const session = useSession();
  const teamId = initialTeam?.id || session.teamId;

  const { data: team } = ubento.iam.useTeam(teamId, {
    enabled: !!teamId,
  });

  const [name, setName] = useState(team?.name || "");
  const [handle, setHandle] = useState(team?.handle || "");

  useEffect(() => {
    if (team) {
      setName(team.name || "");
      setHandle(team.handle || "");
    }
  }, [team]);

  const { mutate: updateTeam, isPending: isUpdating } =
    ubento.iam.useUpdateTeam(teamId);
  const { mutate: deleteTeam, isPending: isDeleting } =
    ubento.iam.useDeleteTeam();

  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    if (!team?.id) return;
    if (name === team.name && handle === team.handle) return;
    updateTeam(
      { name, handle },
      {
        onSuccess: () => {
          setShowSaved(true);
          setTimeout(() => setShowSaved(false), 2000);
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const handleDelete = () => {
    if (!team?.id) return;
    if (confirm("Are you sure you want to delete this team?")) {
      deleteTeam(team.id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <section className="space-y-6">
        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-[12px] font-semibold text-neutral-content-subtle ml-1">
              Team Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                placeholder="e.g. Acme Corp"
                className="w-full px-4 py-3 rounded-xl bg-neutral-surface border border-neutral-border focus:border-neutral-border-hover focus:ring-1 focus:ring-neutral-border/10 outline-none transition-all text-sm"
              />
            </div>
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
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                placeholder="acme"
                className="w-full pl-24 pr-4 py-3 rounded-xl bg-neutral-surface border border-neutral-border focus:border-neutral-border-hover focus:ring-1 focus:ring-neutral-border/10 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>

        <div className="h-6 flex items-center justify-end px-1 text-neutral-content-muted">
          {isUpdating && (
            <div className="flex items-center gap-2 text-neutral-content-muted animate-in fade-in duration-200">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="text-[11px] font-medium">Saving...</span>
            </div>
          )}
          {!isUpdating && (
            <div className="flex items-center fade-in slide-in-from-bottom-1 duration-300">
              <span className="text-[11px]">Up to date.</span>
            </div>
          )}
        </div>
      </section>

      <section className="pt-8 border-t border-neutral-border">
        <div className="p-4 rounded-2xl border border-neutral-border bg-neutral-surface">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-neutral-content">
                Delete Team
              </p>
              <p className="text-xs text-neutral-content-muted">
                Permanently remove this team and all associated data.
              </p>
            </div>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 rounded-lg bg-neutral-surface-hover text-neutral-content-subtle text-xs font-bold hover:bg-destructive hover:text-destructive-contrast transition-all disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
