"use client";

import React from "react";
import { Terminal, ShieldAlert } from "lucide-react";
import { Logo } from "@/components/logo";

export default function TermsPage() {
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

      {/* Main Terms Content */}
      <main className="flex-grow pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-border/40 bg-neutral-surface/50 px-3 py-1 text-[11px] font-medium tracking-wide text-accent uppercase font-mono">
            <ShieldAlert className="h-3.5 w-3.5" /> Software License Agreement
          </div>

          <h1 className="mt-8 font-heading text-4xl font-bold tracking-tight text-neutral-content sm:text-5xl leading-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs font-mono text-neutral-content-muted uppercase tracking-wider">
            Effective Date: May 18, 2026
          </p>

          <div className="mt-16 space-y-12 text-sm text-neutral-content-subtle leading-relaxed border-t border-neutral-border/20 pt-12">
            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">1. Agreement to Terms</h2>
              <p>
                By downloading, installing, hosting, or accessing the Ubento WorkOS software, applications, or 
                associated modules, you agree to be bound by these Terms of Service. If you do not agree to these terms, 
                do not access or use the software.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">2. Core Software License</h2>
              <p>
                Subject to your compliance with these Terms, Abstrea Tech OÜ grants you a revocable, non-exclusive, 
                non-transferable, limited license to run and execute the Ubento engine inside your authorized environments. 
                All rights, title, and interest in and to the software not explicitly granted are reserved by Abstrea Tech OÜ.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">3. Infrastructure Autonomy & Local Execution</h2>
              <p>
                Ubento is designed as a self-hosted or tenant-isolated WorkOS. You are solely responsible for provisioning 
                and maintaining the secure hosting environments, compute nodes, and database tables required to run the engine. 
                Abstrea Tech OÜ assumes zero liability for server maintenance costs, unauthorized connection leaks, or data loss 
                incurred on your local infrastructure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">4. Acceptable System Invocation</h2>
              <p>
                You agree not to bypass, disable, or modify any software-level connection validation logic, licensing checks, 
                or security boundaries. Any unauthorized injection of external compiling payloads into the AI workspace engine 
                that compromises the monorepo environment will result in immediate license termination.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">5. Limitation of Liability</h2>
              <p>
                THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. ABSTREA TECH OÜ 
                DISCLAIMS ALL LIABILITY FOR SYSTEM DOWNTIME, SECURITY LEAKS ON YOUR SERVERS, OR DATA DISCREPANCIES 
                INDUCED BY EXTERNAL SAAS SERVICE PROVIDER INTEGRATIONS (SLACK, GITHUB, JIRA, FIGMA).
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
