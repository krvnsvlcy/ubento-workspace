"use client";

import { routes } from "@/routes";
import { Button } from "@/components/button";
import { Typography } from "@/components/typography";

export function CtaSection() {
  return (
    <section className="py-36 bg-neutral-surface/10 relative overflow-hidden">
      {/* Decorative Grid Patterns for Premium Aesthetics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 text-center relative z-10 space-y-8">
        <Typography
          variant="h2"
          className="lg:text-6xl max-w-4xl mx-auto"
        >
          Own your workflow.
        </Typography>
        <Typography
          variant="body-large"
          className="max-w-2xl mx-auto"
        >
          A unified, secure, high-agency workspace engine built for speed and
          autonomy.
        </Typography>
        <div className="pt-4">
          <Button
            href={routes.login()}
            variant="primary"
            size="lg"
          >
            Get Started Free
          </Button>
        </div>
      </div>
    </section>
  );
}
