import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

export type ComponentState = {
  code: string;
  props: any;
};

export type ComponentStore = ComponentState & {
  updateCode: (code: string) => void;
  updateProps: (props: any) => void;
};

export const useComponentStore = createStore<ComponentStore>()(
  immer((set) => ({
    code: "",
    props: {},

    updateCode: (code: string) => {
      set((s) => {
        s.code = code;
      });
    },

    updateProps: (props: any) => {
      set((s) => {
        s.props = props;
      });
    },
  })),
);
