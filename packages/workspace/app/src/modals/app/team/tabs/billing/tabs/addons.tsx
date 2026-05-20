import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { Package } from "lucide-react";
import { FC } from "react";

export const AddonsTab: FC = () => {
  const ubento = useUbento();
  const session = useSession();
  const teamId = session.teamId;

  const { data: products = [], isFetching } = ubento.billing.useProducts();
  const { mutate: createCheckout } = ubento.billing.useCreateCheckout();

  const handleBuy = (product: any) => {
    createCheckout({
      organization_id: teamId,
      product_code: product.code,
      offer_code: "default",
      redirect_url: window.location.href,
    });
  };

  if (isFetching) {
    return (
      <div className="py-12 text-center text-neutral-content-muted">
        <p className="text-[13px]">Loading addons...</p>
      </div>
    );
  }

  // Products that represent addons
  const addonProductCodes = ["ai_credit_add_on", "storage_add_on"];
  const addons = products.filter(
    (p: any) => p.type === "ADDON" || p.metadata?.is_addon || addonProductCodes.includes(p.code)
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {addons.length === 0 && (
        <div className="py-12 text-center text-neutral-content-muted">
          <p className="text-[13px]">No addons available at the moment.</p>
        </div>
      )}
      {addons.map((addon) => (
        <div
          key={addon.id}
          className="p-6 rounded-2xl bg-neutral-surface border border-neutral-border flex justify-between items-center"
        >
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-xl bg-accent-surface flex items-center justify-center">
              <Package className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-content">{addon.name}</h4>
              <p className="text-xs text-neutral-content-subtle">
                {addon.description || "Add this to your plan."}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleBuy(addon)}
            className="px-4 py-2 rounded-xl bg-neutral-content text-neutral-contrast text-xs font-black uppercase tracking-wider"
          >
            Add ${(addon as any).price || "0"}
          </button>
        </div>
      ))}
    </div>
  );
};
