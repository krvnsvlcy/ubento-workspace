"use client";

import { LayoutGrid, Plus, Settings, Sparkles, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Logo } from "../components/logo";
import { Modal } from "../components/modal";

export default function Home() {
  const [activeModal, setActiveModal] = useState<
    "create" | "ai" | "settings" | null
  >(null);

  const closeModal = () => setActiveModal(null);
  return (
    <div className="flex min-h-screen justify-center bg-white px-8 py-10 font-sans text-zinc-900 selection:bg-zinc-200">
      <div className="flex w-full max-w-5xl flex-col">
        {/* Navigation Bar */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20 flex w-full items-center justify-between"
        >
          <div className="flex items-center">
            <Logo />
          </div>
          <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200">
            <User className="h-4 w-4" />
          </button>
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
              <h2 className="mb-4 text-[13px] font-medium tracking-tight text-zinc-600">
                Create
              </h2>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveModal("create")}
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-100"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 group-hover:bg-zinc-200">
                    <Plus className="h-3.5 w-3.5 text-zinc-600" />
                  </div>
                  <span className="text-[13px] font-medium text-zinc-700">
                    Create New App
                  </span>
                </button>
                <button
                  onClick={() => setActiveModal("ai")}
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-100"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100">
                    <Sparkles className="h-3.5 w-3.5 text-zinc-600" />
                  </div>
                  <span className="text-[13px] font-medium text-zinc-700">
                    Start with AI
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h2 className="mb-4 text-[13px] font-medium tracking-tight text-zinc-600">
                Quick Links
              </h2>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveModal("settings")}
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-100"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100">
                    <Settings className="h-3.5 w-3.5 text-zinc-600" />
                  </div>
                  <span className="text-[13px] font-medium text-zinc-700">
                    Settings
                  </span>
                </button>
                <button className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-100">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100">
                    <LayoutGrid className="h-3.5 w-3.5 text-zinc-600" />
                  </div>
                  <span className="text-[13px] font-medium text-zinc-700">
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
            <h2 className="mb-4 text-[15px] font-medium tracking-tight text-zinc-800">
              Your Apps
            </h2>

            {/* Main Action Card */}
            <div className="mb-6 flex cursor-pointer flex-row items-center rounded-2xl bg-[#f0f0f0] p-6 transition-colors hover:bg-[#e5e5e5]">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-[#dfdfdf]"></div>
                <div className="flex flex-col justify-center">
                  <p className="mb-1 text-[11px] font-medium leading-tight tracking-tight text-zinc-500">
                    Continue were you left off
                  </p>
                  <h3 className="text-[22px] font-medium leading-tight tracking-tight text-zinc-900">
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
                  className="h-28 cursor-pointer rounded-2xl bg-[#f0f0f0] transition-colors hover:bg-[#e5e5e5]"
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
          <div className="h-20 w-20 rounded-2xl bg-zinc-100 flex items-center justify-center">
            <Plus className="h-8 w-8 text-zinc-400" />
          </div>
          <p className="text-zinc-500">
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
          <div className="h-20 w-20 rounded-2xl bg-zinc-100 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-zinc-400" />
          </div>
          <p className="text-zinc-500">
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
                <div key={i} className="h-10 w-full rounded-lg bg-zinc-50" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="font-medium">Preference</h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-10 w-full rounded-lg bg-zinc-50" />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
