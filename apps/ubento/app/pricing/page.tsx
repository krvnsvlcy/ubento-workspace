"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { routes } from "@/routes";
import { CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-neutral-surface font-body text-neutral-content selection:bg-neutral-surface-active flex flex-col">
      <Header />

      {/* Main Pricing Hero Section */}
      <main className="flex-grow pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="mt-8 font-heading text-5xl font-bold tracking-tight text-neutral-content max-w-3xl mx-auto leading-tight">
            Scale your leverage.
          </h1>
          <p className="mt-6 text-lg text-neutral-content-subtle max-w-2xl mx-auto">
            Explore for free, upgrade to Pro for uncapped leverage.
          </p>

          {/* Unified Pricing Card */}
          <div className="mt-16 mx-auto max-w-5xl rounded-3xl border border-neutral-border bg-background overflow-hidden flex flex-col md:flex-row text-left">
            {/* Hobby Plan */}
            <div className="flex-1 p-8 md:p-12 flex flex-col">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-8 border-b border-neutral-border/50">
                <div>
                  <h3 className="text-2xl font-bold font-heading text-neutral-content tracking-tight">
                    Hobby
                  </h3>
                  <p className="mt-2 text-sm text-neutral-content-muted">
                    For individuals exploring the WorkOS architecture.
                  </p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight font-heading text-neutral-content">
                    Free
                  </span>
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
                      <span className="text-sm text-neutral-content-subtle leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <a
                  href={routes.login()}
                  className="flex h-12 w-full items-center justify-center rounded-xl border border-neutral-border bg-transparent text-sm font-semibold text-neutral-content transition-all hover:bg-neutral-border/20 active:scale-[0.99]"
                >
                  Start Exploring
                </a>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="flex-1 p-8 md:p-12 flex flex-col bg-neutral-surface/40 border-t md:border-t-0 md:border-l border-neutral-border relative group">
              {/* Premium Subtle Gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neutral-content/[0.02] to-transparent" />

              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-8 border-b border-neutral-border/50 relative">
                <div>
                  <h3 className="text-2xl font-bold font-heading text-neutral-content tracking-tight">
                    Pro
                  </h3>
                  <p className="mt-2 text-sm text-neutral-content-muted">
                    Uncapped leverage for high-agency professionals.
                  </p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight font-heading text-neutral-content">
                    $20
                  </span>
                  <span className="ml-2 text-xs font-semibold text-neutral-content-muted uppercase tracking-wider font-mono">
                    / Month
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
                      <span className="text-sm text-neutral-content leading-relaxed font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 relative">
                <a
                  href={routes.login()}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-neutral-content text-sm font-semibold text-neutral-surface transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Upgrade to Pro
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
