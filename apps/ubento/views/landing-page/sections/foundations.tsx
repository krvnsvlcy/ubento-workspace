"use client";

import { FoundationsMockup } from "@/components/illustrations/foundations-mockup";

export function PersonalizationShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Visual Mockup */}
        <div className="lg:col-span-7">
          <FoundationsMockup />
        </div>

        {/* Right Column: Text Copy */}
        <div className="lg:col-span-5 text-left space-y-6">
          {/* Title & Subtitle */}
          <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight text-neutral-content leading-tight">
            Skip the scaffolding.
            <br />
            Focus on your work.
          </h2>
          <p className="text-neutral-content-subtle text-base sm:text-lg leading-relaxed">
            Maintaining a standalone repo is a distraction. Ubento delivers a
            batteries-included environment. No frameworks, no custom routing, no
            codebase, just pure workflow.
          </p>
        </div>
      </div>
    </section>
  );
}
