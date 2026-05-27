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
          <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-neutral-content leading-tight">
            Prebuilt foundations so you can focus on your work.
          </h2>
          <p className="text-neutral-content-subtle text-base sm:text-lg leading-relaxed">
            Routing, authentication, authorization, data management, and
            integrations come ready out of the box — so your team ships
            features, not scaffolding.
          </p>
        </div>
      </div>
    </section>
  );
}
