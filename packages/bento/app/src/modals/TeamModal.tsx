import { 
  Settings, 
  CreditCard, 
  Plus,
  ArrowUpRight,
  Clock,
  Zap,
  Package,
  History,
  Link as LinkIcon,
  Globe
} from "lucide-react";
import React, { useState } from "react";
import { Modal } from "../app/components/modal";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: any;
}

export function TeamModal({ isOpen, onClose, team }: TeamModalProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [activeBillingTab, setActiveBillingTab] = useState("plan");

  const tabs = [
    { key: "general", label: "General", icon: Settings },
    { key: "billing", label: "Billing", icon: CreditCard },
    { key: "connections", label: "Connections", icon: LinkIcon },
  ];

  const billingTabs = [
    { key: "plan", label: "Plan" },
    { key: "usage", label: "Usage" },
    { key: "addons", label: "Addons" },
    { key: "history", label: "History" },
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
          {activeTab === "general" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section className="space-y-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-semibold text-foreground-200 ml-1">
                      Team Name
                    </label>
                    <input
                      type="text"
                      defaultValue={team?.name}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-4 py-3 rounded-xl bg-background-200 border border-foreground/5 focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-semibold text-foreground-200 ml-1">
                      Team Handle
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400 text-sm">ubento.pro/</span>
                      <input
                        type="text"
                        defaultValue={team?.handle}
                        placeholder="acme"
                        className="w-full pl-24 pr-4 py-3 rounded-xl bg-background-200 border border-foreground/5 focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="pt-8 border-t border-foreground/5">
                <h4 className="text-sm font-bold text-foreground mb-4">Danger Zone</h4>
                <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-red-400">Delete Team</p>
                      <p className="text-xs text-red-400/60">Permanently remove this team and all associated data.</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all">
                      Delete
                    </button>
                  </div>
                </div>
              </section>

              <div className="flex justify-end pt-4">
                <button className="px-8 py-3 rounded-xl bg-foreground text-background font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-foreground/10">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
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

              {activeBillingTab === "plan" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-background-200 to-background-300 border border-foreground/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Zap className="h-32 w-32" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <p className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] mb-2">Current Plan</p>
                          <h3 className="text-3xl font-black text-foreground">Pro Professional</h3>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-[10px] font-black uppercase tracking-wider border border-primary-500/20">Active</span>
                      </div>
                      <div className="flex items-baseline gap-1 mb-8">
                        <span className="text-4xl font-black">$29</span>
                        <span className="text-foreground-400 font-medium text-sm">/month</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-foreground/5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-primary-500" />
                          <span className="text-sm text-foreground-300">Unlimited Projects</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-primary-500" />
                          <span className="text-sm text-foreground-300">Advanced Analytics</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 rounded-2xl bg-foreground text-background font-black text-sm uppercase tracking-wider hover:opacity-90 transition-all">
                      Change Plan
                    </button>
                    <button className="px-6 py-3 rounded-2xl bg-background-200 text-foreground-300 font-bold text-sm hover:text-red-400 transition-all">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {activeBillingTab === "usage" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {[
                    { label: "AI Credits", used: 850, total: 1000, unit: "credits" },
                    { label: "Build Runs", used: 142, total: 500, unit: "runs" },
                    { label: "Storage", used: 4.2, total: 10, unit: "GB" },
                  ].map((item) => (
                    <div key={item.label} className="p-5 rounded-2xl bg-background-200 border border-foreground/5 space-y-3">
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="font-bold text-foreground">{item.label}</h4>
                          <p className="text-[10px] text-foreground-400 uppercase font-bold tracking-wider">Usage this period</p>
                        </div>
                        <p className="text-sm font-bold">
                          {item.used} <span className="text-foreground-400 font-medium">/ {item.total} {item.unit}</span>
                        </p>
                      </div>
                      <div className="h-2 w-full bg-background-400 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary-500 transition-all duration-1000" 
                          style={{ width: `${(item.used / item.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeBillingTab === "addons" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-6 rounded-2xl bg-background-200 border border-foreground/5 flex justify-between items-center">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Extra AI Credits</h4>
                        <p className="text-xs text-foreground-300">Add 5,000 more AI credits to your plan.</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-foreground text-background text-xs font-black uppercase tracking-wider">
                      Add $10
                    </button>
                  </div>
                </div>
              )}

              {activeBillingTab === "history" && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  {[
                    { date: "Apr 12, 2026", amount: "$29.00", status: "Paid" },
                    { date: "Mar 12, 2026", amount: "$29.00", status: "Paid" },
                    { date: "Feb 12, 2026", amount: "$29.00", status: "Paid" },
                  ].map((inv, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-background-200 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-background-300 flex items-center justify-center">
                          <History className="h-4 w-4 text-foreground-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{inv.date}</p>
                          <p className="text-[10px] text-foreground-400 font-bold uppercase">Invoice #INV-00{i+1}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-black">{inv.amount}</p>
                          <p className="text-[10px] text-primary-400 font-bold uppercase">{inv.status}</p>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-background-300 transition-all">
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "connections" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">Connections</h3>
                    <p className="text-sm text-foreground-300">Manage your organization's external service integrations.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-black uppercase tracking-wider">
                    <Plus className="h-3 w-3" />
                    Add Connection
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "GitHub", status: "Connected", icon: Globe, user: "acme-inc" },
                    { name: "Slack", status: "Connected", icon: Globe, user: "#alerts" },
                    { name: "AWS", status: "Needs Re-auth", icon: Globe, user: "prod-iam", error: true },
                  ].map((conn) => (
                    <div key={conn.name} className="flex items-center justify-between p-4 rounded-2xl bg-background-200 border border-foreground/5 group hover:border-foreground/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${conn.error ? 'bg-red-500/10 text-red-400' : 'bg-background-300 text-foreground-400'}`}>
                          <conn.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{conn.name}</p>
                          <p className="text-[10px] text-foreground-400 font-bold uppercase">{conn.user}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${conn.error ? 'text-red-400' : 'text-primary-400'}`}>
                          {conn.status}
                        </span>
                        <button className="p-2 rounded-lg bg-background-300 opacity-0 group-hover:opacity-100 transition-all">
                          <Settings className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="p-6 rounded-2xl bg-primary-500/5 border border-primary-500/10 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary-500/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm font-bold">Auto-sync active</p>
                  <p className="text-xs text-foreground-300">Your connections are synchronized across all workspace instances.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
