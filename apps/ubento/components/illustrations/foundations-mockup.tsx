"use client";

import {
  Route,
  Plug,
  Database,
  ShieldCheck,
  Lock,
  Zap,
  Globe,
  Layers,
} from "lucide-react";
import { motion } from "motion/react";

const FOUNDATIONS = [
  { icon: Route, label: "Routing", color: "text-base", delay: 0 },
  { icon: Plug, label: "Integrations", color: "text-[#635BFF]", delay: 0.05 },
  { icon: Database, label: "Data Management", color: "text-base", delay: 0.1 },
  { icon: ShieldCheck, label: "Authentication", color: "text-base", delay: 0.15 },
  { icon: Lock, label: "Authorization", color: "text-base", delay: 0.2 },
  { icon: Zap, label: "Real-time Events", color: "text-base", delay: 0.25 },
  { icon: Globe, label: "API Gateway", color: "text-[#635BFF]", delay: 0.3 },
  { icon: Layers, label: "Workspace Layout", color: "text-base", delay: 0.35 },
];

export function FoundationsMockup() {
  return (
    <div className="relative w-full select-none">
      {/* App Screen on top */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
        className="relative mx-auto mb-6 w-full border border-border bg-background rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* App chrome bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface/30">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>
          <div className="flex-1 mx-2 h-5 rounded-md bg-surface border border-border/50 flex items-center px-2">
            <span className="text-[9px] font-code text-content-muted">
              app.ubento.io/workspace
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-base animate-pulse" />
            <span className="text-[9px] font-code text-content-muted">Live</span>
          </div>
        </div>

        {/* App content */}
        <div className="p-4 space-y-3">
          {/* Top row: two metric cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-border bg-surface/10 rounded-xl p-3 space-y-1">
              <div className="text-[9px] uppercase font-bold text-content-muted tracking-wider">
                Auth Sessions
              </div>
              <div className="text-base font-bold text-content">2,847</div>
              <div className="h-1 w-full rounded-full bg-surface overflow-hidden">
                <motion.div
                  className="h-full bg-base rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
            <div className="border border-border bg-surface/10 rounded-xl p-3 space-y-1">
              <div className="text-[9px] uppercase font-bold text-content-muted tracking-wider">
                API Requests
              </div>
              <div className="text-base font-bold text-content">14.2k</div>
              <div className="h-1 w-full rounded-full bg-surface overflow-hidden">
                <motion.div
                  className="h-full bg-base rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "62%" }}
                  transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Route log */}
          <div className="border border-border bg-surface/5 rounded-xl p-3 font-code text-[10px] space-y-1.5">
            <div className="text-[9px] uppercase font-bold text-content-muted tracking-wider mb-2">
              Route Activity
            </div>
            {[
              { method: "GET", path: "/api/users/me", status: "200", ms: "4ms" },
              { method: "POST", path: "/api/workspace/create", status: "201", ms: "12ms" },
              { method: "GET", path: "/api/integrations", status: "200", ms: "7ms" },
            ].map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.12 }}
                className="flex items-center justify-between text-content-muted"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold">{log.method}</span>
                  <span>{log.path}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">{log.status}</span>
                  <span className="text-content-subtle">{log.ms}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bento grid of foundations below */}
      <div className="grid grid-cols-4 gap-3">
        {FOUNDATIONS.map((f) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 + f.delay, ease: "easeOut" }}
              className="relative border border-border bg-surface/40 rounded-xl p-3 flex flex-col items-start gap-2 overflow-hidden group hover:border-border-hover hover:bg-surface-hover/20 transition-all duration-200"
            >
              {/* Subtle glow orb */}
              <div className="absolute -top-4 -right-4 h-12 w-12 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl bg-current" />
              <div className={`p-1.5 rounded-lg bg-background border border-border/60 ${f.color}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] font-heading font-semibold text-content leading-tight">
                {f.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
