"use client";

import React, { useState } from "react";
import { Terminal, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setIsSubmitting(true);
    // Simulate API delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-neutral-surface font-body text-neutral-content selection:bg-neutral-surface-active flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-neutral-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2 font-heading font-bold tracking-tight text-neutral-content hover:opacity-85 transition-opacity">
            <Logo style={{ width: 100 }} />
          </a>
          <div className="flex items-center gap-6">
            <a
              href="/pricing"
              className="text-sm font-medium text-neutral-content-subtle hover:text-neutral-content transition-colors"
            >
              Pricing
            </a>
            <a
              href="/vertex/oauth/connect"
              className="rounded-3xl bg-inverse px-4 py-2 text-sm font-medium text-inverse-contrast transition-colors hover:bg-inverse-hover active:bg-inverse-active"
            >
              Get Ubento Free
            </a>
          </div>
        </div>
      </nav>

      {/* Main Contact Grid */}
      <main className="flex-grow pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
            
            {/* Info Column (Left) */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-border/40 bg-neutral-surface/50 px-3 py-1 text-[11px] font-medium tracking-wide text-accent uppercase font-mono">
                <Terminal className="h-3 w-3" /> Get in Touch
              </div>

              <h1 className="font-heading text-4xl font-bold tracking-tight text-neutral-content sm:text-6xl leading-tight">
                Let's construct your WorkOS.
              </h1>
              
              <p className="text-base text-neutral-content-subtle leading-relaxed max-w-md">
                Have questions about localized connection proxying, AI compiler custom triggers, or corporate hosting nodes? 
                Reach out and we'll help orchestrate your setup.
              </p>

              <div className="space-y-6 pt-6 border-t border-neutral-border/20 max-w-md">
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase font-mono">Compliance & HQ</h4>
                  <p className="mt-2 text-sm text-neutral-content font-medium">Abstrea Tech OÜ</p>
                  <p className="text-xs text-neutral-content-subtle mt-1 leading-relaxed">
                    Sepapaja tn 6, Lasnamäe linnaosa,<br />
                    Tallinn, 15551, Estonia
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase font-mono">Direct Communication</h4>
                  <p className="mt-2 text-sm text-neutral-content font-medium">
                    <a href="mailto:support@abstrea.tech" className="hover:text-accent transition-colors">
                      support@abstrea.tech
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Form Column (Right) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl border border-neutral-border bg-background p-8 md:p-12 shadow-2xl overflow-hidden">
                {/* Visual grid overlay */}
                <div 
                  className="pointer-events-none absolute inset-0 opacity-[0.02]" 
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: "20px 20px"
                  }}
                />

                {isSubmitted ? (
                  <div className="text-center py-16 space-y-6">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
                      <CheckCircle2 className="h-8 w-8 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-heading text-neutral-content tracking-tight">Payload Dispatched</h3>
                      <p className="text-sm text-neutral-content-subtle max-w-sm mx-auto leading-relaxed">
                        Thank you for getting in touch. Our infrastructure engineering team will respond via email shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:underline font-mono"
                    >
                      Send another message <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase font-mono">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-surface/20 text-neutral-content text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/25 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase font-mono">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-surface/20 text-neutral-content text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/25 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase font-mono">
                        Message Payload
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Details on what you're building..."
                        className="w-full p-4 rounded-xl border border-neutral-border bg-neutral-surface/20 text-neutral-content text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/25 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-neutral-content text-sm font-semibold text-neutral-surface flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>Orchestrating...</>
                      ) : (
                        <>
                          Dispatch Message <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-surface py-24 border-t border-neutral-border/20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            {/* Brand Column */}
            <div className="md:col-span-6 space-y-6 text-left">
              <div className="flex items-center gap-2 font-heading font-bold text-neutral-content">
                <Terminal className="h-5 w-5 text-accent shrink-0" />
                <span className="tracking-tight text-lg">UBENTO</span>
              </div>
              <p className="text-sm text-neutral-content-subtle max-w-sm leading-relaxed">
                The dynamic WorkOS engine built for speed and autonomy.
              </p>
              <p className="text-xs text-neutral-content-muted">
                © 2026 Ubento. All rights reserved.
              </p>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-6 grid grid-cols-3 gap-8 text-left">
              {/* Product Column */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase">
                  Product
                </h4>
                <ul className="space-y-3 text-sm text-neutral-content-subtle">
                  <li>
                    <a href="/pricing" className="hover:text-neutral-content transition-colors">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal Column */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase">
                  Legal
                </h4>
                <ul className="space-y-3 text-sm text-neutral-content-subtle">
                  <li>
                    <a href="/privacy" className="hover:text-neutral-content transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="hover:text-neutral-content transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-neutral-content transition-colors">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Connect Column */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase">
                  Connect
                </h4>
                <ul className="space-y-3 text-sm text-neutral-content-subtle">
                  <li>
                    <a href="#" className="hover:text-neutral-content transition-colors">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-neutral-content transition-colors">
                      X
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
