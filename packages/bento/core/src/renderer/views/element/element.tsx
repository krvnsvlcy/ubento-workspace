import { createContext, useContext } from "react";
import { RefHandler } from "../../../environment/environment";
import { useBoardRenderingContext } from "../../context/context";
import { useBoardElement } from "../../states/board";
import {
  useEnvironment,
  useEnvironmentComponent,
  useEnvironmentErrorComponent,
  useEnvironmentFallBackComponent,
} from "../../states/environment";
import {
  useResolvedBindings,
  useResolvedEventHandler,
  useResolvedValue,
} from "../../states/resolver";
import { ErrorBoundary } from "./error_boundary";

function FallbackElement({ ref }: { ref: RefHandler }) {
  const FallbackComponent = useEnvironmentFallBackComponent();
  if (!FallbackComponent) return <></>;

  return <FallbackComponent.render ref={ref} props={{}} emit={() => {}} />;
}

export const BindingContext = createContext<
  Record<string, [any, (v: any) => void]>
>({});
export function useBinding<T = any>(
  key: string,
): [T | undefined, (v: T) => void, boolean] {
  const bindings = useContext(BindingContext);
  const pair = bindings[key];

  if (!pair) return [undefined, () => {}, false];
  return [pair[0], pair[1], true];
}

function UnsafeElementView({
  id,
  parents = [],
  handleRef,
}: {
  id: string;
  parents?: string[];
  handleRef: RefHandler;
}) {
  const element = useBoardElement(id);
  const Component = useEnvironmentComponent(element.component);
  const context = useBoardRenderingContext();
  const resolvedCondition = useResolvedValue(element.condition, context);
  const resolvedProps = useResolvedValue(element.props || {}, context);
  const resolvedBindings = useResolvedBindings(element.bindings ?? {}, context);
  const resolvedEventHandler = useResolvedEventHandler(
    element.listeners ?? {},
    context,
  );

  if (element.condition !== undefined && !resolvedCondition) {
    return null;
  }

  if (!Component) {
    return <FallbackElement ref={handleRef} />;
  }

  const children = element.children?.map((child) => (
    <ElementView id={child} key={child} parents={[...parents, id]} />
  ));

  return (
    <BindingContext.Provider value={resolvedBindings}>
      <Component.render
        props={resolvedProps}
        ref={handleRef}
        emit={resolvedEventHandler}
      >
        {children}
      </Component.render>
    </BindingContext.Provider>
  );
}

export function ElementView({
  id,
  parents = [],
}: {
  id: string;
  parents?: string[];
}) {
  const environment = useEnvironment();

  const ErrorComponent = useEnvironmentErrorComponent();
  function handleRef(dom: HTMLElement | null) {
    if (!dom) {
      environment.domManager.remove(id);
    } else {
      dom.setAttribute("bento-id", id);
      environment.domManager.add(id, { dom, parents });
    }
    return () => environment.domManager.remove(id);
  }

  return (
    <ErrorBoundary
      elementId={id}
      errorComponent={ErrorComponent}
      refHandler={handleRef}
    >
      <UnsafeElementView id={id} parents={parents} handleRef={handleRef} />
    </ErrorBoundary>
  );
}
