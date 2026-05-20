import { createZustandStateController } from "@ubento/bento.arlo-core";
import { createStore as createZustandStore } from "zustand";

export type OverlayType = "modal" | "popover" | "tooltip" | "menu" | "sheet";

export type OverlayInstance = {
  id: string;
  type: OverlayType;
  component: string;
  inputs: Record<string, any>;
  anchorId?: string; // For popovers/tooltips
  anchorRect?: DOMRect;
  zIndex?: number;
};

export type OverlayState = {
  overlays: OverlayInstance[];
};

export function createOverlayManager() {
  const store = createZustandStore<OverlayState>()(() => ({
    overlays: [],
  }));

  const controller = createZustandStateController(store);

  return {
    ...controller,
    open: (instance: Omit<OverlayInstance, "id">) => {
      const id = Math.random().toString(36).substring(7);
      controller.setState((state) => ({
        ...state,
        overlays: [...state.overlays, { ...instance, id }],
      }));
      return id;
    },
    close: (id: string) => {
      controller.setState((state) => ({
        ...state,
        overlays: state.overlays.filter((o) => o.id !== id),
      }));
    },
    update: (id: string, updates: Partial<OverlayInstance>) => {
      controller.setState((state) => ({
        ...state,
        overlays: state.overlays.map((o) =>
          o.id === id ? { ...o, ...updates } : o
        ),
      }));
    },
    clear: () => {
      controller.setState({ overlays: [] });
    },
  };
}

export type OverlayManager = ReturnType<typeof createOverlayManager>;
