"use client";

import {
  Check,
  Code,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Screen } from "@/components/screen";

export function IntegrationsMockup() {
  const [activeInt, setActiveInt] = useState<
    "stripe" | "slack" | "github" | "google"
  >("stripe");
  const [connectedState, setConnectedState] = useState<Record<string, boolean>>(
    {
      stripe: true,
      slack: false,
      github: true,
      google: false,
    },
  );

  const toggleConnection = (id: string) => {
    setConnectedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Screen>
      {/* Window Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Left Sidebar / Registry Select */}
        <div className="lg:col-span-5 border-r border-border p-6 bg-surface/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Layers className="h-4 w-4 text-content" />
              <span className="text-xs font-code font-bold tracking-wider uppercase text-content-muted">
                Credential Registry
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: "stripe",
                  name: "Stripe API Gateway",
                  category: "Finance & Payouts",
                },
                {
                  id: "slack",
                  name: "Slack Bot Router",
                  category: "Real-time Alerts",
                },
                {
                  id: "github",
                  name: "GitHub OAuth Registry",
                  category: "Source Repositories",
                },
                {
                  id: "google",
                  name: "Google Calendar API",
                  category: "Events & Schedules",
                },
              ].map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveInt(service.id as any)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    activeInt === service.id
                      ? "border-border bg-surface shadow-md"
                      : "border-border hover:border-border-hover hover:bg-surface-hover/30"
                  }`}
                >
                  <div>
                    <div className="font-heading font-semibold text-sm text-content mb-1">
                      {service.name}
                    </div>
                    <div className="text-xs text-content-subtle">
                      {service.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${connectedState[service.id] ? "bg-base shadow-[0_0_8px_rgba(39,201,63,0.5)]" : "bg-border-active"}`}
                    />
                    <span className="text-[10px] font-code uppercase text-content-muted font-bold">
                      {connectedState[service.id] ? "Active" : "Offline"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-8 pt-6 border-t border-border/80">
            <div className="flex items-center gap-3 bg-background border border-border rounded-xl p-3.5 shadow-inner">
              <ShieldCheck className="h-6 w-6 text-base shrink-0" />
              <div>
                <div className="text-xs font-semibold text-content">
                  Pre-Authenticated Proxy
                </div>
                <div className="text-[10px] text-content-muted">
                  Server-injected auth ensures keys remain invisible to the
                  client.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel / Credentials form & API Terminal logs */}
        <div className="lg:col-span-7 p-6 bg-background flex flex-col justify-between min-h-[440px]">
          {/* Credentials Details Configuration Panel */}
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold bg-surface text-base border border-border/20 px-2 py-0.5 rounded uppercase font-code">
                  Configuring
                </span>
                <h3 className="font-heading font-bold text-content">
                  {activeInt === "stripe" && "Stripe Production Keys"}
                  {activeInt === "slack" && "Slack App Routing Credentials"}
                  {activeInt === "github" && "GitHub OAuth App Integration"}
                  {activeInt === "google" && "Google Calendar OAuth"}
                </h3>
              </div>

              {/* Toggle Connect Button */}
              <button
                onClick={() => toggleConnection(activeInt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all duration-200 cursor-pointer shadow-sm uppercase ${
                  connectedState[activeInt]
                    ? "border-border/20 bg-surface text-base hover:bg-base/10"
                    : "border-border/20 bg-surface text-base hover:bg-base/10"
                }`}
              >
                {connectedState[activeInt] ? "Disconnect" : "Connect"}
              </button>
            </div>

            {/* Form fields mockup */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-content-muted tracking-wider">
                    Client Registry ID
                  </span>
                  <input
                    type="text"
                    disabled
                    value={
                      activeInt === "stripe"
                        ? "stripe_live_c123f859ac938bc741aef"
                        : activeInt === "slack"
                          ? "slack_app_9a8dfc84ab8dcdcd88aa"
                          : activeInt === "github"
                            ? "github_oauth_082a938cbeacdfd1101d"
                            : "google_cal_629cdacd83efcdca22bc"
                    }
                    className="w-full text-xs font-code bg-surface/40 border border-border p-3.5 rounded-xl text-content-subtle select-none cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-content-muted tracking-wider">
                    Encrypted Server Hash
                  </span>
                  <input
                    type="text"
                    disabled
                    value="••••••••••••••••••••••••••••••••••••"
                    className="w-full text-xs font-code bg-surface/40 border border-border p-3.5 rounded-xl text-content-subtle select-none cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Configured Scopes */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-content-muted tracking-wider">
                  Authorized Gateway Scopes
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeInt === "stripe" &&
                    ["charges:read", "balance:read", "customers:write"].map(
                      (s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-1 text-[11px] font-code bg-surface border border-border px-2.5 py-1 rounded-lg text-content-subtle font-semibold"
                        >
                          <Check className="h-3 w-3 text-base" /> {s}
                        </span>
                      ),
                    )}
                  {activeInt === "slack" &&
                    ["channels:read", "chat:write", "users:read"].map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 text-[11px] font-code bg-surface border border-border px-2.5 py-1 rounded-lg text-content-subtle font-semibold"
                      >
                        <Check className="h-3 w-3 text-base" /> {s}
                      </span>
                    ))}
                  {activeInt === "github" &&
                    ["repo", "read:org", "workflow"].map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 text-[11px] font-code bg-surface border border-border px-2.5 py-1 rounded-lg text-content-subtle font-semibold"
                      >
                        <Check className="h-3 w-3 text-base" /> {s}
                      </span>
                    ))}
                  {activeInt === "google" &&
                    ["calendar.events.readonly", "calendar.readonly"].map(
                      (s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-1 text-[11px] font-code bg-surface border border-border px-2.5 py-1 rounded-lg text-content-subtle font-semibold"
                        >
                          <Check className="h-3 w-3 text-base" /> {s}
                        </span>
                      ),
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* REST API Gateway Terminal Code Output */}
          <div className="mt-8 text-left">
            <div className="px-4 py-2 border border-b-0 border-border rounded-t-xl bg-surface/30 flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold text-content-muted">
              <span>Vertex proxy gateway logs</span>
              <Code className="h-3 w-3" />
            </div>
            <div className="bg-surface border border-border rounded-b-xl p-4 font-code text-xs text-content shadow-inner">
              {connectedState[activeInt] ? (
                <div className="space-y-1 text-content-subtle text-left">
                  <p>
                    <span className="text-base">POST</span> /vertex/oauth/
                    {activeInt}/exchange
                  </p>
                  <p className="text-base font-semibold">200 OK</p>
                  <p>{"{"}</p>
                  {activeInt === "stripe" && (
                    <>
                      <p className="pl-4">"token_type": "Bearer",</p>
                      <p className="pl-4">"scope": "read_write",</p>
                      <p className="pl-4">"stripe_user_id": "acct_10329...",</p>
                    </>
                  )}
                  {activeInt === "slack" && (
                    <>
                      <p className="pl-4">"ok": true,</p>
                      <p className="pl-4">"app_id": "A08A389DCD",</p>
                      <p className="pl-4">"bot_user_id": "U01B839AD",</p>
                    </>
                  )}
                  {activeInt === "github" && (
                    <>
                      <p className="pl-4">"access_token": "gho_8x1029Ac98f",</p>
                      <p className="pl-4">"scope": "repo,read:org",</p>
                    </>
                  )}
                  {activeInt === "google" && (
                    <>
                      <p className="pl-4">"access_token": "ya29.a0AfH82aA",</p>
                      <p className="pl-4">"expires_in": 3599,</p>
                    </>
                  )}
                  <p className="pl-4">"status": "server_encrypted_vault"</p>
                  <p>{"}"}</p>
                </div>
              ) : (
                <div className="space-y-1 py-4 text-center">
                  <p className="text-hover font-semibold">
                    ⚠️ SERVICE DISCONNECTED
                  </p>
                  <p className="text-content-subtle text-[11px] leading-relaxed max-w-sm mx-auto">
                    OAuth token registry for{" "}
                    <span className="font-bold">{activeInt}</span> is currently
                    empty. Connect the service to configure proxy gateway logs.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
