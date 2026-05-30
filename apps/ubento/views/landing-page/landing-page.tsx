"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CtaSection } from "./sections/cta";
import { PersonalizationShowcase } from "./sections/foundations";
import { WorkspaceGeneratorShowcase } from "./sections/generation";
import { HeroSection } from "./sections/hero";
import { IntegrationsShowcase } from "./sections/integrations";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-surface font-body text-content selection:bg-surface-active">
      <Header />
      <HeroSection />
      <IntegrationsShowcase />
      <WorkspaceGeneratorShowcase />
      <PersonalizationShowcase />
      <CtaSection />
      <Footer />
    </div>
  );
}
