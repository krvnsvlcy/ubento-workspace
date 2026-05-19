import { createZustandStateController } from "@ubento/bento.arlo-core";
import { createStore as createZustandStore } from "zustand";

export type InteractionManagerState = {
  selection: string[];
  hovered?: string;
  focused?: string;
};

export function createInteractionManager() {
  const store = createZustandStore<InteractionManagerState>()(() => ({
    selection: [],
    hovered: undefined,
    focused: undefined,
  }));

  const controller = createZustandStateController(store);

  return {
    ...controller,
    store,
    select: (ids: string | string[]) => {
      controller.setState((state) => ({
        ...state,
        selection: Array.isArray(ids) ? ids : [ids],
      }));
    },
    clearSelection: () => {
      controller.setState((state) => ({
        ...state,
        selection: [],
      }));
    },
    hover: (id?: string) => {
      controller.setState((state) => ({
        ...state,
        hovered: id,
      }));
    },
    focus: (id?: string) => {
      controller.setState((state) => ({
        ...state,
        focused: id,
      }));
    },
  };
}

export type InteractionManager = ReturnType<typeof createInteractionManager>;
