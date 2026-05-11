import { create } from "zustand";
import React, { createContext, useContext } from "react";

export interface ModalInstance {
  id: string;
  component: React.ComponentType<any>;
  props: any;
  resolve: (value: any) => void;
}

interface ModalState {
  queue: ModalInstance[];
  open: <T = any, R = any>(
    component: React.ComponentType<T>,
    props?: Omit<T, "resolve" | "close">
  ) => Promise<R>;
  close: (id: string, result?: any) => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  queue: [],

  open: (component, props = {}) => {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).substring(7);
      const instance: ModalInstance = {
        id,
        component,
        props,
        resolve,
      };

      set((state) => ({
        queue: [...state.queue, instance],
      }));
    });
  },

  close: (id, result) => {
    const { queue } = get();
    const instance = queue.find((m) => m.id === id);
    if (instance) {
      instance.resolve(result);
    }

    set((state) => ({
      queue: state.queue.filter((m) => m.id !== id),
    }));
  },
}));

interface ModalContextType {
  id: string;
  close: (result?: any) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalInstanceProvider = ModalContext.Provider;

/**
 * Hook to use the modal system in general components (to open modals)
 */
export function useModal() {
  const open = useModalStore((s) => s.open);
  const close = useModalStore((s) => s.close);
  const activeModal = useModalStore((s) => s.queue[0]);

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

/**
 * Hook to be used INSIDE a component rendered as a modal
 */
export function useModalInstance() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalInstance must be used within a ModalInstanceProvider");
  }
  return context;
}
