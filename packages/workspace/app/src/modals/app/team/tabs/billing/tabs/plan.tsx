import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { Zap } from "lucide-react";
import { FC } from "react";

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
    subscription?.product_code as string,
    {
      enabled: !!subscription?.product_code,
    },
  );

  const { mutate: cancelSubscription, isPending: isCancelling } =
    ubento.billing.useCancelSubscription();

  const { data: offers = [] } = ubento.billing.useOffers({
    code: "ide.hobby",
  });
  const hobbyOffer = offers[0];

  const { data: proOffers = [] } = ubento.billing.useOffers({
    code: "ide.pro",
  });
  const proOffer = proOffers[0];

  const { mutate: createCheckout } = ubento.billing.useCreateCheckout();

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

  const handleUpgrade = () => {
    if (proOffer) {
      createCheckout({
        organization_id: teamId,
        product_code: proOffer.product_code,
        offer_code: proOffer.code,
        redirect_url: window.location.href,
      });
    }
  };

  const handleChangePlan = () => {
    // Basic change plan flow triggers upgrade for now if no specific flow exists
    handleUpgrade();
  };

  if (!subscription) {
    return (
      <div className="space-y-6">
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
                  {hobbyOffer?.name || "Hobby"}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-neutral-surface text-neutral-content-muted text-[10px] font-black uppercase tracking-wider border border-neutral-border">
                Free
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black">$0</span>
              <span className="text-neutral-content-muted font-medium text-sm">
                /month
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-border">
              {(hobbyOffer as any)?.metadata?.ui?.features?.map(
                (feature: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-neutral-content-subtle" />
                    <span className="text-sm text-neutral-content-subtle">
                      {feature.name}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleUpgrade}
            className="flex-1 py-3 rounded-2xl bg-neutral-content text-neutral-contrast font-black text-sm uppercase tracking-wider hover:opacity-90 transition-all"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
                {product?.name || subscription.product_code || "Pro"}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-accent-surface text-accent text-[10px] font-black uppercase tracking-wider border border-accent-border">
              {subscription.status}
            </span>
          </div>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-4xl font-black">
              $
              {((subscription as any)?.data?.attributes?.first_subscription_item
                ?.price || 2900) / 100}
            </span>
            <span className="text-neutral-content-muted font-medium text-sm">
              /month
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-border">
            {proOffer &&
              (proOffer as any)?.metadata?.ui?.features?.map(
                (feature: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-sm text-neutral-content-subtle">
                      {feature.name}
                    </span>
                  </div>
                ),
              )}
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleChangePlan}
          className="flex-1 py-3 rounded-2xl bg-neutral-content text-neutral-contrast font-black text-sm uppercase tracking-wider hover:opacity-90 transition-all"
        >
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
