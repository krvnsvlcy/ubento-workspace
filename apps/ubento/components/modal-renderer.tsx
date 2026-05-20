"use client";

import { useModalStore, ModalInstanceProvider } from "@/lib/modal";
import { AnimatePresence } from "motion/react";
import React from "react";

export function ModalRenderer() {
  const activeModal = useModalStore((s) => s.queue[0]);
  const close = useModalStore((s) => s.close);

  return (
    <AnimatePresence mode="wait">
      {activeModal && (
        <ModalInstanceProvider 
          key={activeModal.id}
          value={{ 
            id: activeModal.id, 
            close: (result?: any) => close(activeModal.id, result) 
          }}
        >
          <activeModal.component {...activeModal.props} />
        </ModalInstanceProvider>
      )}
    </AnimatePresence>
  );
}
