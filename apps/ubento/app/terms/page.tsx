"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-surface font-body text-neutral-content selection:bg-neutral-surface-active flex flex-col">
      <Header />

      {/* Main Terms Content */}
      <main className="flex-grow pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="mt-8 font-heading text-4xl font-bold tracking-tight text-neutral-content sm:text-5xl leading-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs font-mono text-neutral-content-muted uppercase tracking-wider">
            Effective Date: May 18, 2026
          </p>

          <div className="mt-16 space-y-12 text-sm text-neutral-content-subtle leading-relaxed border-t border-neutral-border/20 pt-12">
            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">
                1. Agreement to Terms
              </h2>
              <p>
                By downloading, installing, hosting, or accessing the Ubento
                WorkOS software, applications, or associated modules, you agree
                to be bound by these Terms of Service. If you do not agree to
                these terms, do not access or use the software.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">
                2. Core Software License
              </h2>
              <p>
                Subject to your compliance with these Terms, Abstrea Tech OÜ
                grants you a revocable, non-exclusive, non-transferable, limited
                license to run and execute the Ubento engine inside your
                authorized environments. All rights, title, and interest in and
                to the software not explicitly granted are reserved by Abstrea
                Tech OÜ.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">
                3. Infrastructure Autonomy & Local Execution
              </h2>
              <p>
                Ubento is designed as a self-hosted or tenant-isolated WorkOS.
                You are solely responsible for provisioning and maintaining the
                secure hosting environments, compute nodes, and database tables
                required to run the engine. Abstrea Tech OÜ assumes zero
                liability for server maintenance costs, unauthorized connection
                leaks, or data loss incurred on your local infrastructure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">
                4. Acceptable System Invocation
              </h2>
              <p>
                You agree not to bypass, disable, or modify any software-level
                connection validation logic, licensing checks, or security
                boundaries. Any unauthorized injection of external compiling
                payloads into the AI workspace engine that compromises the
                monorepo environment will result in immediate license
                termination.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">
                5. Limitation of Liability
              </h2>
              <p>
                THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND. ABSTREA TECH OÜ DISCLAIMS ALL LIABILITY
                FOR SYSTEM DOWNTIME, SECURITY LEAKS ON YOUR SERVERS, OR DATA
                DISCREPANCIES INDUCED BY EXTERNAL SAAS SERVICE PROVIDER
                INTEGRATIONS (SLACK, GITHUB, JIRA, FIGMA).
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
