import { FC } from "react";
import { ArrowUpRight, History } from "lucide-react";

export const HistoryTab: FC = () => {
  const invoices = [
    { date: "Apr 12, 2026", amount: "$29.00", status: "Paid" },
    { date: "Mar 12, 2026", amount: "$29.00", status: "Paid" },
    { date: "Feb 12, 2026", amount: "$29.00", status: "Paid" },
  ];

  return (
    <div className="space-y-2 animate-in fade-in duration-300">
      {invoices.map((inv, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 rounded-xl hover:bg-neutral-surface transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-neutral-surface-hover flex items-center justify-center">
              <History className="h-4 w-4 text-neutral-content-muted" />
            </div>
            <div>
              <p className="text-sm font-bold">{inv.date}</p>
              <p className="text-[10px] text-neutral-content-muted font-bold uppercase">
                Invoice #INV-00{i + 1}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-black">{inv.amount}</p>
              <p className="text-[10px] text-accent font-bold uppercase">
                {inv.status}
              </p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-neutral-surface-hover transition-all">
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
