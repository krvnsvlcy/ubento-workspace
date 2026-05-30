"use client";

import { motion } from "motion/react";

const LOGOS = [
  "stripe",
  "github",
  "google",
  "notion",
  "plaid",
  "sentry",
  "vercel",
  "cloudflare",
  "figma",
  "supabase",
  "todoist",
  "posthog",
  "discord",
  "twilio",
  "clerk",
  "auth0",
  "zendesk",
];

export function VerticalScrollingLogos() {
  return (
    <div
      className="relative overflow-hidden h-[600px]"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <motion.div
        className="flex flex-col gap-4 items-center"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
      >
        {/* First set */}
        {LOGOS.map((logo) => (
          <div
            key={`${logo}-1`}
            className="flex items-center justify-center bg-surface border border-border rounded-xl h-14 w-14 shrink-0 transition-all duration-200 hover:scale-[1.05] hover:border-border-hover"
          >
            <img
              src={`/logos/${logo}.webp`}
              alt={logo}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {LOGOS.map((logo) => (
          <div
            key={`${logo}-2`}
            className="flex items-center justify-center bg-surface border border-border rounded-xl h-14 w-14 shrink-0 transition-all duration-200 hover:scale-[1.05] hover:border-border-hover"
          >
            <img
              src={`/logos/${logo}.webp`}
              alt={logo}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
