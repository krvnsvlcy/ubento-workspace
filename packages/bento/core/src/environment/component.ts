import { createZustandStateController } from "@ubento/workspace.primitives";
import z from "zod";
import { createStore as createZustandStore } from "zustand";

export type RefHandler = (dom: HTMLElement | null) => (() => void) | void;

export type ComponentProps<P = {}> = {
  props: P;
  ref: RefHandler;
  children?: React.ReactNode;
};

export type Component<S extends z.ZodType<any> = z.ZodAny> = {
  schema: S;
  render: React.ComponentType<ComponentProps<z.infer<S>>>;
  summary: string;
  instruction?: string;
};

export function createComponent<S extends z.ZodType<any>>({
  schema,
  render,
  instruction,
  summary,
}: {
  schema: S;
  summary: string;
  render: React.ComponentType<ComponentProps<z.infer<S>>>;
  instruction?: string;
}): Component<S> {
  return {
    summary,
    schema,
    render,
    instruction,
  };
}

export type ComponentStoreState = {
  components: Record<string, Component>;
  fallbackComponent?: Component;
  errorComponent?: Component;
};

export function createComponentStore(
  initialState?: Partial<ComponentStoreState>,
) {
  const store = createZustandStore<ComponentStoreState>()(() => ({
    components: {},
    fallbackComponent: undefined,
    errorComponent: undefined,
    ...initialState,
  }));

  const controller = createZustandStateController(store);

  return {
    ...controller,
    setFallBackComponent: (component: Component) => {
      controller.setState((state) => ({
        ...state,
        fallbackComponent: component,
      }));
    },
    setErrorComponent: (component: Component) => {
      controller.setState((state) => ({
        ...state,
        errorComponent: component,
      }));
    },
    addComponent: (name: string, component: Component) => {
      controller.setState((state) => ({
        ...state,
        components: {
          ...state.components,
          [name]: component,
        },
      }));
    },
    removeComponent: (name: string) => {
      controller.setState((state) => {
        const nextState = { ...state, components: { ...state.components } };
        delete nextState.components[name];
        return nextState;
      });
    },
  };
}

export type ComponentStore = ReturnType<typeof createComponentStore>;
