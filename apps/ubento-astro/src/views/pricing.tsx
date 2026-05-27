"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { routes } from "@/routes";
import { ArrowRight, CheckCircle2, Terminal } from "lucide-react";
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-neutral-surface font-body text-neutral-content selection:bg-neutral-surface-active flex flex-col">
      <Header />

      {/* Main Pricing Hero Section */}
      <main className="flex-grow pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-border/40 bg-neutral-surface/50 px-3 py-1 text-[11px] font-medium tracking-wide text-accent uppercase font-mono">
            <Terminal className="h-3 w-3" /> Early Preview Access
          </div>

          <h1 className="mt-8 font-heading text-4xl font-bold tracking-tight text-neutral-content sm:text-6xl max-w-3xl mx-auto leading-tight">
            Simple, honest pricing. Built for autonomy.
          </h1>
          <p className="mt-6 text-lg text-neutral-content-subtle max-w-2xl mx-auto">
            Take back control of your WorkOS. Run Ubento on your own
            infrastructure or secure cloud instance with zero lock-in.
          </p>

          {/* Pricing Grid */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="relative rounded-2xl border border-neutral-border bg-background p-8 md:p-12 text-left shadow-2xl overflow-hidden group">
              {/* Radial gradient background accent */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl transition-opacity group-hover:opacity-100" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-border/50">
                <div>
                  <h3 className="text-2xl font-bold font-heading text-neutral-content tracking-tight">
                    Ubento Free
                  </h3>
                  <p className="mt-2 text-sm text-neutral-content-muted">
                    Early review build for individuals & teams.
                  </p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight font-heading text-neutral-content">
                    $0
                  </span>
                  <span className="ml-2 text-xs font-semibold text-neutral-content-muted uppercase tracking-wider font-mono">
                    / Month
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-content-muted font-mono">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {[
                    "Bring your digital services into one environment",
                    "Generate workspaces with the help of AI prompt compilers",
                    "Personalize layout switches (Grid / List views)",
                    "Run integrations locally without data lock-in",
                    "Full connection and credentials control panel",
                    "Up to 3 team members per environment during preview",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
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
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-neutral-content text-sm font-semibold text-neutral-surface transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Get Started Free <ArrowRight className="h-4 w-4" />
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
