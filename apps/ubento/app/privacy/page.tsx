"use client";

import React from "react";
import { Terminal, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-surface font-body text-neutral-content selection:bg-neutral-surface-active flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-neutral-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2 font-heading font-bold tracking-tight text-neutral-content hover:opacity-85 transition-opacity">
            <Logo style={{ width: 100 }} />
          </a>
          <div className="flex items-center gap-6">
            <a
              href="/pricing"
              className="text-sm font-medium text-neutral-content-subtle hover:text-neutral-content transition-colors"
            >
              Pricing
            </a>
            <a
              href="/vertex/oauth/connect"
              className="rounded-3xl bg-inverse px-4 py-2 text-sm font-medium text-inverse-contrast transition-colors hover:bg-inverse-hover active:bg-inverse-active"
            >
              Get Ubento Free
            </a>
          </div>
        </div>
      </nav>

      {/* Main Privacy Content */}
      <main className="flex-grow pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-border/40 bg-neutral-surface/50 px-3 py-1 text-[11px] font-medium tracking-wide text-accent uppercase font-mono">
            <ShieldCheck className="h-3.5 w-3.5" /> Data Security & Integrity
          </div>

          <h1 className="mt-8 font-heading text-4xl font-bold tracking-tight text-neutral-content sm:text-5xl leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs font-mono text-neutral-content-muted uppercase tracking-wider">
            Last Revised: May 18, 2026
          </p>

          <div className="mt-16 space-y-12 text-sm text-neutral-content-subtle leading-relaxed border-t border-neutral-border/20 pt-12">
            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">1. Our Privacy Philosophy</h2>
              <p>
                At Ubento, we believe that you should have complete agency and control over your digital environment. 
                Our architectural approach mandates data minimization. We build tools that prioritize localized execution, 
                direct-authorized service connections, and transparent security practices.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">2. Localized Security & Credentials Isolation</h2>
              <p>
                Ubento is a localized WorkOS engine. This means your service credentials, tokens, connection configurations, 
                and dynamic sandboxes run locally or inside your dedicated private cloud nodes. We do not store or inspect 
                your authenticated sessions on central servers unless explicitly required by decentralized peer-to-peer 
                collaborative modules you choose to activate.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">3. Telemetry & Analytics</h2>
              <p>
                To help improve the reliability and response speed of our AI workspace prompt compiler, Ubento collects 
                limited, fully anonymized diagnostic logs and performance metrics. You have the direct right to fully toggle 
                off all crash logs and telemetry options directly within your dashboard settings at any time.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">4. Secure Proxy Actions</h2>
              <p>
                When connecting external service credentials (such as Slack, GitHub, Jira, or Figma) through the Vertex 
                connection manager, data transmissions utilize direct OAuth exchanges with the service providers. No token 
                credentials are ever cached in transit beyond the direct session token required to render your active workspace widgets.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">5. Contact Information</h2>
              <p>
                For questions regarding data processing, localization security, or to exercise your complete right to 
                be forgotten, please reach out to our privacy compliance department at <span className="font-mono text-neutral-content">privacy@abstrea.tech</span>.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-surface py-24 border-t border-neutral-border/20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            {/* Brand Column */}
            <div className="md:col-span-6 space-y-6 text-left">
              <div className="flex items-center gap-2 font-heading font-bold text-neutral-content">
                <Terminal className="h-5 w-5 text-accent shrink-0" />
                <span className="tracking-tight text-lg">UBENTO</span>
              </div>
              <p className="text-sm text-neutral-content-subtle max-w-sm leading-relaxed">
                The dynamic WorkOS engine built for speed and autonomy.
              </p>
              <p className="text-xs text-neutral-content-muted">
                © 2026 Ubento. All rights reserved.
              </p>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-6 grid grid-cols-3 gap-8 text-left">
              {/* Product Column */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase">
                  Product
                </h4>
                <ul className="space-y-3 text-sm text-neutral-content-subtle">
                  <li>
                    <a href="/pricing" className="hover:text-neutral-content transition-colors">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal Column */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase">
                  Legal
                </h4>
                <ul className="space-y-3 text-sm text-neutral-content-subtle">
                  <li>
                    <a href="/privacy" className="hover:text-neutral-content transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="hover:text-neutral-content transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-neutral-content transition-colors">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Connect Column */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase">
                  Connect
                </h4>
                <ul className="space-y-3 text-sm text-neutral-content-subtle">
                  <li>
                    <a href="#" className="hover:text-neutral-content transition-colors">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-neutral-content transition-colors">
                      X
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
