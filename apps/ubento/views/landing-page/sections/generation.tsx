"use client";

import { VerticalScrollingLogos } from "@/components/illustrations/vertical-scrolling-logos";
import { WorkspaceGeneratorMockup } from "@/components/illustrations/workspace-generator-mockup";

export function WorkspaceGeneratorShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-left flex gap-16">
      <div className="space-y-16 grow">
        {/* Text Copy */}
        <div className="max-w-3xl space-y-6">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight text-neutral-content leading-tight">
            AI generated software <br /> without the security risk.
          </h2>
          <p className="text-neutral-content-subtle text-base sm:text-lg leading-relaxed">
            Your workspace runs within an environment isolated from your
            business data. Every interaction with your services is routed
            through a transparent approval gate, guaranteeing absolute control
            and visibility over how your data is accessed and modified.
          </p>
        </div>

        {/* Visual Mockup */}
        <div className="w-full">
          <WorkspaceGeneratorMockup />
        </div>
      </div>

      <VerticalScrollingLogos />
    </section>
  );
}
