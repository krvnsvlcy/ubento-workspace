"use client";

import { WorkspaceGeneratorMockup } from "@/components/illustrations/workspace-generator-mockup";

export function WorkspaceGeneratorShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-left space-y-16">
      {/* Text Copy */}
      <div className="max-w-3xl space-y-6">
        <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight text-neutral-content leading-tight">
          AI generated software <br /> without the security risk.
        </h2>
        <p className="text-neutral-content-subtle text-base sm:text-lg leading-relaxed">
          Tell the engine what you are trying to accomplish, and watch it
          structure the exact tools and data you need in seconds.
        </p>
      </div>

      {/* Visual Mockup */}
      <div className="w-full">
        <WorkspaceGeneratorMockup />
      </div>
    </section>
  );
}
