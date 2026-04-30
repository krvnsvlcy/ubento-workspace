import { FC } from "react";
import { Globe, Plus, Settings, Zap } from "lucide-react";

export const ConnectionsTab: FC = () => {
  const connections = [
    {
      name: "GitHub",
      status: "Connected",
      icon: Globe,
      user: "acme-inc",
    },
    {
      name: "Slack",
      status: "Connected",
      icon: Globe,
      user: "#alerts",
    },
    {
      name: "AWS",
      status: "Needs Re-auth",
      icon: Globe,
      user: "prod-iam",
      error: true,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Connections</h3>
            <p className="text-sm text-neutral-content-subtle">
              Manage your organization's external service integrations.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-content text-neutral-contrast text-xs font-black uppercase tracking-wider">
            <Plus className="h-3 w-3" />
            Add Connection
          </button>
        </div>

        <div className="space-y-3">
          {connections.map((conn) => (
            <div
              key={conn.name}
              className="flex items-center justify-between p-4 rounded-2xl bg-neutral-surface border border-neutral-border group hover:border-neutral-border-hover transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center ${conn.error ? "bg-destructive-surface text-destructive-content" : "bg-neutral-surface-hover text-neutral-content-muted"}`}
                >
                  <conn.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">{conn.name}</p>
                  <p className="text-[10px] text-neutral-content-muted font-bold uppercase">
                    {conn.user}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${conn.error ? "text-destructive" : "text-accent"}`}
                >
                  {conn.status}
                </span>
                <button className="p-2 rounded-lg bg-neutral-surface-hover opacity-0 group-hover:opacity-100 transition-all">
                  <Settings className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="p-6 rounded-2xl bg-accent-surface border border-accent-border flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-accent-surface-hover flex items-center justify-center">
          <Zap className="h-5 w-5 text-accent" />
        </div>
        <div>
          <p className="text-sm font-bold">Auto-sync active</p>
          <p className="text-xs text-foreground-300">
            Your connections are synchronized across all workspace instances.
          </p>
        </div>
      </div>
    </div>
  );
};
