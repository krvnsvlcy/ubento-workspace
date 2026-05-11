import { useModalInstance } from "@/utils/modal-store";
import { Bell, Shield, User, X } from "lucide-react";
import { useState } from "react";

interface AccountModalProps {
  user: any;
}

export function AccountModal({ user }: AccountModalProps) {
  const { close } = useModalInstance();
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { key: "general", label: "General", icon: User },
    { key: "security", label: "Security", icon: Shield },
    { key: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Account Settings
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
            <p className="px-4 mb-2 text-[11px] font-bold uppercase tracking-wider text-neutral-content-muted">
              Personal
            </p>
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
            {activeTab === "general" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section className="space-y-6">
                  <div className="flex items-center gap-6 p-6 rounded-2xl bg-neutral-surface border border-neutral-border">
                    <div className="h-20 w-20 rounded-full bg-neutral-surface-hover flex items-center justify-center overflow-hidden ring-4 ring-background">
                      {user?.picture ? (
                        <img
                          src={user.picture}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-10 w-10 text-neutral-content-muted" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-content">
                        {user?.name || "User Name"}
                      </h3>
                      <p className="text-sm text-neutral-content-subtle">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-[12px] font-semibold text-foreground-200 ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-surface border border-neutral-border focus:border-neutral-border-hover focus:ring-1 focus:ring-neutral-border/10 outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[12px] font-semibold text-foreground-200 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        disabled
                        className="w-full px-4 py-3 rounded-xl bg-neutral-surface-hover/50 border border-neutral-border text-neutral-content-muted cursor-not-allowed text-sm"
                      />
                    </div>
                  </div>
                </section>

                <div className="flex justify-end pt-4">
                  <button className="px-8 py-3 rounded-xl bg-neutral-content text-neutral-contrast font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-neutral-content/10">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab !== "general" && (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="h-16 w-16 rounded-2xl bg-neutral-surface flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-neutral-content-muted" />
                </div>
                <h3 className="text-lg font-bold mb-2">Coming Soon</h3>
                <p className="text-sm text-foreground-300 max-w-xs">
                  We're currently working on this section to provide you with
                  more control over your account.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
