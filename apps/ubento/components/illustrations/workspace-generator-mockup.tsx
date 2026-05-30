"use client";

import { Logo } from "@/components/logo";
import { Cpu } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Packet {
  id: string;
  label: string;
  method: string;
  type: "allow" | "deny";
  service: string;
  yOffset: number; // Vertical spacing so they don't overlap
}

const PACKET_PRESETS: Omit<Packet, "id" | "yOffset">[] = [
  {
    label: "GET /stripe/balance",
    method: "GET",
    type: "allow",
    service: "Stripe",
  },
  {
    label: "DROP TABLE users;",
    method: "SQL",
    type: "deny",
    service: "Database",
  },
  {
    label: "POST /zendesk/tickets",
    method: "POST",
    type: "allow",
    service: "Zendesk",
  },
  {
    label: "aws_secret_key=x09a...",
    method: "ENV",
    type: "deny",
    service: "Cloud",
  },
  {
    label: "GET /v1/users/me",
    method: "GET",
    type: "allow",
    service: "Database",
  },
  {
    label: "DELETE /all/records",
    method: "API",
    type: "deny",
    service: "Database",
  },
  {
    label: "POST /openai/chat",
    method: "POST",
    type: "allow",
    service: "AI Engine",
  },
];

export function WorkspaceGeneratorMockup() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [proxyState, setProxyState] = useState<
    "idle" | "evaluating" | "alert" | "pass"
  >("idle");

  useEffect(() => {
    let packetIndex = 0;
    const interval = setInterval(() => {
      const preset = PACKET_PRESETS[packetIndex % PACKET_PRESETS.length];
      const newPacket: Packet = {
        ...preset,
        id: Math.random().toString(36).substring(7),
        yOffset: (packetIndex % 3) * 28 - 28, // Offsets: -28, 0, 28
      };

      setPackets((prev) => [...prev, newPacket]);
      packetIndex++;

      // Trigger evaluation states for proxy visual sync
      setTimeout(() => {
        setProxyState(newPacket.type === "allow" ? "pass" : "alert");
        // Reset proxy to idle shortly after evaluation
        setTimeout(() => {
          setProxyState("idle");
        }, 800);
      }, 1500); // Trigger when packet reaches center (1.5s into its transition)

      // Cleanup old packets
      setTimeout(() => {
        setPackets((prev) => prev.filter((p) => p.id !== newPacket.id));
      }, 4000);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-[460px] select-none">
      {/* Main Flow Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center min-h-[360px] relative z-10">
        {/* 1. Left: AI-Generated Application */}
        <div className="md:col-span-4 flex flex-col justify-center">
          <div className="border border-border bg-surface/10 rounded-xl p-4 shadow-sm relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-2 opacity-30">
              <Cpu className="h-5 w-5 text-content" />
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold font-code bg-surface text-base border border-border/20 uppercase tracking-wider">
              Built with AI
            </span>
            <h3 className="font-heading font-bold text-sm text-content mt-2">
              Workspace App
            </h3>
            <p className="text-[11px] text-content-subtle mt-1">
              Generating client endpoints and queries.
            </p>

            {/* Fake UI code block */}
            <div className="mt-4 p-2.5 rounded-lg bg-background/80 border border-border/50 font-code text-[10px] text-content-muted space-y-1">
              <div className="flex justify-between">
                <span className="text-base">const</span> app = dev.spawn()
              </div>
              <div>app.query(payload)</div>
              <div className="text-[9px] text-base-subtle font-semibold mt-1 animate-pulse">
                ⚡ Outgoing request stream...
              </div>
            </div>
          </div>
        </div>

        {/* 2. Center: Ubento Shield / Security Proxy Gate */}
        <div className="md:col-span-4 flex flex-col items-center justify-center relative">
          {/* SVG Connecting Paths/Rails */}
          <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
            <svg className="w-full h-full" overflow="visible">
              {/* Flow lines */}
              <path
                d="M -150 180 Q 0 180 180 180"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2"
              />
              <path
                d="M -150 152 Q 0 180 180 208"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1.5"
              />
              <path
                d="M -150 208 Q 0 180 180 152"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Glowing Proxy Shield */}
          <div className="relative z-20 flex flex-col items-center">
            <motion.div
              animate={{
                scale: proxyState !== "idle" ? 1.05 : 1,
                borderColor:
                  proxyState === "pass"
                    ? "var(--color-success, #22c55e)"
                    : proxyState === "alert"
                      ? "var(--color-danger, #ef4444)"
                      : "rgba(255, 255, 255, 0.15)",
                boxShadow:
                  proxyState === "pass"
                    ? "0 0 20px rgba(34, 197, 94, 0.25)"
                    : proxyState === "alert"
                      ? "0 0 20px rgba(239, 68, 68, 0.25)"
                      : "0 0 0px rgba(0, 0, 0, 0)",
              }}
              transition={{ duration: 0.2 }}
              className="h-20 w-20 rounded-2xl border bg-background flex flex-col items-center justify-center shadow-lg relative"
            >
              {/* Pulsing indicator light */}
              <div className="absolute top-2 right-2 flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    proxyState === "pass"
                      ? "bg-base"
                      : proxyState === "alert"
                        ? "bg-danger"
                        : "bg-content-muted"
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    proxyState === "pass"
                      ? "bg-base"
                      : proxyState === "alert"
                        ? "bg-danger"
                        : "bg-content-muted"
                  }`}
                />
              </div>

              <div className="text-content flex flex-col items-center gap-1.5 p-3">
                <Logo className="h-5 w-auto" />
                <span className="text-[9px] font-code font-bold tracking-wider opacity-60">
                  GATEWAY
                </span>
              </div>
            </motion.div>

            {/* Status Badge Label */}
            <div className="mt-3 text-center">
              <span
                className={`inline-block font-code text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                  proxyState === "pass"
                    ? "bg-surface text-base border-border/30"
                    : proxyState === "alert"
                      ? "bg-danger-surface text-danger border-danger/30"
                      : "bg-surface text-content-subtle border-border"
                }`}
              >
                {proxyState === "pass"
                  ? "Allowed"
                  : proxyState === "alert"
                    ? "Blocked"
                    : "Shield Active"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Overlay Animated Data Packets Flowing */}
      <div className="absolute inset-0 pointer-events-none w-full h-full hidden md:block">
        <AnimatePresence>
          {packets.map((packet) => {
            return (
              <motion.div
                key={packet.id}
                initial={{
                  x: "60px",
                  y: `calc(230px + ${packet.yOffset}px)`,
                  opacity: 0.1,
                  scale: 0.9,
                }}
                animate={{
                  x: [
                    "60px",
                    "285px",
                    "285px",
                    packet.type === "allow" ? "530px" : "285px",
                  ],
                  y: [
                    `calc(230px + ${packet.yOffset}px)`,
                    `calc(230px + ${packet.yOffset}px)`,
                    `calc(230px + ${packet.yOffset}px)`,
                    packet.type === "allow"
                      ? `calc(230px + ${packet.yOffset}px)`
                      : `calc(230px + ${packet.yOffset + 25}px)`,
                  ],
                  opacity: [0.1, 1, 1, 0],
                  scale: [0.9, 1, 1, packet.type === "allow" ? 0.9 : 0],
                  backgroundColor: [
                    "rgba(255, 255, 255, 0.05)",
                    "rgba(255, 255, 255, 0.05)",
                    packet.type === "allow"
                      ? "rgba(34, 197, 94, 0.15)"
                      : "rgba(239, 68, 68, 0.15)",
                    packet.type === "allow"
                      ? "rgba(34, 197, 94, 0.15)"
                      : "rgba(239, 68, 68, 0.15)",
                  ],
                  borderColor: [
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(255, 255, 255, 0.1)",
                    packet.type === "allow"
                      ? "rgba(34, 197, 94, 0.4)"
                      : "rgba(239, 68, 68, 0.4)",
                    packet.type === "allow"
                      ? "rgba(34, 197, 94, 0.4)"
                      : "rgba(239, 68, 68, 0.4)",
                  ],
                  color: [
                    "rgba(255, 255, 255, 0.7)",
                    "rgba(255, 255, 255, 0.7)",
                    packet.type === "allow" ? "#22c55e" : "#ef4444",
                    packet.type === "allow" ? "#22c55e" : "#ef4444",
                  ],
                }}
                transition={{
                  duration: 3.5,
                  times: [0, 0.42, 0.62, 1],
                  ease: "easeInOut",
                }}
                exit={{ opacity: 0 }}
                className="absolute z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-surface/90 text-[10px] font-code font-medium shadow-md transition-all"
              >
                <span
                  className={`px-1 rounded text-[8px] font-bold ${
                    packet.type === "allow"
                      ? "bg-surface text-base"
                      : "bg-danger-surface text-danger"
                  }`}
                >
                  {packet.method}
                </span>
                <span>{packet.label}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
