import { createZustandStateController } from "@ubento/bento.arlo-core";
import z from "zod";
import { createStore as createZustandStore } from "zustand";

export type RefHandler = (dom: HTMLElement | null) => (() => void) | void;

export type ComponentProps<
  TProps extends z.ZodObject<any> = z.ZodObject<any>,
  TEvents extends z.ZodObject<any> = z.ZodObject<any>,
  TBindings extends z.ZodObject<any> = z.ZodObject<any>,
> = {
  props: z.infer<TProps>;
  // 1. Extract the inferred type of TEvents before getting keys and payloads
  emit: <E extends keyof z.infer<TEvents>>(
    event: E,
    payload: z.infer<TEvents>[E],
  ) => void;
  // 2. Extract the inferred type of TBindings for the two-way sync tuple
  bindings: {
    [K in keyof z.infer<TBindings>]: [
      value: z.infer<TBindings>[K],
      setValue: (value: z.infer<TBindings>[K]) => void,
    ];
  };
  ref: RefHandler;
  children?: React.ReactNode;
};

export type Component<
  TProps extends z.ZodObject<any> = z.ZodObject<any>,
  TEvents extends z.ZodObject<any> = z.ZodObject<any>,
  TBindings extends z.ZodObject<any> = z.ZodObject<any>,
> = {
  props: TProps;
  events?: TEvents;
  bindings?: TBindings;
  render: React.ComponentType<ComponentProps<TProps, TEvents, TBindings>>;
  summary: string;
  instructions?: string;
};

export function createComponent<
  TProps extends z.ZodObject<any>,
  TEvents extends z.ZodObject<any> = z.ZodObject<any>,
  TBindings extends z.ZodObject<any> = z.ZodObject<any>,
>({
  props,
  events,
  bindings,
  render,
  instructions,
  summary,
}: {
  props: TProps;
  events?: TEvents;
  bindings?: TBindings;
  summary: string;
  render: React.ComponentType<ComponentProps<TProps, TEvents, TBindings>>;
  instructions?: string;
}): Component<TProps, TEvents, TBindings> {
  return {
    summary,
    props,
    events,
    bindings,
    render,
    instructions: instructions,
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
