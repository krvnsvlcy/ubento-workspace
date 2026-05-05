import { FC } from "react";
import { Zap } from "lucide-react";
import { useUbento } from "@/engine/engine";
import { useSession } from "@/contexts/session";

export const PlanTab: FC = () => {
  const ubento = useUbento();
  const session = useSession();
  const teamId = session.teamId;

  const { data: subscriptions = [], isFetching } =
    ubento.billing.useSubscriptions({
      organization_id: teamId,
      status: "ACTIVE",
    });

  const subscription = subscriptions[0];
  const { data: product } = ubento.billing.useProduct(
    subscription?.product_id as string,
    {
      enabled: !!subscription?.product_id,
    }
  );

  const { mutate: cancelSubscription, isPending: isCancelling } =
    ubento.billing.useCancelSubscription();

  const handleCancel = () => {
    if (
      subscription?.id &&
      confirm("Are you sure you want to cancel your subscription?")
    ) {
      cancelSubscription(subscription.id);
    }
  };

  if (isFetching) {
    return (
      <div className="py-12 text-center text-neutral-content-muted">
        <p className="text-[13px]">Loading plan details...</p>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="p-8 rounded-3xl bg-neutral-surface border border-neutral-border text-center">
        <h3 className="text-xl font-bold mb-2">No Active Plan</h3>
        <p className="text-sm text-neutral-content-subtle mb-6">
          Subscribe to a plan to unlock professional features.
        </p>
        <button className="px-8 py-3 rounded-xl bg-neutral-content text-neutral-contrast font-bold text-sm">
          Upgrade Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-surface to-neutral-surface-hover border border-neutral-border relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Zap className="h-32 w-32" />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-2">
                Current Plan
              </p>
              <h3 className="text-3xl font-black text-neutral-content">
                {product?.name || subscription.product_code || "Pro Professional"}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-accent-surface text-accent text-[10px] font-black uppercase tracking-wider border border-accent-border">
              {subscription.status}
            </span>
          </div>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-4xl font-black">
              ${subscription.amount || "29"}
            </span>
            <span className="text-neutral-content-muted font-medium text-sm">
              /{subscription.interval || "month"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-border">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm text-neutral-content-subtle">
                Unlimited Projects
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm text-neutral-content-subtle">
                Advanced Analytics
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 py-3 rounded-2xl bg-neutral-content text-neutral-contrast font-black text-sm uppercase tracking-wider hover:opacity-90 transition-all">
          Change Plan
        </button>
        <button
          onClick={handleCancel}
          disabled={isCancelling}
          className="px-6 py-3 rounded-2xl bg-neutral-surface text-neutral-content-subtle font-bold text-sm hover:text-destructive transition-all disabled:opacity-50"
        >
          {isCancelling ? "Cancelling..." : "Cancel"}
        </button>
      </div>
    </div>
  );
};
