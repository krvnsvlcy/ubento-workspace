"use client";

import { LayoutGrid, Plus, Settings, Sparkles, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { Logo } from "./components/logo";
import { Bridge } from "@ubento/engine";
import { Modal } from "./components/modal";

const themes = [
  { id: "sky", label: "Sky", color: "bg-blue-300" },
  { id: "sunset", label: "Sunset", color: "bg-orange-300" },
  { id: "forest", label: "Forest", color: "bg-green-300" },
  { id: "carbon", label: "Carbon", color: "bg-foreground-300" },
];

export interface Host {
  currentSession?: {
    name?: string;
    picture?: string;
    tenantId?: string;
  } | null;
  ubento: {
    app: {
      listApps: (args: { team_id: string }) => Promise<any[]>;
      createApp: (args: { name: string; team_id: string }) => Promise<any>;
    };
  };
  iframeUrl?: string; // The URL to load in the iframe, e.g., "http://localhost:4020"
}

export function Bento({ host }: { host: Host }) {
  const currentSession = host.currentSession;
  const ubento = host.ubento;

  const [activeModal, setActiveModal] = useState<
    "create" | "ai" | "settings" | null
  >(null);
  const [currentTheme, setCurrentTheme] = useState("sky");
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [apps, setApps] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // App opening state
  const [openedApp, setOpenedApp] = useState<any | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // For Demo Purposes
  const DEFAULT_TEMPLATE = {
    home: {
      id: "home",
      rootId: "root",
      elements: {
        root: {
          type: "container",
          style: {
            layout: "flex",
            direction: "column",
            background: "#0a0a0a",
            height: "100vh",
            width: "100%",
            padding: { top: 40, left: 60 },
          },
          content: ["t1"],
        },
        t1: {
          type: "block",
          component: "text",
          props: { text: "Authorized Instance" },
          style: { size: 24, color: "#ffffff" } as any,
        },
      },
    },
  };

  useEffect(() => {
    const cleanup = Bridge.listen((type: string) => {
      if (type === "APP_READY" && openedApp) {
        if (iframeRef.current?.contentWindow) {
          Bridge.send(iframeRef.current.contentWindow, "INITIALIZE_GUEST", {
            app: openedApp.config || {
              id: openedApp.id,
              routes: { "/": "home" },
            },
            pages: DEFAULT_TEMPLATE,
          });
        }
      }
    });
    return cleanup;
  }, [openedApp]);

  const activeTheme = themes.find((t) => t.id === currentTheme) || themes[0];

  useEffect(() => {
    const savedTheme = localStorage.getItem("ubento-theme") || "sky";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    if (!currentSession) {
      setIsFetching(false);
      return;
    }

    // Fetch apps
    ubento.app
      .listApps({ team_id: currentSession?.tenantId || "" })
      .then((data) => {
        // Handle case where data might be nested depending on the SDK behavior
        setApps(Array.isArray(data) && Array.isArray(data[0]) ? data[0] : data);
        setIsFetching(false);
      })
      .catch((err) => {
        console.error("Failed to fetch apps:", err);
        setIsFetching(false);
      });
  }, [currentSession, ubento]);

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem("ubento-theme", themeId);
    document.documentElement.setAttribute("data-theme", themeId);
  };

  const handleCreateApp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const team_id = currentSession?.tenantId || "default-team";

    try {
      const app = await ubento.app.createApp({ name, team_id });
      setApps((prev) => [app, ...prev]);
      setActiveModal(null);
    } catch (err) {
      console.error("Error creating app:", err);
      alert("Error creating app");
    } finally {
      setIsCreating(false);
    }
  };

  const closeModal = () => setActiveModal(null);

  const openApp = (app: any) => {
    setOpenedApp(app);
    setIsOverlayVisible(true);
  };

  const closeApp = () => {
    setOpenedApp(null);
  };

  // Render App Inline
  if (openedApp) {
    return (
      <div className="relative h-screen w-screen overflow-hidden bg-black">
        <iframe
          ref={iframeRef}
          src={host.iframeUrl || "http://localhost:4020"}
          className="absolute inset-0 h-full w-full border-none"
          title="Ubento Runtime"
        />

        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isOverlayVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="pointer-events-auto flex h-12 w-full items-center justify-between bg-white/80 px-4 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-4">
              <button
                onClick={closeApp}
                className="h-8 px-2 rounded hover:bg-black/10 flex items-center justify-center text-sm font-bold transition-colors"
              >
                &larr; Back
              </button>
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                U
              </div>
              <span className="text-sm font-bold text-gray-800">
                {openedApp?.name}{" "}
                <span className="font-normal text-gray-400 ml-2">
                  ({openedApp?.slug || openedApp?.id})
                </span>
              </span>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          </div>
        </div>

        <button
          onClick={() => setIsOverlayVisible(!isOverlayVisible)}
          className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 z-50 flex items-center justify-center text-xl"
        >
          {isOverlayVisible ? "✕" : "⌘"}
        </button>
      </div>
    );
  }

  // Render Dashboard
  return (
    <div className="relative flex min-h-screen justify-center bg-background px-8 py-10 font-sans text-foreground selection:bg-foreground-200 overflow-x-hidden">
      {/* Background Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-primary-500/10 dark:from-primary-300/7 to-transparent"
      />

      <div className="relative flex w-full max-w-5xl flex-col">
        {/* Navigation Bar */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20 flex w-full items-center justify-between"
        >
          <div className="flex items-center text-primary-300">
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-background-300 text-foreground-200 transition-all hover:bg-background-400 hover:scale-105 active:scale-95"
              >
                <div
                  className={`h-4 w-4 rounded-full ${activeTheme.color} shadow-sm transition-colors duration-500`}
                />
              </button>

              <AnimatePresence>
                {isThemeOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsThemeOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                      exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 top-12 z-50 min-w-[160px] overflow-hidden rounded-2xl border border-background-300 bg-background-100 p-1.5 shadow-2xl backdrop-blur-xl"
                    >
                      <div className="flex flex-col gap-0.5">
                        {themes.map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() => {
                              changeTheme(theme.id);
                              setIsThemeOpen(false);
                            }}
                            className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                              currentTheme === theme.id
                                ? "bg-background-300 text-foreground-100"
                                : "text-foreground-300 hover:bg-background-300/50 hover:text-foreground-200"
                            }`}
                          >
                            <div
                              className={`h-4 w-4 shrink-0 rounded-full ${theme.color} ring-1 ring-background-400/20`}
                            />
                            <span className="text-[13px] font-medium leading-none">
                              {theme.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            {currentSession ? (
              <a
                href="/api/auth/logout"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-background-300 overflow-hidden text-foreground-200 transition-all hover:bg-background-400 hover:scale-105 active:scale-95"
              >
                {currentSession.picture ? (
                  <img
                    src={currentSession.picture}
                    alt={currentSession.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </a>
            ) : (
              <a
                href="/api/auth/login"
                className="flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95"
              >
                Sign In
              </a>
            )}
          </div>
        </motion.nav>

        {/* Header (Greeting) */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mb-16 text-2xl font-medium tracking-tight sm:text-3xl"
        >
          Good afternoon {currentSession?.name || "Guest"}
        </motion.h1>

        {/* Main Grid Layout */}
        <div className="flex flex-col gap-x-12 gap-y-12 md:grid md:grid-cols-4">
          {/* Left Sidebar Columns */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="col-span-1 flex flex-col gap-10"
          >
            {/* Create Section */}
            <div>
              <h2 className="mb-4 text-[13px] font-medium tracking-tight text-gray-200">
                Create
              </h2>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveModal("create")}
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-background-300"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background-300 group-hover:bg-background-400">
                    <Plus className="h-3.5 w-3.5 text-foreground-200" />
                  </div>
                  <span className="text-[13px] font-medium text-foreground-100">
                    Create New App
                  </span>
                </button>
                <button
                  onClick={() => setActiveModal("ai")}
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-background-300"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background-300">
                    <Sparkles className="h-3.5 w-3.5 text-foreground-200" />
                  </div>
                  <span className="text-[13px] font-medium text-foreground-100">
                    Start with AI
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h2 className="mb-4 text-[13px] font-medium tracking-tight text-gray-200">
                Quick Links
              </h2>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveModal("settings")}
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-background-300"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background-300">
                    <Settings className="h-3.5 w-3.5 text-foreground-200" />
                  </div>
                  <span className="text-[13px] font-medium text-foreground-100">
                    Settings
                  </span>
                </button>
                <button className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-background-300">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background-300">
                    <LayoutGrid className="h-3.5 w-3.5 text-foreground-200" />
                  </div>
                  <span className="text-[13px] font-medium text-foreground-100">
                    All apps
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Main Columns */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="col-span-3 flex flex-col px-0"
          >
            <h2 className="mb-4 text-lg font-medium tracking-tight text-foreground-400">
              Your Apps
            </h2>

            {/* Main Action Card */}
            <div className="mb-6 flex cursor-pointer flex-row items-center rounded-2xl bg-background-300  p-6 transition-colors hover:bg-background-200">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-background-500"></div>
                <div className="flex flex-col justify-center">
                  <p className="mb-1 text-xs leading-tight tracking-tight text-foreground-100">
                    Continue where you left off
                  </p>
                  <h3 className="text-[22px] font-medium leading-tight tracking-tight text-foreground">
                    Stock Manager
                  </h3>
                </div>
              </div>
            </div>

            {/* Grid of Apps */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {isFetching ? (
                [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-28 animate-pulse rounded-2xl bg-background-300"
                  />
                ))
              ) : apps.length > 0 ? (
                apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => openApp(app)}
                    className="group relative flex h-28 cursor-pointer flex-col justify-end overflow-hidden rounded-2xl bg-background-300 p-4 transition-all hover:bg-background-200 text-left"
                  >
                    <div className="absolute left-4 top-4 h-8 w-8 rounded-lg bg-background-500 transition-transform group-hover:scale-110" />
                    <h3 className="text-sm font-medium text-foreground">
                      {app.name}
                    </h3>
                  </button>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-foreground-400">
                  <p className="text-[13px]">
                    No apps yet. Create your first one!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Modal
        isOpen={activeModal === "create"}
        onClose={closeModal}
        title="Create New App"
      >
        <form
          onSubmit={handleCreateApp}
          className="flex flex-col space-y-6 pt-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-[11px] font-semibold uppercase tracking-wider text-foreground-300"
            >
              App Name
            </label>
            <input
              autoFocus
              id="name"
              name="name"
              placeholder="e.g. Stock Manager"
              required
              className="w-full rounded-xl border border-background-300 bg-background-200 px-4 py-2.5 text-[13px] text-foreground placeholder:text-foreground-400 focus:border-foreground-300 focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-foreground px-6 py-2.5 text-[13px] font-medium text-background transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Create Application"}
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={activeModal === "ai"}
        onClose={closeModal}
        title="Start with AI"
      >
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <div className="h-20 w-20 rounded-2xl bg-background-300 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-foreground-400" />
          </div>
          <p className="text-foreground-300 text-center px-4">
            Describe what you want to build and let AI handle the heavy lifting.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "settings"}
        onClose={closeModal}
        title="Settings"
      >
        <div className="grid grid-cols-2 gap-8 py-4">
          <div className="space-y-6">
            <h3 className="font-medium">General</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 w-full rounded-lg bg-background-200"
                />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="font-medium">Preference</h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-10 w-full rounded-lg bg-background-200"
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
