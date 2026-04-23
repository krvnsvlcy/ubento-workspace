"use client";

import { ArrowRight, Box, Cpu, Globe, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "./logo";

export function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary-500/30 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-[10%] -top-[10%] h-[600px] w-[600px] rounded-full bg-primary-500/10 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -right-[5%] top-[20%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-foreground-300 transition-colors hover:text-foreground-100"
          >
            Features
          </a>
          <a
            href="#developers"
            className="text-sm font-medium text-foreground-300 transition-colors hover:text-foreground-100"
          >
            Developers
          </a>
          <a
            href="#enterprise"
            className="text-sm font-medium text-foreground-300 transition-colors hover:text-foreground-100"
          >
            Enterprise
          </a>
        </div>
        <a
          href="/api/auth/login"
          className="group relative flex h-11 items-center justify-center overflow-hidden rounded-full bg-foreground px-8 text-sm font-bold text-background transition-all hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Sign In</span>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-20 text-center md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-background-300 bg-background-200/50 px-4 py-1.5 backdrop-blur-md">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary-500" />
            <span className="text-xs font-bold tracking-wider text-foreground-200 uppercase">
              Introducing Ubento 2.0
            </span>
          </div>
          <h1 className="mx-auto mb-8 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
            The next generation of <br />
            <span className="bg-gradient-to-r from-primary-400 via-primary-200 to-blue-400 bg-clip-text text-transparent">
              Identity Management
            </span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-foreground-300 md:text-xl">
            Streamline your team's access, secure your applications, and scale
            your infrastructure with the world's most intuitive IAM platform.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/api/auth/login"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-8 text-base font-bold text-background transition-all hover:scale-105 active:scale-95 sm:w-auto"
            >
              Get Started for Free
              <ArrowRight className="h-5 w-5" />
            </a>
            <button className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-background-300 bg-background-200/50 px-8 text-base font-bold backdrop-blur-md transition-all hover:bg-background-300 sm:w-auto">
              View Documentation
            </button>
          </div>
        </motion.div>

        {/* Hero Illustration / Dashboard Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto mt-24 max-w-6xl"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-background-300 bg-background-100 p-3 shadow-2xl shadow-primary-500/10">
            <div className="rounded-[2rem] bg-background-200 aspect-[16/9] overflow-hidden flex items-center justify-center relative">
              {/* Mockup Dashboard Content */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent)]" />
              <div className="grid grid-cols-4 gap-4 p-8 w-full h-full">
                <div className="col-span-1 rounded-2xl bg-background-300/50" />
                <div className="col-span-3 space-y-4">
                  <div className="h-12 w-1/3 rounded-xl bg-background-300/50" />
                  <div className="h-32 rounded-2xl bg-background-300/50" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 rounded-2xl bg-background-300/50" />
                    <div className="h-24 rounded-2xl bg-background-300/50" />
                    <div className="h-24 rounded-2xl bg-background-300/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Floating Accents */}
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 blur-2xl opacity-20" />
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 blur-3xl opacity-20" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Everything you need to ship safely
          </h2>
          <p className="text-foreground-300">
            Enterprise-grade tools, startup-grade simplicity.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <Shield className="h-6 w-6" />,
              title: "Secure by Design",
              desc: "Military-grade encryption and advanced CSRF protection out of the box.",
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: "Blazing Fast",
              desc: "Optimized OAuth flows that authenticate users in under 200ms.",
            },
            {
              icon: <Globe className="h-6 w-6" />,
              title: "Edge Ready",
              desc: "Deploy your identity layer globally with seamless multi-region support.",
            },
            {
              icon: <Cpu className="h-6 w-6" />,
              title: "Powerful APIs",
              desc: "Comprehensive SDKs for every language to integrate identities in minutes.",
            },
            {
              icon: <Box className="h-6 w-6" />,
              title: "App Directory",
              desc: "Centralized management of all your internal and external applications.",
            },
            {
              icon: <ArrowRight className="h-6 w-6" />,
              title: "And much more...",
              desc: "From audit logs to role-based access, Ubento has it all covered.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-background-300 bg-background-200/30 p-8 backdrop-blur-sm transition-colors hover:bg-background-200/50"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-300">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-foreground-300">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-background-300 px-6 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-bold">Ubento</span>
          </div>
          <p className="text-sm text-foreground-400">
            © 2026 Ubento Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-foreground-400 hover:text-foreground-100"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-sm text-foreground-400 hover:text-foreground-100"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-sm text-foreground-400 hover:text-foreground-100"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
