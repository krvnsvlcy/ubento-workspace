import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { ubentoFeatures } from "@ubento/services.primitives";
import { FC } from "react";

export const UsageTab: FC = () => {
  const ubento = useUbento();
  const session = useSession();
  const teamId = session.teamId;

  const { data: usageCounters = [], isFetching } =
    ubento.billing.useUsageCounters({
      team_id: teamId,
    });

  const usageItems = usageCounters
    .map((counter: any) => ({
      code: counter.code,
      label: counter.name || counter.code,
      used: counter.current_value,
      total: counter.limit,
      unit: counter.unit || "",
    }))
    .filter((item: any) => {
      // Hide unlimited vertex requests on paid plans
      if (
        item.code === ubentoFeatures.vertex.weeklyRequests.code &&
        (item.total === "inf" || typeof item.total === "string")
      ) {
        return false;
      }
      return true;
    });

  if (isFetching && usageItems.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-content-muted">
        <p className="text-[13px]">Loading usage...</p>
      </div>
    );
  }

  if (!isFetching && usageItems.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-content-muted">
        <p className="text-[13px]">No usage data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
                / {item.total === "inf" ? "Unlimited" : item.total} {item.unit}
              </span>
            </p>
          </div>
          <div className="h-2 w-full bg-neutral-surface-active rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-1000"
              style={{
                width:
                  item.total === "inf"
                    ? "100%"
                    : `${(item.used / Math.max(Number(item.total), 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
