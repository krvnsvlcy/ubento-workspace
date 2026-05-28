"use client";

import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Typography } from "@/components/typography";
import { routes } from "@/routes";
import { CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-neutral-surface font-body text-neutral-content selection:bg-neutral-surface-active flex flex-col">
      <Header />

      {/* Main Pricing Hero Section */}
      <main className="flex-grow pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Typography
            variant="h1"
            className="mt-8 text-5xl max-w-3xl mx-auto font-bold tracking-tight"
          >
            Scale your leverage.
          </Typography>
          <Typography variant="body-large" className="mt-6 max-w-2xl mx-auto">
            Explore for free, upgrade to Pro for uncapped leverage.
          </Typography>

          {/* Unified Pricing Card */}
          <div className="mt-16 mx-auto max-w-5xl rounded-3xl border border-neutral-border bg-background overflow-hidden flex flex-col md:flex-row text-left">
            {/* Hobby Plan */}
            <div className="flex-1 p-8 md:p-12 flex flex-col">
              <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 pb-8 border-b border-neutral-border/50">
                <div>
                  <Typography shade="default" weight="bold">
                    Hobby
                  </Typography>
                  <Typography variant="body-small">
                    For individuals exploring the WorkOS architecture.
                  </Typography>
                </div>
                <div className="flex items-baseline">
                  <Typography variant="h3">Free</Typography>
                </div>
              </div>

              <div className="mt-8 flex-grow">
                <ul className="space-y-4">
                  {[
                    "Core native integrations",
                    "Standard AI-compiled workspace generation",
                    "Localized execution with zero data lock-in",
                    "Single user environment",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-neutral-content-muted shrink-0 mt-0.5" />
                      <Typography
                        variant="body-small"
                        as="span"
                        className="leading-relaxed"
                      >
                        {feature}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <Button
                  href={routes.login()}
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  Start Exploring
                </Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="flex-1 p-8 md:p-12 flex flex-col bg-neutral-surface/40 border-t md:border-t-0 md:border-l border-neutral-border relative group">
              {/* Premium Subtle Gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neutral-surface-hover to-transparent" />

              <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 pb-8 border-b border-neutral-border/50 relative">
                <div>
                  <Typography shade="default" weight="bold">
                    Pro
                  </Typography>
                  <Typography variant="body-small">
                    Uncapped leverage for high-agency professionals.
                  </Typography>
                </div>
                <div className="flex items-baseline">
                  <Typography variant="h3">$20</Typography>
                  <span className="ml-2 text-xs font-semibold text-neutral-content-muted uppercase tracking-wider font-mono">
                    /mo
                  </span>
                </div>
              </div>

              <div className="mt-8 flex-grow relative">
                <ul className="space-y-4">
                  {[
                    "Unlimited native integrations",
                    "Advanced AI-compiled environments",
                    "Transparent credential and connection gating",
                    "Up to 3 collaborators per environment",
                    "Priority access to new API surfaces",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-neutral-content shrink-0 mt-0.5" />
                      <Typography
                        variant="body-small"
                        as="span"
                        shade="default"
                        weight="medium"
                        className="leading-relaxed"
                      >
                        {feature}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 relative">
                <Button
                  href={routes.login()}
                  variant="secondary"
                  size="md"
                  className="w-full"
                >
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
