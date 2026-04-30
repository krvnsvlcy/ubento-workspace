import { FC, useState } from "react";
import { PlanTab } from "./plan";
import { UsageTab } from "./usage";
import { AddonsTab } from "./addons";
import { HistoryTab } from "./history";

export const BillingTab: FC = () => {
  const [activeBillingTab, setActiveBillingTab] = useState("plan");

  const billingTabs = [
    { key: "plan", label: "Plan" },
    { key: "usage", label: "Usage" },
    { key: "addons", label: "Addons" },
    { key: "history", label: "History" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Billing Sub-navigation */}
      <div className="flex gap-1 p-1 rounded-2xl bg-background-200 w-fit">
        {billingTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveBillingTab(tab.key)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeBillingTab === tab.key
                ? "bg-background shadow-sm text-foreground"
                : "text-foreground-400 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeBillingTab === "plan" && <PlanTab />}
      {activeBillingTab === "usage" && <UsageTab />}
      {activeBillingTab === "addons" && <AddonsTab />}
      {activeBillingTab === "history" && <HistoryTab />}
    </div>
  );
};
