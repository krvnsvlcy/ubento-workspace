import { FC } from "react";
import { useUbento } from "@/engine/engine";
import { useSession } from "@/contexts/session";

export const UsageTab: FC = () => {
  const ubento = useUbento();
  const session = useSession();
  const teamId = session.teamId;

  const { data: usageCounters = [], isFetching } =
    ubento.billing.useUsageCounters({
      organization_id: teamId,
    });

  const usageItems = usageCounters.map((counter: any) => ({
    label: counter.name || counter.code,
    used: counter.current_value,
    total: counter.limit,
    unit: counter.unit || "",
  }));

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {usageItems.map((item) => (
        <div
          key={item.label}
          className="p-5 rounded-2xl bg-neutral-surface border border-neutral-border space-y-3"
        >
          <div className="flex justify-between items-end">
            <div>
              <h4 className="font-bold text-neutral-content">{item.label}</h4>
              <p className="text-[10px] text-neutral-content-muted uppercase font-bold tracking-wider">
                Usage this period
              </p>
            </div>
            <p className="text-sm font-bold">
              {item.used}{" "}
              <span className="text-neutral-content-muted font-medium">
                / {item.total} {item.unit}
              </span>
            </p>
          </div>
          <div className="h-2 w-full bg-neutral-surface-active rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-1000"
              style={{
                width: `${(item.used / item.total) * 100}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
