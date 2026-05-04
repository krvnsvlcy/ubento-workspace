export type ComponentProps<P = {}> = {
  props: P;
  children: React.ReactNode;
};

export type Component<P = {}> = React.ComponentType<ComponentProps<P>>;

export type Environment = {
  components: Record<string, Component>;
  fallBackComponent?: Component;
};
