import { DomStore } from "./dom";

export type RefHandler = (dom: HTMLElement | null) => (() => void) | void;

export type ComponentProps<P = {}> = {
  props: P;
  ref: RefHandler;
  children?: React.ReactNode;
};

export type Component<P = {}> = React.ComponentType<ComponentProps<P>>;

export type Environment = {
  domStore: DomStore;
  components: Record<string, Component>;
  fallBackComponent?: Component;
  errorComponent?: Component;
  debugging?: DebuggingOptions;
};

export type DebuggingOptions = {
  hideElementOutlines?: boolean;
};

// exports
export * from "./dom";
