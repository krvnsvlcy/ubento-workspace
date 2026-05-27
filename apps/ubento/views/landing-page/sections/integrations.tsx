"use client";

import { IntegrationsMockup } from "@/components/illustrations/integrations-mockup";
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

export function IntegrationsShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center space-y-16">
      {/* Text Copy */}
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-6">
          {/* Title & Subtitle */}
          <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-neutral-content leading-tight">
            Bring your digital services in one environment.
          </h2>
          <p className="text-neutral-content-subtle text-base sm:text-lg leading-relaxed">
            Connect your digital services natively. No writing complex API
            wrappers or setting up insecure proxy gateways.
          </p>
        </div>

        {/* Animated Row of Integration Logos */}
        <div
          className="relative w-full overflow-hidden py-8"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <motion.div
            className="flex gap-8 whitespace-nowrap min-w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            }}
          >
            {/* First set of logos */}
            <div className="flex gap-8 shrink-0 items-center py-2">
              {LOGOS.map((logo) => (
                <div
                  key={`${logo}-1`}
                  className="flex items-center justify-center bg-neutral-surface border border-neutral-border rounded-xl h-16 w-16 shrink-0 transition-all duration-200 hover:scale-[1.05] hover:border-neutral-border-hover"
                >
                  <img
                    src={`/logos/${logo}.webp`}
                    alt={logo}
                    className="h-full w-full rounded-xl object-cover"
                  />
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless looping */}
            <div className="flex gap-8 shrink-0 items-center py-2">
              {LOGOS.map((logo) => (
                <div
                  key={`${logo}-2`}
                  className="flex items-center justify-center bg-neutral-surface border border-neutral-border rounded-xl h-16 w-16 shrink-0 transition-all duration-200 hover:scale-[1.05] hover:border-neutral-border-hover"
                >
                  <img
                    src={`/logos/${logo}.webp`}
                    alt={logo}
                    className="h-full w-full rounded-xl object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Visual Mockup */}
      <div className="w-full">
        <IntegrationsMockup />
      </div>
    </section>
  );
}
