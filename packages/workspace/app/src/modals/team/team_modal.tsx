import { useModalInstance } from "@/utils/modal-store";
import { CreditCard, Link as LinkIcon, Settings, X } from "lucide-react";
import { useState } from "react";
import { BillingTab } from "./tabs/billing";
import { ConnectionsTab } from "./tabs/connections";
import { GeneralTab } from "./tabs/general";

interface TeamModalProps {
  team?: any;
}

export function TeamModal({ team }: TeamModalProps) {
  const { close } = useModalInstance();
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { key: "general", label: "General", icon: Settings },
    { key: "billing", label: "Billing", icon: CreditCard },
    { key: "connections", label: "Connections", icon: LinkIcon },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Settings
        </h2>
        <button
          onClick={() => close()}
          className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-background-300"
        >
          <X className="h-5 w-5 text-foreground-300 group-hover:text-foreground-200" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-full">
          {/* Sidebar */}
          <div className="col-span-1 flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-neutral-content text-neutral-contrast shadow-lg shadow-neutral-content/10"
                    : "text-neutral-content-subtle hover:bg-neutral-surface hover:text-neutral-content"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="col-span-3 overflow-y-auto px-4">
            {activeTab === "general" && <GeneralTab team={team} />}
            {activeTab === "billing" && <BillingTab team={team} />}
            {activeTab === "connections" && <ConnectionsTab team={team} />}
          </div>
        </div>
      </div>
    </div>
  );
}
