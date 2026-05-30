"use client";

import { motion } from "motion/react";
import { Screen } from "@/components/screen";

export function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative mx-auto mt-20 max-w-5xl w-full"
    >
      <Screen>
        {/* Workspace Grid */}
        <div className="grid grid-cols-4 h-[500px]">
          {/* Sidebar */}
          <div className="col-span-1 border-r border-border bg-surface p-4 space-y-4">
            <div className="h-6 w-24 rounded bg-surface-hover" />
            <div className="space-y-2 pt-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-full rounded bg-surface-hover"
                />
              ))}
            </div>
          </div>
          {/* Main Content */}
          <div className="col-span-3 p-8 bg-background">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
              <div className="h-8 w-48 rounded bg-surface" />
              <div className="h-8 w-24 rounded bg-base text-contrast flex items-center justify-center text-xs font-medium">
                Generate
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-lg border border-border bg-surface p-4"
                >
                  <div className="h-4 w-1/2 rounded bg-surface-hover mb-4" />
                  <div className="h-2 w-full rounded bg-border mb-2" />
                  <div className="h-2 w-2/3 rounded bg-border" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Screen>
    </motion.div>
  );
}
