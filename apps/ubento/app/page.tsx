"use client";

import { LayoutGrid, Plus, Settings, Sparkles, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "../components/logo";
import { Modal } from "../components/modal";

const themes = [
  { id: "sky", label: "Sky", color: "bg-blue-300" },
  { id: "sunset", label: "Sunset", color: "bg-orange-300" },
  { id: "forest", label: "Forest", color: "bg-green-300" },
  { id: "carbon", label: "Carbon", color: "bg-foreground-300" },
];

export default function Home() {
  const [activeModal, setActiveModal] = useState<
    "create" | "ai" | "settings" | null
  >(null);
  const [currentTheme, setCurrentTheme] = useState("sky");
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const activeTheme = themes.find((t) => t.id === currentTheme) || themes[0];

  useEffect(() => {
    const savedTheme = localStorage.getItem("ubento-theme") || "sky";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem("ubento-theme", themeId);
    document.documentElement.setAttribute("data-theme", themeId);
  };

  const closeModal = () => setActiveModal(null);
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
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-background-300 text-foreground-200 transition-colors hover:bg-background-400">
              <User className="h-4 w-4" />
            </button>
          </div>
        </motion.nav>

        {/* Header (Greeting) */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mb-16 text-2xl font-medium tracking-tight sm:text-3xl"
        >
          Good afternoon Jhon
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
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-28 cursor-pointer rounded-2xl bg-background-300 transition-colors hover:bg-background-200"
                ></div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Modal
        isOpen={activeModal === "create"}
        onClose={closeModal}
        title="Create New App"
      >
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <div className="h-20 w-20 rounded-2xl bg-background-300 flex items-center justify-center">
            <Plus className="h-8 w-8 text-foreground-400" />
          </div>
          <p className="text-foreground-300">
            Configure your new application details here.
          </p>
        </div>
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
          <p className="text-foreground-300">
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
