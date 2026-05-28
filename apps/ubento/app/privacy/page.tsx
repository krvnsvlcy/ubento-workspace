"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-surface font-body text-neutral-content selection:bg-neutral-surface-active flex flex-col">
      <Header />

      {/* Main Privacy Content */}
      <main className="flex-grow pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="mt-8 font-heading text-4xl font-bold tracking-tight text-neutral-content sm:text-5xl leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs font-mono text-neutral-content-muted uppercase tracking-wider">
            Last Revised: May 18, 2026
          </p>

          <div className="mt-16 space-y-12 text-sm text-neutral-content-subtle leading-relaxed border-t border-neutral-border/20 pt-12">
            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">
                1. Our Privacy Philosophy
              </h2>
              <p>
                At Ubento, we believe that you should have complete agency and
                control over your digital environment. Our architectural
                approach mandates data minimization. We build tools that
                prioritize localized execution, direct-authorized service
                connections, and transparent security practices.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">
                2. Localized Security & Credentials Isolation
              </h2>
              <p>
                Ubento is a localized WorkOS engine. This means your service
                credentials, tokens, connection configurations, and dynamic
                sandboxes run locally or inside your dedicated private cloud
                nodes. We do not store or inspect your authenticated sessions on
                central servers unless explicitly required by decentralized
                peer-to-peer collaborative modules you choose to activate.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">
                3. Telemetry & Analytics
              </h2>
              <p>
                To help improve the reliability and response speed of our AI
                workspace prompt compiler, Ubento collects limited, fully
                anonymized diagnostic logs and performance metrics. You have the
                direct right to fully toggle off all crash logs and telemetry
                options directly within your dashboard settings at any time.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">
                4. Secure Proxy Actions
              </h2>
              <p>
                When connecting external service credentials (such as Slack,
                GitHub, Jira, or Figma) through the Vertex connection manager,
                data transmissions utilize direct OAuth exchanges with the
                service providers. No token credentials are ever cached in
                transit beyond the direct session token required to render your
                active workspace widgets.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-neutral-content">
                5. Contact Information
              </h2>
              <p>
                For questions regarding data processing, localization security,
                or to exercise your complete right to be forgotten, please reach
                out to our privacy compliance department at{" "}
                <span className="font-mono text-neutral-content">
                  privacy@abstrea.tech
                </span>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
