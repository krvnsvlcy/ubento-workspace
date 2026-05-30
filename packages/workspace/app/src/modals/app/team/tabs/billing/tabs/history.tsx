import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { ArrowUpRight, History } from "lucide-react";
import { FC } from "react";

export const HistoryTab: FC = () => {
  const ubento = useUbento();
  const session = useSession();
  const teamId = session.teamId;

  const { data: invoices = [], isFetching } = ubento.billing.useInvoices({
    organization_id: teamId,
  });

  return (
    <div className="space-y-2">
      {isFetching && (
        <div className="py-12 text-center text-content-muted">
          <p className="text-[13px]">Loading invoice history...</p>
        </div>
      )}
      {!isFetching && invoices.length === 0 && (
        <div className="py-12 text-center text-content-muted">
          <p className="text-[13px]">No invoices found.</p>
        </div>
      )}
      {invoices.map((inv, i) => (
        <div
          key={inv.id}
          className="flex items-center justify-between p-4 rounded-xl hover:bg-surface transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-surface-hover flex items-center justify-center">
              <History className="h-4 w-4 text-content-muted" />
            </div>
            <div>
              <p className="text-sm font-bold">{inv.created_at || "Recent"}</p>
              <p className="text-[10px] text-content-muted font-bold uppercase">
                Invoice #{(inv as any).number || `INV-00${i + 1}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-black">
                ${(inv.total / 100).toFixed(2)}
              </p>
              <p className="text-[10px] text-base font-bold uppercase">
                {inv.status}
              </p>
            </div>
            {(inv as any).pdf_url && (
              <a
                href={(inv as any).pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-surface-hover transition-all"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
