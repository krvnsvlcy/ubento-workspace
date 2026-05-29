"use client";

import { AnimatedHeadline } from "@/components/animated-headline";
import { Button } from "@/components/button";
import { HeroMockup } from "@/components/illustrations/hero-mockup";
import { Typography } from "@/components/typography";
import { routes } from "@/routes";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-40 text-center md:pt-48 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <AnimatedHeadline />
        <Typography variant="body-large" className="mx-auto max-w-2xl">
          Ubento connects to your digital services to eliminate
          context-switching and bring your entire workflow into a single,
          high-agency environment.
        </Typography>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href={routes.login()}
            variant="primary"
            size="md"
            className="group gap-2 sm:w-auto"
          >
            Get Started Free
          </Button>
        </div>
      </motion.div>

      {/* Hero Mockup */}
      <HeroMockup />
    </section>
  );
}
