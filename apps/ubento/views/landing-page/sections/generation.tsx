"use client";

import { VerticalScrollingLogos } from "@/components/illustrations/vertical-scrolling-logos";
import { WorkspaceGeneratorMockup } from "@/components/illustrations/workspace-generator-mockup";
import { Typography } from "@/components/typography";

export function WorkspaceGeneratorShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-left flex gap-16">
      <div className="space-y-16 grow">
        {/* Text Copy */}
        <div className="max-w-3xl space-y-6">
          <Typography variant="h2">
            AI generated software <br /> without the security risk.
          </Typography>
          <Typography variant="body">
            Your workspace runs within an environment isolated from your
            business data. Every interaction with your services is routed
            through a transparent approval gate, guaranteeing absolute control
            and visibility over how your data is accessed and modified.
          </Typography>
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
