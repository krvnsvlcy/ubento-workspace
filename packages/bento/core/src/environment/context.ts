import { createZustandStateController } from "@ubento/bento.arlo-core";
import { createStore as createZustandStore } from "zustand";

export type CapturedContext = {
  session: any;
  workspace: any;
  board: any;
  params: Record<string, unknown>;
  state: Record<string, unknown>;
  store: Record<string, unknown>;
};

export type ContextManagerState = {
  context: CapturedContext | null;
};

export function createContextManager() {
  const store = createZustandStore<ContextManagerState>()(() => ({
    context: null,
  }));

  const controller = createZustandStateController(store);

  return {
    ...controller,
    setContext: (context: CapturedContext | null) => {
      controller.setState({ context });
    },
  };
}

export type ContextManager = ReturnType<typeof createContextManager>;
