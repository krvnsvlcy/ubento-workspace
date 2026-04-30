import { CreditCard, Link as LinkIcon, Settings } from "lucide-react";
import { useState } from "react";
import { Modal } from "../../app/components/modal";
import { BillingTab } from "./tabs/billing";
import { ConnectionsTab } from "./tabs/connections";
import { GeneralTab } from "./tabs/general";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: any;
}

export function TeamModal({ isOpen, onClose, team }: TeamModalProps) {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { key: "general", label: "General", icon: Settings },
    { key: "billing", label: "Billing", icon: CreditCard },
    { key: "connections", label: "Connections", icon: LinkIcon },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Team Settings">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-4 h-full">
        {/* Sidebar */}
        <div className="col-span-1 flex flex-col gap-1">
          <p className="px-4 mb-2 text-[11px] font-bold uppercase tracking-wider text-foreground-400">
            Organization
          </p>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-foreground text-background shadow-lg shadow-foreground/10"
                  : "text-foreground-300 hover:bg-background-200 hover:text-foreground"
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
          {activeTab === "billing" && <BillingTab />}
          {activeTab === "connections" && <ConnectionsTab />}
        </div>
      </div>
    </Modal>
  );
}
