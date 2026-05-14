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

  return (
    <FallbackComponent.render
      ref={ref}
      props={{}}
      bindings={{}}
      emit={() => {}}
    />
  );
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
  const resolvedProps = useResolvedValue(element.props || {}, context);
  const resolvedBindings = useResolvedBindings(element.bindings ?? {}, context);
  const resolvedEventHandler = useResolvedEventHandler(
    element.listeners ?? {},
    context,
  );

  if (!Component) {
    return <FallbackElement ref={handleRef} />;
  }

  const children = element.children?.map((child) => (
    <ElementView id={child} key={child} parents={[...parents, id]} />
  ));

  return (
    <Component.render
      props={resolvedProps}
      ref={handleRef}
      bindings={resolvedBindings}
      emit={resolvedEventHandler}
    >
      {children}
    </Component.render>
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
