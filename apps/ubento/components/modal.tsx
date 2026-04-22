import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 py-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={onClose}
            className="absolute inset-0 -z-10 bg-background/50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-background shadow-2xl aspect-[3/2]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-background-300"
                >
                  <X className="h-5 w-5 text-foreground-300 group-hover:text-foreground-200" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-8 pb-8">{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
