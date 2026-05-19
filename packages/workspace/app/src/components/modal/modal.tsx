import { useModalInstance } from "@/utils/modal-store";
import { motion } from "motion/react";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
}

export function Modal({ children }: ModalProps) {
  const { close } = useModalInstance();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 py-10">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        onClick={() => close()}
        className="absolute inset-0 -z-10 bg-background/50"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="relative w-full overflow-hidden rounded-3xl bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </div>
  );
}
