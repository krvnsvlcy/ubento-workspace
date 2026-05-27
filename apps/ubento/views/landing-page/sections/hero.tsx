"use client";

import { AnimatedHeadline } from "@/components/animated-headline";
import { routes } from "@/routes";
import { motion } from "motion/react";
import { HeroMockup } from "@/components/illustrations/hero-mockup";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-40 text-center md:pt-48 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedHeadline />
        <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-content-subtle sm:text-xl leading-relaxed">
          Ubento connects to your digital services and allows you to manage
          them using AI-generated workspaces that adapt to your workflow.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={routes.login()}
            className="group flex h-12 items-center justify-center gap-2 rounded-3xl bg-inverse px-8 text-sm font-medium text-inverse-contrast transition-all hover:bg-inverse-hover hover:shadow-xl sm:w-auto"
          >
            Get Ubento Free
          </a>
        </div>
      </motion.div>

      {/* Hero Mockup */}
      <HeroMockup />
    </section>
  );
}
