"use client";

import { routes } from "@/routes";

export function CtaSection() {
  return (
    <section className="py-36 bg-neutral-surface/10 relative overflow-hidden">
      {/* Decorative Grid Patterns for Premium Aesthetics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 text-center relative z-10 space-y-8">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-neutral-content leading-tight max-w-4xl mx-auto">
          Take back ownership of your workflow.
        </h2>
        <p className="text-neutral-content-subtle text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Experience a customizable, localized, high-agency workspace engine
          built for speed and autonomy.
        </p>
        <div className="pt-4">
          <a
            href={routes.login()}
            className="inline-flex items-center justify-center rounded-xl bg-inverse px-8 py-4 text-base font-semibold text-inverse-contrast shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-inverse-hover active:scale-[0.98] active:bg-inverse-active"
          >
            Get Ubento Free
          </a>
        </div>
      </div>
    </section>
  );
}
