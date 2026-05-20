import { AnimatedHeadline } from "@/components/animated-headline";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { routes } from "@/routes";
import {
  Activity,
  ArrowRight,
  Check,
  Code,
  Copy,
  Layers,
  Lock,
  Mail,
  Network,
  Plus,
  Share2,
  ShieldCheck,
  Sliders,
  Sparkles,
  Terminal,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function LandingPage() {
  // Showcase 1: AI Workspace Generator State
  const [activePreset, setActivePreset] = useState<
    "saas" | "devtools" | "support"
  >("saas");
  const [typedPrompt, setTypedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [logLines, setLogLines] = useState<string[]>([]);

  // Showcase 2: Native Integrations State
  const [activeInt, setActiveInt] = useState<
    "stripe" | "slack" | "github" | "google"
  >("stripe");
  const [connectedState, setConnectedState] = useState<Record<string, boolean>>(
    {
      stripe: true,
      slack: false,
      github: true,
      google: false,
    },
  );

  const toggleConnection = (id: string) => {
    setConnectedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Showcase 3: Personalization State
  const [layoutStyle, setLayoutStyle] = useState<"split" | "grid" | "focused">(
    "split",
  );
  const [sidebarPos, setSidebarPos] = useState<"left" | "right">("left");
  const [visibleWidgets, setVisibleWidgets] = useState<Record<string, boolean>>(
    {
      metrics: true,
      terminal: true,
      activity: true,
    },
  );

  const toggleWidget = (id: string) => {
    setVisibleWidgets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const PRESET_PROMPTS = {
    saas: "Create a SaaS workspace showing Stripe revenue metrics, MRR, conversion charts, and latest client payouts.",
    devtools:
      "Build a developer command center with Vertex API gateway logs, active dev server processes, and CPU/memory telemetry.",
    support:
      "Setup a high-agency customer support desk showing Stripe transaction histories side-by-side with open Zendesk support tickets.",
  };

  useEffect(() => {
    // Reset state
    setTypedPrompt("");
    setIsGenerating(true);
    setGenerationProgress(0);
    setLogLines(["[System] Initializing context engine..."]);

    const promptText = PRESET_PROMPTS[activePreset];
    let charIndex = 0;
    let timer: NodeJS.Timeout;

    // Phase 1: Typing prompt
    const typePrompt = () => {
      if (charIndex < promptText.length) {
        setTypedPrompt(promptText.substring(0, charIndex + 1));
        charIndex++;
        timer = setTimeout(typePrompt, 12);
      } else {
        // Typing done, start generating progress
        startGenerating();
      }
    };

    const startGenerating = () => {
      let progress = 0;
      const progressLogs = {
        15: "[System] Parsing user intent...",
        40: `[System] Connecting linked service APIs...`,
        70: "[System] Designing optimal grid layout...",
        90: "[System] Initializing React workspace view...",
        100: "[System] Context active and fully operational.",
      };

      const interval = setInterval(() => {
        progress += 5;
        setGenerationProgress(progress);

        // Add log lines if key milestones are reached
        const log = progressLogs[progress as keyof typeof progressLogs];
        if (log) {
          setLogLines((prev) => [...prev, log]);
        }

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
          }, 300);
        }
      }, 70);
    };

    typePrompt();

    return () => {
      clearTimeout(timer);
    };
  }, [activePreset]);

  return (
    <div className="min-h-screen bg-neutral-surface font-body text-neutral-content selection:bg-neutral-surface-active">
      <Header />

      {/* Hero Section */}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="overflow-hidden rounded-xl border border-neutral-border bg-background">
            {/* Window Header */}
            <div className="flex h-12 items-center border-b border-neutral-border bg-neutral-surface px-4">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-neutral-border-hover" />
                <div className="h-2.5 w-2.5 rounded-full bg-neutral-border-hover" />
                <div className="h-2.5 w-2.5 rounded-full bg-neutral-border-hover" />
              </div>
            </div>
            {/* Workspace Grid */}
            <div className="grid grid-cols-4 h-[500px]">
              {/* Sidebar */}
              <div className="col-span-1 border-r border-neutral-border bg-neutral-surface p-4 space-y-4">
                <div className="h-6 w-24 rounded bg-neutral-surface-hover" />
                <div className="space-y-2 pt-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-full rounded bg-neutral-surface-hover"
                    />
                  ))}
                </div>
              </div>
              {/* Main Content */}
              <div className="col-span-3 p-8 bg-background">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-border">
                  <div className="h-8 w-48 rounded bg-neutral-surface" />
                  <div className="h-8 w-24 rounded bg-inverse text-inverse-contrast flex items-center justify-center text-xs font-medium">
                    Generate
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-32 rounded-lg border border-neutral-border bg-neutral-surface p-4"
                    >
                      <div className="h-4 w-1/2 rounded bg-neutral-surface-hover mb-4" />
                      <div className="h-2 w-full rounded bg-neutral-border mb-2" />
                      <div className="h-2 w-2/3 rounded bg-neutral-border" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Showcase Section 1: Bring your digital services */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Copy */}
          <div className="lg:col-span-5 text-left space-y-6">
            {/* Pill Badge */}
            <div className="flex justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-border bg-neutral-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-content-subtle shadow-sm">
                <Network className="h-3.5 w-3.5 text-accent" />
                NATIVE INTEGRATIONS
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-neutral-content leading-tight">
              Bring your digital services in one environment.
            </h2>
            <p className="text-neutral-content-subtle text-base sm:text-lg leading-relaxed">
              Connect your essential digital services natively. No writing
              complex API wrappers or setting up insecure proxy gateways.
            </p>

            {/* Premium Bullet Points */}
            <div className="space-y-4 pt-4 border-t border-neutral-border/50">
              <div className="flex gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-neutral-surface border border-neutral-border text-neutral-content">
                  <Check className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-content">
                    Hardware Enclave Key Store
                  </h4>
                  <p className="text-xs text-neutral-content-muted mt-0.5">
                    Sync credentials safely using dedicated client-side
                    enclaves.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-neutral-surface border border-neutral-border text-neutral-content">
                  <Check className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-content">
                    Zero-Latency Proxy Routes
                  </h4>
                  <p className="text-xs text-neutral-content-muted mt-0.5">
                    Proxy remote data structures with high-speed endpoint
                    piping.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-7">
            {/* Interactive Mockup Window */}
            <div className="overflow-hidden rounded-2xl border border-neutral-border bg-background shadow-2xl transition-all duration-300 hover:shadow-neutral-surface/10 hover:border-neutral-border-hover">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-neutral-border bg-neutral-surface/80 px-4 py-3 backdrop-blur-md">
                {/* Window Dots */}
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56] opacity-90 transition-opacity hover:opacity-100 cursor-pointer" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e] opacity-90 transition-opacity hover:opacity-100 cursor-pointer" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f] opacity-90 transition-opacity hover:opacity-100 cursor-pointer" />
                </div>
                {/* Center URL */}
                <div className="flex items-center justify-center gap-1.5 rounded-md border border-neutral-border/80 bg-background px-6 py-1 text-[11px] font-code text-neutral-content-subtle/80 shadow-inner min-w-[200px] sm:min-w-[280px]">
                  <Lock className="h-3 w-3 text-neutral-content-muted" />
                  <span>ubento.app/integrations</span>
                </div>
                {/* Right Icons */}
                <div className="flex items-center gap-3 text-neutral-content-muted">
                  <Share2 className="h-3.5 w-3.5 hover:text-neutral-content transition-colors cursor-pointer" />
                  <Plus className="h-3.5 w-3.5 hover:text-neutral-content transition-colors cursor-pointer" />
                  <Copy className="h-3.5 w-3.5 hover:text-neutral-content transition-colors cursor-pointer" />
                </div>
              </div>

              {/* Window Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
                {/* Left Sidebar / Registry Select */}
                <div className="lg:col-span-5 border-r border-neutral-border p-6 bg-neutral-surface/20 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Layers className="h-4 w-4 text-neutral-content" />
                      <span className="text-xs font-code font-bold tracking-wider uppercase text-neutral-content-muted">
                        Credential Registry
                      </span>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          id: "stripe",
                          name: "Stripe API Gateway",
                          category: "Finance & Payouts",
                        },
                        {
                          id: "slack",
                          name: "Slack Bot Router",
                          category: "Real-time Alerts",
                        },
                        {
                          id: "github",
                          name: "GitHub OAuth Registry",
                          category: "Source Repositories",
                        },
                        {
                          id: "google",
                          name: "Google Calendar API",
                          category: "Events & Schedules",
                        },
                      ].map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setActiveInt(service.id as any)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                            activeInt === service.id
                              ? "border-inverse bg-neutral-surface shadow-md"
                              : "border-neutral-border hover:border-neutral-border-hover hover:bg-neutral-surface-hover/30"
                          }`}
                        >
                          <div>
                            <div className="font-heading font-semibold text-sm text-neutral-content mb-1">
                              {service.name}
                            </div>
                            <div className="text-xs text-neutral-content-subtle">
                              {service.category}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${connectedState[service.id] ? "bg-success shadow-[0_0_8px_rgba(39,201,63,0.5)]" : "bg-neutral-border-active"}`}
                            />
                            <span className="text-[10px] font-code uppercase text-neutral-content-muted font-bold">
                              {connectedState[service.id]
                                ? "Active"
                                : "Offline"}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-8 pt-6 border-t border-neutral-border/80">
                    <div className="flex items-center gap-3 bg-background border border-neutral-border rounded-xl p-3.5 shadow-inner">
                      <ShieldCheck className="h-6 w-6 text-success shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-neutral-content">
                          Encrypted OAuth Proxy
                        </div>
                        <div className="text-[10px] text-neutral-content-muted">
                          Client credentials stored in a hardware secure
                          enclave.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel / Credentials form & API Terminal logs */}
                <div className="lg:col-span-7 p-6 bg-background flex flex-col justify-between min-h-[440px]">
                  {/* Credentials Details Configuration Panel */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-neutral-border">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold bg-accent-surface text-accent border border-accent/20 px-2 py-0.5 rounded uppercase font-code">
                          Configuring
                        </span>
                        <h3 className="font-heading font-bold text-neutral-content">
                          {activeInt === "stripe" && "Stripe Production Keys"}
                          {activeInt === "slack" &&
                            "Slack App Routing Credentials"}
                          {activeInt === "github" &&
                            "GitHub OAuth App Integration"}
                          {activeInt === "google" && "Google Calendar OAuth"}
                        </h3>
                      </div>

                      {/* Toggle Connect Button */}
                      <button
                        onClick={() => toggleConnection(activeInt)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all duration-200 cursor-pointer shadow-sm uppercase ${
                          connectedState[activeInt]
                            ? "border-destructive/20 bg-destructive-surface text-destructive hover:bg-destructive/10"
                            : "border-success/20 bg-success-surface text-success hover:bg-success/10"
                        }`}
                      >
                        {connectedState[activeInt] ? "Disconnect" : "Connect"}
                      </button>
                    </div>

                    {/* Form fields mockup */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-neutral-content-muted tracking-wider">
                            Client Registry ID
                          </span>
                          <input
                            type="text"
                            disabled
                            value={
                              activeInt === "stripe"
                                ? "stripe_live_c123f859ac938bc741aef"
                                : activeInt === "slack"
                                  ? "slack_app_9a8dfc84ab8dcdcd88aa"
                                  : activeInt === "github"
                                    ? "github_oauth_082a938cbeacdfd1101d"
                                    : "google_cal_629cdacd83efcdca22bc"
                            }
                            className="w-full text-xs font-code bg-neutral-surface/40 border border-neutral-border p-3.5 rounded-xl text-neutral-content-subtle select-none cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-neutral-content-muted tracking-wider">
                            Enclave Key Hash
                          </span>
                          <input
                            type="text"
                            disabled
                            value="••••••••••••••••••••••••••••••••••••"
                            className="w-full text-xs font-code bg-neutral-surface/40 border border-neutral-border p-3.5 rounded-xl text-neutral-content-subtle select-none cursor-not-allowed"
                          />
                        </div>
                      </div>

                      {/* Configured Scopes */}
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold text-neutral-content-muted tracking-wider">
                          Authorized Gateway Scopes
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {activeInt === "stripe" &&
                            [
                              "charges:read",
                              "balance:read",
                              "customers:write",
                            ].map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center gap-1 text-[11px] font-code bg-neutral-surface border border-neutral-border px-2.5 py-1 rounded-lg text-neutral-content-subtle font-semibold"
                              >
                                <Check className="h-3 w-3 text-success" /> {s}
                              </span>
                            ))}
                          {activeInt === "slack" &&
                            ["channels:read", "chat:write", "users:read"].map(
                              (s) => (
                                <span
                                  key={s}
                                  className="inline-flex items-center gap-1 text-[11px] font-code bg-neutral-surface border border-neutral-border px-2.5 py-1 rounded-lg text-neutral-content-subtle font-semibold"
                                >
                                  <Check className="h-3 w-3 text-success" /> {s}
                                </span>
                              ),
                            )}
                          {activeInt === "github" &&
                            ["repo", "read:org", "workflow"].map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center gap-1 text-[11px] font-code bg-neutral-surface border border-neutral-border px-2.5 py-1 rounded-lg text-neutral-content-subtle font-semibold"
                              >
                                <Check className="h-3 w-3 text-success" /> {s}
                              </span>
                            ))}
                          {activeInt === "google" &&
                            [
                              "calendar.events.readonly",
                              "calendar.readonly",
                            ].map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center gap-1 text-[11px] font-code bg-neutral-surface border border-neutral-border px-2.5 py-1 rounded-lg text-neutral-content-subtle font-semibold"
                              >
                                <Check className="h-3 w-3 text-success" /> {s}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* REST API Gateway Terminal Code Output */}
                  <div className="mt-8 text-left">
                    <div className="px-4 py-2 border border-b-0 border-neutral-border rounded-t-xl bg-neutral-surface/30 flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold text-neutral-content-muted">
                      <span>Vertex proxy gateway logs</span>
                      <Code className="h-3 w-3" />
                    </div>
                    <div className="bg-neutral-surface border border-neutral-border rounded-b-xl p-4 font-code text-xs text-neutral-content shadow-inner">
                      {connectedState[activeInt] ? (
                        <div className="space-y-1 text-neutral-content-subtle text-left">
                          <p>
                            <span className="text-info">POST</span>{" "}
                            /vertex/oauth/{activeInt}/exchange
                          </p>
                          <p className="text-success font-semibold">200 OK</p>
                          <p>{"{"}</p>
                          {activeInt === "stripe" && (
                            <>
                              <p className="pl-4">"token_type": "Bearer",</p>
                              <p className="pl-4">"scope": "read_write",</p>
                              <p className="pl-4">
                                "stripe_user_id": "acct_10329...",
                              </p>
                            </>
                          )}
                          {activeInt === "slack" && (
                            <>
                              <p className="pl-4">"ok": true,</p>
                              <p className="pl-4">"app_id": "A08A389DCD",</p>
                              <p className="pl-4">
                                "bot_user_id": "U01B839AD",
                              </p>
                            </>
                          )}
                          {activeInt === "github" && (
                            <>
                              <p className="pl-4">
                                "access_token": "gho_8x1029Ac98f",
                              </p>
                              <p className="pl-4">"scope": "repo,read:org",</p>
                            </>
                          )}
                          {activeInt === "google" && (
                            <>
                              <p className="pl-4">
                                "access_token": "ya29.a0AfH82aA",
                              </p>
                              <p className="pl-4">"expires_in": 3599,</p>
                            </>
                          )}
                          <p className="pl-4">"status": "secured_in_enclave"</p>
                          <p>{"}"}</p>
                        </div>
                      ) : (
                        <div className="space-y-1 py-4 text-center">
                          <p className="text-warning-hover font-semibold">
                            ⚠️ SERVICE DISCONNECTED
                          </p>
                          <p className="text-neutral-content-subtle text-[11px] leading-relaxed max-w-sm mx-auto">
                            OAuth token registry for{" "}
                            <span className="font-bold">{activeInt}</span> is
                            currently empty. Connect the service to configure
                            proxy gateway logs.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section 2: AI Workspaces */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Copy */}
          <div className="lg:col-span-5 text-left space-y-6">
            {/* Pill Badge */}
            <div className="flex justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-border bg-neutral-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-content-subtle shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                AI Workspace Engine
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-neutral-content leading-tight">
              Generate workspace with the help of AI.
            </h2>
            <p className="text-neutral-content-subtle text-base sm:text-lg leading-relaxed">
              Tell the engine what you are trying to accomplish, and watch it
              structure the exact tools and data you need in seconds.
            </p>

            {/* Premium Bullet Points */}
            <div className="space-y-4 pt-4 border-t border-neutral-border/50">
              <div className="flex gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-neutral-surface border border-neutral-border text-neutral-content">
                  <Check className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-content">
                    Contextual NLP Compiler
                  </h4>
                  <p className="text-xs text-neutral-content-muted mt-0.5">
                    Parse dynamic prompt flows into beautiful data widget
                    schemas.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-neutral-surface border border-neutral-border text-neutral-content">
                  <Check className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-content">
                    Instant Live Renders
                  </h4>
                  <p className="text-xs text-neutral-content-muted mt-0.5">
                    Review compiled workspace interfaces with live responsive
                    previews.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-7">
            {/* Interactive Mockup Window */}
            <div className="overflow-hidden rounded-2xl border border-neutral-border bg-background shadow-2xl transition-all duration-300 hover:shadow-neutral-surface/10 hover:border-neutral-border-hover">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-neutral-border bg-neutral-surface/80 px-4 py-3 backdrop-blur-md">
                {/* Window Dots */}
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56] opacity-90 transition-opacity hover:opacity-100 cursor-pointer" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e] opacity-90 transition-opacity hover:opacity-100 cursor-pointer" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f] opacity-90 transition-opacity hover:opacity-100 cursor-pointer" />
                </div>
                {/* Center URL */}
                <div className="flex items-center justify-center gap-1.5 rounded-md border border-neutral-border/80 bg-background px-6 py-1 text-[11px] font-code text-neutral-content-subtle/80 shadow-inner min-w-[200px] sm:min-w-[280px]">
                  <Lock className="h-3 w-3 text-neutral-content-muted" />
                  <span>ubento.app/generator</span>
                </div>
                {/* Right Icons */}
                <div className="flex items-center gap-3 text-neutral-content-muted">
                  <Share2 className="h-3.5 w-3.5 hover:text-neutral-content transition-colors cursor-pointer" />
                  <Plus className="h-3.5 w-3.5 hover:text-neutral-content transition-colors cursor-pointer" />
                  <Copy className="h-3.5 w-3.5 hover:text-neutral-content transition-colors cursor-pointer" />
                </div>
              </div>

              {/* Window Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
                {/* Left Sidebar / Prompt Builder */}
                <div className="lg:col-span-5 border-r border-neutral-border p-6 bg-neutral-surface/20 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Sliders className="h-4 w-4 text-neutral-content" />
                      <span className="text-xs font-code font-bold tracking-wider uppercase text-neutral-content-muted">
                        Workspace Presets
                      </span>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          id: "saas",
                          title: "📊 SaaS Revenue & Metrics",
                          desc: "Stripe MRR and conversion payouts",
                        },
                        {
                          id: "devtools",
                          title: "💻 Developer Telemetry",
                          desc: "Vertex gateway API and resource logs",
                        },
                        {
                          id: "support",
                          title: "📧 High-Agency Support Desk",
                          desc: "Zendesk tickets with Stripe integration",
                        },
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => setActivePreset(preset.id as any)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                            activePreset === preset.id
                              ? "border-inverse bg-neutral-surface shadow-md"
                              : "border-neutral-border hover:border-neutral-border-hover hover:bg-neutral-surface-hover/30"
                          }`}
                        >
                          <div className="font-heading font-semibold text-sm text-neutral-content mb-1">
                            {preset.title}
                          </div>
                          <div className="text-xs text-neutral-content-subtle">
                            {preset.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prompt Block (Terminal-style input box) */}
                  <div className="mt-8 pt-6 border-t border-neutral-border/80">
                    <div className="bg-background border border-neutral-border rounded-xl p-4 font-code text-xs shadow-inner min-h-[100px] flex flex-col justify-between">
                      <div className="text-neutral-content leading-relaxed text-left">
                        <span className="text-accent font-bold">$ </span>
                        {typedPrompt}
                        {isGenerating && (
                          <span className="inline-block w-1.5 h-3.5 bg-accent ml-0.5 animate-pulse" />
                        )}
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-neutral-content-muted mt-4 border-t border-neutral-border/50 pt-2">
                        <span>Vertex NLP Compiler v1.2</span>
                        <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel / Preview & Progress */}
                <div className="lg:col-span-7 p-6 bg-background flex flex-col justify-between min-h-[440px]">
                  {/* Status header & progress */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-neutral-border">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-code uppercase tracking-wider ${
                            isGenerating
                              ? "bg-accent-surface text-accent border border-accent/20"
                              : "bg-success-surface text-success border border-success/20"
                          }`}
                        >
                          {isGenerating
                            ? "Compiling Workspace"
                            : "System Ready"}
                        </span>
                        <span className="text-xs font-bold text-neutral-content-muted font-code uppercase">
                          Build Target: Localhost
                        </span>
                      </div>
                      <span className="text-xs font-code text-neutral-content-subtle font-semibold">
                        {generationProgress}%
                      </span>
                    </div>

                    {/* Progress bar container */}
                    <div className="h-2 w-full bg-neutral-surface border border-neutral-border rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-inverse transition-all duration-300 ease-out"
                        style={{ width: `${generationProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Main Preview Content Block */}
                  <div className="flex-1 flex flex-col justify-center mt-6">
                    <AnimatePresence mode="wait">
                      {isGenerating ? (
                        <motion.div
                          key="compiling"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex flex-col items-center justify-center p-8 border border-dashed border-neutral-border bg-neutral-surface/5 rounded-xl min-h-[220px]"
                        >
                          <Terminal className="h-8 w-8 text-neutral-content-muted mb-4 animate-spin" />
                          <p className="text-xs font-code text-neutral-content">
                            Compiling workspace entities...
                          </p>
                          <p className="text-[10px] text-neutral-content-muted font-code mt-1">
                            Initializing Vertex Service Registry scopes
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={activePreset}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                          className="w-full text-left"
                        >
                          {activePreset === "saas" && (
                            <div className="space-y-4">
                              {/* MRR Hero metric card */}
                              <div className="p-4 border border-neutral-border bg-neutral-surface/10 rounded-xl flex justify-between items-center shadow-sm">
                                <div>
                                  <div className="text-[10px] uppercase font-bold text-neutral-content-muted tracking-wider">
                                    Stripe Monthly Recurring Revenue
                                  </div>
                                  <div className="text-2xl font-bold text-neutral-content mt-1">
                                    $48,259.00
                                  </div>
                                </div>
                                <span className="text-xs font-semibold bg-success-surface text-success border border-success/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
                                  <ArrowRight className="h-3.5 w-3.5 -rotate-45" />{" "}
                                  +18.4%
                                </span>
                              </div>

                              {/* SaaS detail cards */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border border-neutral-border bg-background rounded-xl shadow-inner">
                                  <span className="text-[9px] uppercase font-bold text-neutral-content-muted tracking-wider">
                                    Active Customers
                                  </span>
                                  <div className="text-lg font-bold text-neutral-content mt-1">
                                    1,248
                                  </div>
                                </div>
                                <div className="p-4 border border-neutral-border bg-background rounded-xl shadow-inner">
                                  <span className="text-[9px] uppercase font-bold text-neutral-content-muted tracking-wider">
                                    Conversion Payouts
                                  </span>
                                  <div className="text-lg font-bold text-neutral-content mt-1">
                                    $14,290.40
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {activePreset === "devtools" && (
                            <div className="space-y-3">
                              {/* Dev API status card */}
                              <div className="p-4 border border-neutral-border bg-neutral-surface/10 rounded-xl flex justify-between items-center shadow-sm">
                                <div>
                                  <div className="text-[10px] uppercase font-bold text-neutral-content-muted tracking-wider font-code">
                                    Vertex API Gateway Process
                                  </div>
                                  <div className="text-sm font-bold text-neutral-content mt-1 flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                                    <span>active: node ./dist/gateway.js</span>
                                  </div>
                                </div>
                                <span className="text-xs font-code text-neutral-content-muted">
                                  PID 14208
                                </span>
                              </div>

                              {/* Telemetry output */}
                              <div className="p-4 border border-neutral-border bg-background rounded-xl shadow-inner font-code text-xs text-neutral-content-subtle space-y-1.5 min-h-[120px] text-left">
                                <p className="text-success">
                                  [gateway] synced 8 local providers
                                  successfully (14ms)
                                </p>
                                <p>
                                  [gateway] GET /v1/providers/stripe/balance —{" "}
                                  <span className="text-success">
                                    200 OK (8ms)
                                  </span>
                                </p>
                                <p>
                                  [gateway] listening for client connections on
                                  port 4000...
                                </p>
                              </div>
                            </div>
                          )}

                          {activePreset === "support" && (
                            <div className="space-y-4">
                              {/* High-Agency Support Tickets List */}
                              <div className="border border-neutral-border rounded-xl overflow-hidden bg-neutral-surface/5">
                                <div className="px-4 py-2 border-b border-neutral-border bg-neutral-surface/10 flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold text-neutral-content-muted">
                                  <span>Open Zendesk Support Tickets</span>
                                  <Mail className="h-3 w-3" />
                                </div>
                                <div className="divide-y divide-neutral-border font-code text-xs text-left">
                                  <div className="px-4 py-3.5 flex justify-between items-center hover:bg-neutral-surface-hover/25 transition-colors cursor-pointer">
                                    <div>
                                      <p className="font-medium text-neutral-content mb-0.5">
                                        Elena R. —{" "}
                                        <span className="text-neutral-content-subtle">
                                          Cannot sync Stripe dashboard details
                                        </span>
                                      </p>
                                      <p className="text-[10px] text-neutral-content-muted">
                                        Received 14 mins ago via Zendesk API
                                      </p>
                                    </div>
                                    <span className="text-[10px] font-semibold bg-warning-surface text-warning border border-warning/20 px-2 py-0.5 rounded">
                                      High Priority
                                    </span>
                                  </div>
                                  <div className="px-4 py-3.5 flex justify-between items-center hover:bg-neutral-surface-hover/25 transition-colors cursor-pointer">
                                    <div>
                                      <p className="font-medium text-neutral-content mb-0.5">
                                        Sarah J. —{" "}
                                        <span className="text-neutral-content-subtle">
                                          Requesting custom ESM build modules
                                        </span>
                                      </p>
                                      <p className="text-[10px] text-neutral-content-muted">
                                        Received 1 hour ago via Email Registry
                                      </p>
                                    </div>
                                    <span className="text-[10px] font-semibold bg-neutral-surface-hover text-neutral-content border border-neutral-border px-2 py-0.5 rounded">
                                      Normal
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section 3: Personalization Customizer */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Copy */}
          <div className="lg:col-span-5 text-left space-y-6">
            {/* Pill Badge */}
            <div className="flex justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-border bg-neutral-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-content-subtle shadow-sm">
                <Sliders className="h-3.5 w-3.5 text-accent" />
                PERSONALIZATION ENGINE
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-neutral-content leading-tight">
              Personalize your workspace as you work.
            </h2>
            <p className="text-neutral-content-subtle text-base sm:text-lg leading-relaxed">
              Rearrange components, toggle viewports, and mold your workspace
              tools to match your exact rhythm in real-time.
            </p>

            {/* Premium Bullet Points */}
            <div className="space-y-4 pt-4 border-t border-neutral-border/50">
              <div className="flex gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-neutral-surface border border-neutral-border text-neutral-content">
                  <Check className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-content">
                    Custom Modular Viewports
                  </h4>
                  <p className="text-xs text-neutral-content-muted mt-0.5">
                    Toggle split screens, multi-col grids, and focus modes on
                    the fly.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-neutral-surface border border-neutral-border text-neutral-content">
                  <Check className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-content">
                    Live Widget Orchestrator
                  </h4>
                  <p className="text-xs text-neutral-content-muted mt-0.5">
                    Instantly mount finance metrics, dev console systems, or
                    activity tickers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-7">
            {/* Interactive Mockup Window */}
            <div className="overflow-hidden rounded-2xl border border-neutral-border bg-background shadow-2xl transition-all duration-300 hover:shadow-neutral-surface/10 hover:border-neutral-border-hover">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-neutral-border bg-neutral-surface/80 px-4 py-3 backdrop-blur-md">
                {/* Window Dots */}
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56] opacity-90 transition-opacity hover:opacity-100 cursor-pointer" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e] opacity-90 transition-opacity hover:opacity-100 cursor-pointer" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f] opacity-90 transition-opacity hover:opacity-100 cursor-pointer" />
                </div>
                {/* Center URL */}
                <div className="flex items-center justify-center gap-1.5 rounded-md border border-neutral-border/80 bg-background px-6 py-1 text-[11px] font-code text-neutral-content-subtle/80 shadow-inner min-w-[200px] sm:min-w-[280px]">
                  <Lock className="h-3 w-3 text-neutral-content-muted" />
                  <span>ubento.app/customizer</span>
                </div>
                {/* Right Icons */}
                <div className="flex items-center gap-3 text-neutral-content-muted">
                  <Share2 className="h-3.5 w-3.5 hover:text-neutral-content transition-colors cursor-pointer" />
                  <Plus className="h-3.5 w-3.5 hover:text-neutral-content transition-colors cursor-pointer" />
                  <Copy className="h-3.5 w-3.5 hover:text-neutral-content transition-colors cursor-pointer" />
                </div>
              </div>

              {/* Window Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
                {/* Left Sidebar / Layout Controls */}
                <div className="lg:col-span-5 border-r border-neutral-border p-6 bg-neutral-surface/20 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sliders className="h-4 w-4 text-neutral-content" />
                        <span className="text-xs font-code font-bold tracking-wider uppercase text-neutral-content-muted">
                          Layout Mode
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "split", label: "Split View" },
                          { id: "grid", label: "3-Col Grid" },
                          { id: "focused", label: "Focused" },
                        ].map((layout) => (
                          <button
                            key={layout.id}
                            onClick={() => setLayoutStyle(layout.id as any)}
                            className={`text-center py-2 px-1 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                              layoutStyle === layout.id
                                ? "border-inverse bg-neutral-surface text-neutral-content shadow-sm"
                                : "border-neutral-border hover:border-neutral-border-hover bg-background/50 text-neutral-content-subtle"
                            }`}
                          >
                            {layout.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sliders className="h-4 w-4 text-neutral-content" />
                        <span className="text-xs font-code font-bold tracking-wider uppercase text-neutral-content-muted">
                          Sidebar Position
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "left", label: "Left Side" },
                          { id: "right", label: "Right Side" },
                        ].map((pos) => (
                          <button
                            key={pos.id}
                            disabled={layoutStyle === "focused"}
                            onClick={() => setSidebarPos(pos.id as any)}
                            className={`text-center py-2 px-2 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                              layoutStyle === "focused"
                                ? "opacity-40 cursor-not-allowed border-neutral-border text-neutral-content-muted bg-neutral-surface/10"
                                : sidebarPos === pos.id
                                  ? "border-inverse bg-neutral-surface text-neutral-content shadow-sm"
                                  : "border-neutral-border hover:border-neutral-border-hover bg-background/50 text-neutral-content-subtle"
                            }`}
                          >
                            {pos.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sliders className="h-4 w-4 text-neutral-content" />
                        <span className="text-xs font-code font-bold tracking-wider uppercase text-neutral-content-muted">
                          Toggle Sandbox Widgets
                        </span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { id: "metrics", label: "📊 Stripe Revenue Metrics" },
                          {
                            id: "terminal",
                            label: "💻 Server API Response Logs",
                          },
                          { id: "activity", label: "🔔 Recent Actions Feed" },
                        ].map((widget) => (
                          <button
                            key={widget.id}
                            onClick={() => toggleWidget(widget.id)}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                              visibleWidgets[widget.id]
                                ? "border-inverse bg-neutral-surface shadow-sm"
                                : "border-neutral-border hover:border-neutral-border-hover bg-background/30"
                            }`}
                          >
                            <span className="text-xs font-heading font-medium text-neutral-content">
                              {widget.label}
                            </span>
                            <span
                              className={`h-4 w-4 rounded border flex items-center justify-center transition-all ${
                                visibleWidgets[widget.id]
                                  ? "bg-inverse border-inverse text-inverse-contrast"
                                  : "border-neutral-border"
                              }`}
                            >
                              {visibleWidgets[widget.id] && (
                                <Check className="h-3 w-3" />
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Status bar */}
                  <div className="mt-8 pt-6 border-t border-neutral-border/80">
                    <div className="flex items-center gap-3 bg-background border border-neutral-border rounded-xl p-3.5 shadow-inner">
                      <Activity className="h-5 w-5 text-accent animate-pulse shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-neutral-content">
                          Real-time Layout Engine
                        </div>
                        <div className="text-[10px] text-neutral-content-muted">
                          Instantly serializes layout schemas inside local JSON
                          cache.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel / Interactive live preview workspace */}
                <div className="lg:col-span-7 p-6 bg-background flex flex-col justify-center min-h-[440px]">
                  <div className="border border-neutral-border rounded-xl bg-neutral-surface/10 p-4 min-h-[360px] flex flex-col justify-between shadow-sm">
                    {/* Mini Workspace Top bar */}
                    <div className="flex justify-between items-center pb-3 border-b border-neutral-border mb-4">
                      <div className="flex items-center gap-1.5">
                        <Sliders className="h-3.5 w-3.5 text-accent" />
                        <span className="text-xs font-bold text-neutral-content font-heading uppercase">
                          Live Custom Sandbox
                        </span>
                      </div>
                      <div className="flex gap-1.5 items-center">
                        <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                        <span className="text-[10px] font-code text-neutral-content-muted uppercase">
                          Layout: {layoutStyle}
                        </span>
                      </div>
                    </div>

                    {/* Main Sandbox Layout container */}
                    <div
                      className={`flex flex-1 gap-4 text-left ${sidebarPos === "right" ? "flex-row-reverse" : "flex-row"} ${layoutStyle === "focused" ? "flex-col" : ""}`}
                    >
                      {/* Sandbox Sidebar (if not focused) */}
                      {layoutStyle !== "focused" && (
                        <div className="w-1/4 border-r border-neutral-border/80 pr-3 flex flex-col gap-2 bg-neutral-surface/20 p-2 rounded-lg">
                          <div className="h-3 w-12 rounded bg-neutral-border mb-2 animate-pulse" />
                          <div className="h-2 w-full rounded bg-neutral-surface-hover" />
                          <div className="h-2 w-3/4 rounded bg-neutral-surface-hover" />
                          <div className="h-2 w-5/6 rounded bg-neutral-surface-hover" />
                        </div>
                      )}

                      {/* Sandbox Content Area */}
                      <div
                        className={`flex-1 flex flex-col gap-3 ${layoutStyle === "grid" ? "grid grid-cols-1 sm:grid-cols-2" : ""}`}
                      >
                        {/* Card 1: Stripe Metrics */}
                        {visibleWidgets.metrics && (
                          <div className="p-3 border border-neutral-border bg-background rounded-xl space-y-1 shadow-inner transition-all duration-300">
                            <div className="text-[9px] uppercase font-bold text-neutral-content-muted tracking-wider">
                              Revenue Stream
                            </div>
                            <div className="text-sm font-bold text-neutral-content">
                              $14,230.80
                            </div>
                            <div className="text-[8px] text-success font-medium flex items-center gap-0.5">
                              <ArrowRight className="h-2 w-2 -rotate-45" /> +12%
                              balance
                            </div>
                          </div>
                        )}

                        {/* Card 2: Server API Terminal */}
                        {visibleWidgets.terminal && (
                          <div className="p-3 border border-neutral-border bg-background rounded-xl space-y-1 shadow-inner transition-all duration-300 font-code">
                            <div className="text-[9px] uppercase font-bold text-neutral-content-muted tracking-wider">
                              Server Response
                            </div>
                            <div className="font-code text-[10px] text-success flex justify-between">
                              <span>[200 OK] GET /workspaces</span>
                              <span className="text-neutral-content-muted text-[8px]">
                                8ms
                              </span>
                            </div>
                            <div className="h-1 w-full bg-neutral-surface rounded-full overflow-hidden">
                              <div className="h-full bg-success w-1/3" />
                            </div>
                          </div>
                        )}

                        {/* Card 3: Recent Activity Feed */}
                        {visibleWidgets.activity && (
                          <div className="p-3 border border-neutral-border bg-background rounded-xl space-y-1 shadow-inner transition-all duration-300">
                            <div className="text-[9px] uppercase font-bold text-neutral-content-muted tracking-wider">
                              Recent Actions
                            </div>
                            <div className="space-y-1">
                              <div className="text-[9px] text-neutral-content flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-info shrink-0" />
                                <span>Elena connected Slack</span>
                              </div>
                              <div className="text-[9px] text-neutral-content flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-info shrink-0" />
                                <span>Vertex registry synced</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Placeholder if nothing visible */}
                        {!visibleWidgets.metrics &&
                          !visibleWidgets.terminal &&
                          !visibleWidgets.activity && (
                            <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-neutral-border bg-neutral-surface/5 rounded-xl p-8 text-center">
                              <Sliders className="h-8 w-8 text-neutral-content-muted mb-2 animate-bounce" />
                              <p className="text-xs font-semibold text-neutral-content">
                                No widgets active
                              </p>
                              <p className="text-[10px] text-neutral-content-muted max-w-[200px] mt-1 mx-auto">
                                Toggle widgets on the left to see live workspace
                                renders.
                              </p>
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Bottom status line */}
                    <div className="flex justify-between items-center pt-3 border-t border-neutral-border mt-4 text-[9px] text-neutral-content-muted font-code">
                      <span>Render Target: Sandbox Canvas</span>
                      <span>Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* High-Impact CTA Section */}
      <section className="py-36 bg-neutral-surface/10 relative overflow-hidden">
        {/* Decorative Grid Patterns for Premium Aesthetics */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="mx-auto max-w-5xl px-6 text-center relative z-10 space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-neutral-content leading-tight max-w-4xl mx-auto">
            Take back ownership of your workflow.
          </h2>
          <p className="text-neutral-content-subtle text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience a customizable, localized, high-agency workspace engine
            built from the ground up for developer speed and autonomy.
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

      <Footer />
    </div>
  );
}
