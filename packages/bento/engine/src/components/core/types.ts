export type CoreComponent<P> = {
  name: string;
  props: (props: P) => P;
  component: React.ComponentType<P>;
};

export function coreComponent<P>(
  name: string,
  render: (props: P) => React.ReactNode,
) {
  return {
    name,
    props: (props: P) => props,
    component: render,
  };
}
