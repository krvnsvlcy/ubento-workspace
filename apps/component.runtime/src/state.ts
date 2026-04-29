import { createStore } from "zustand/vanilla";

export type ComponentState = {
  code: string;
  props: any;
};

export type ComponentStore = ComponentState & {
  updateCode: (code: string) => void;
  updateProps: (props: any) => void;
};

export const useComponentStore = createStore<ComponentStore>()((set) => ({
  code: "",
  props: {},

  updateCode: (code: string) => {
    set({ code });
  },

  updateProps: (props: any) => {
    set({ props });
  },
}));
