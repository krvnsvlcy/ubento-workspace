import { ModalInstance } from "@/engine/app/engine";
import { useUbentoEngine } from "@/hooks/app-engine";
import { createContext, useContext } from "react";

export type { ModalInstance };

interface ModalContextType {
  id: string;
  close: (result?: any) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalInstanceProvider = ModalContext.Provider;

export function useModal() {
  const engine = useUbentoEngine();
  const open = engine.openModal;
  const close = engine.closeModal;
  const activeModal = engine.useState((s) => s.modalQueue[0]);

  return {
    open,
    close: (result?: any) => {
      if (activeModal) {
        close(activeModal.id, result);
      }
    },
    activeModal,
  };
}

export function useModalInstance() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModalInstance must be used within a ModalInstanceProvider",
    );
  }
  return context;
}
