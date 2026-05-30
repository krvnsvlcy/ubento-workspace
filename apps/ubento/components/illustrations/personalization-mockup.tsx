"use client";

import {
  Activity,
  ArrowRight,
  Check,
  Sliders,
} from "lucide-react";
import { useState } from "react";
import { Screen } from "@/components/screen";

export function PersonalizationMockup() {
  const [layoutStyle, setLayoutStyle] = useState<"split" | "grid" | "focused">(
    "split",
  );
  const [sidebarPos, setSidebarPos] = useState<"left" | "right">("left");
  const [visibleWidgets, setVisibleWidgets] = useState<Record<string, boolean>>(
    {
      metrics: true,
      terminal: true,
      activity: true,
    },
  );

  const toggleWidget = (id: string) => {
    setVisibleWidgets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Screen>
      {/* Window Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Left Sidebar / Layout Controls */}
        <div className="lg:col-span-5 border-r border-border p-6 bg-surface/20 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sliders className="h-4 w-4 text-content" />
                <span className="text-xs font-code font-bold tracking-wider uppercase text-content-muted">
                  Layout Mode
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "split", label: "Split View" },
                  { id: "grid", label: "3-Col Grid" },
                  { id: "focused", label: "Focused" },
                ].map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setLayoutStyle(layout.id as any)}
                    className={`text-center py-2 px-1 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      layoutStyle === layout.id
                        ? "border-border bg-surface text-content shadow-sm"
                        : "border-border hover:border-border-hover bg-background/50 text-content-subtle"
                    }`}
                  >
                    {layout.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sliders className="h-4 w-4 text-content" />
                <span className="text-xs font-code font-bold tracking-wider uppercase text-content-muted">
                  Sidebar Position
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "left", label: "Left Side" },
                  { id: "right", label: "Right Side" },
                ].map((pos) => (
                  <button
                    key={pos.id}
                    disabled={layoutStyle === "focused"}
                    onClick={() => setSidebarPos(pos.id as any)}
                    className={`text-center py-2 px-2 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      layoutStyle === "focused"
                        ? "opacity-40 cursor-not-allowed border-border text-content-muted bg-surface/10"
                        : sidebarPos === pos.id
                          ? "border-border bg-surface text-content shadow-sm"
                          : "border-border hover:border-border-hover bg-background/50 text-content-subtle"
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sliders className="h-4 w-4 text-content" />
                <span className="text-xs font-code font-bold tracking-wider uppercase text-content-muted">
                  Toggle Sandbox Widgets
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { id: "metrics", label: "📊 Stripe Revenue Metrics" },
                  {
                    id: "terminal",
                    label: "💻 Server API Response Logs",
                  },
                  { id: "activity", label: "🔔 Recent Actions Feed" },
                ].map((widget) => (
                  <button
                    key={widget.id}
                    onClick={() => toggleWidget(widget.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      visibleWidgets[widget.id]
                        ? "border-border bg-surface shadow-sm"
                        : "border-border hover:border-border-hover bg-background/30"
                    }`}
                  >
                    <span className="text-xs font-heading font-medium text-content">
                      {widget.label}
                    </span>
                    <span
                      className={`h-4 w-4 rounded border flex items-center justify-center transition-all ${
                        visibleWidgets[widget.id]
                          ? "bg-base border-border text-contrast"
                          : "border-border"
                      }`}
                    >
                      {visibleWidgets[widget.id] && (
                        <Check className="h-3 w-3" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="mt-8 pt-6 border-t border-border/80">
            <div className="flex items-center gap-3 bg-background border border-border rounded-xl p-3.5 shadow-inner">
              <Activity className="h-5 w-5 text-base animate-pulse shrink-0" />
              <div>
                <div className="text-xs font-semibold text-content">
                  Real-time Layout Engine
                </div>
                <div className="text-[10px] text-content-muted">
                  Instantly serializes layout schemas inside local JSON cache.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel / Interactive live preview workspace */}
        <div className="lg:col-span-7 p-6 bg-background flex flex-col justify-center min-h-[440px]">
          <div className="border border-border rounded-xl bg-surface/10 p-4 min-h-[360px] flex flex-col justify-between shadow-sm">
            {/* Mini Workspace Top bar */}
            <div className="flex justify-between items-center pb-3 border-b border-border mb-4">
              <div className="flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-base" />
                <span className="text-xs font-bold text-content font-heading uppercase">
                  Live Custom Sandbox
                </span>
              </div>
              <div className="flex gap-1.5 items-center">
                <span className="h-2 w-2 rounded-full bg-base animate-pulse" />
                <span className="text-[10px] font-code text-content-muted uppercase">
                  Layout: {layoutStyle}
                </span>
              </div>
            </div>

            {/* Main Sandbox Layout container */}
            <div
              className={`flex flex-1 gap-4 text-left ${sidebarPos === "right" ? "flex-row-reverse" : "flex-row"} ${layoutStyle === "focused" ? "flex-col" : ""}`}
            >
              {/* Sandbox Sidebar (if not focused) */}
              {layoutStyle !== "focused" && (
                <div className="w-1/4 border-r border-border/80 pr-3 flex flex-col gap-2 bg-surface/20 p-2 rounded-lg">
                  <div className="h-3 w-12 rounded bg-border mb-2 animate-pulse" />
                  <div className="h-2 w-full rounded bg-surface-hover" />
                  <div className="h-2 w-3/4 rounded bg-surface-hover" />
                  <div className="h-2 w-5/6 rounded bg-surface-hover" />
                </div>
              )}

              {/* Sandbox Content Area */}
              <div
                className={`flex-1 flex flex-col gap-3 ${layoutStyle === "grid" ? "grid grid-cols-1 sm:grid-cols-2" : ""}`}
              >
                {/* Card 1: Stripe Metrics */}
                {visibleWidgets.metrics && (
                  <div className="p-3 border border-border bg-background rounded-xl space-y-1 shadow-inner transition-all duration-300">
                    <div className="text-[9px] uppercase font-bold text-content-muted tracking-wider">
                      Revenue Stream
                    </div>
                    <div className="text-sm font-bold text-content">
                      $14,230.80
                    </div>
                    <div className="text-[8px] text-base font-medium flex items-center gap-0.5">
                      <ArrowRight className="h-2 w-2 -rotate-45" /> +12% balance
                    </div>
                  </div>
                )}

                {/* Card 2: Server API Terminal */}
                {visibleWidgets.terminal && (
                  <div className="p-3 border border-border bg-background rounded-xl space-y-1 shadow-inner transition-all duration-300 font-code">
                    <div className="text-[9px] uppercase font-bold text-content-muted tracking-wider">
                      Server Response
                    </div>
                    <div className="font-code text-[10px] text-base flex justify-between">
                      <span>[200 OK] GET /workspaces</span>
                      <span className="text-content-muted text-[8px]">
                        8ms
                      </span>
                    </div>
                    <div className="h-1 w-full bg-surface rounded-full overflow-hidden">
                      <div className="h-full bg-base w-1/3" />
                    </div>
                  </div>
                )}

                {/* Card 3: Recent Activity Feed */}
                {visibleWidgets.activity && (
                  <div className="p-3 border border-border bg-background rounded-xl space-y-1 shadow-inner transition-all duration-300">
                    <div className="text-[9px] uppercase font-bold text-content-muted tracking-wider">
                      Recent Actions
                    </div>
                    <div className="space-y-1">
                      <div className="text-[9px] text-content flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-base shrink-0" />
                        <span>Elena connected Slack</span>
                      </div>
                      <div className="text-[9px] text-content flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-base shrink-0" />
                        <span>Vertex registry synced</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Placeholder if nothing visible */}
                {!visibleWidgets.metrics &&
                  !visibleWidgets.terminal &&
                  !visibleWidgets.activity && (
                    <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border bg-surface/5 rounded-xl p-8 text-center">
                      <Sliders className="h-8 w-8 text-content-muted mb-2 animate-bounce" />
                      <p className="text-xs font-semibold text-content">
                        No widgets active
                      </p>
                      <p className="text-[10px] text-content-muted max-w-[200px] mt-1 mx-auto">
                        Toggle widgets on the left to see live workspace
                        renders.
                      </p>
                    </div>
                  )}
              </div>
            </div>

            {/* Bottom status line */}
            <div className="flex justify-between items-center pt-3 border-t border-border mt-4 text-[9px] text-content-muted font-code">
              <span>Render Target: Sandbox Canvas</span>
              <span>Ready</span>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
