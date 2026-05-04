import { RefHandler } from "../../../environment/environment";
import { useBoardElement } from "../../states/board";
import {
  useEnvironment,
  useEnvironmentComponent,
  useEnvironmentErrorComponent,
  useEnvironmentFallBackComponent,
} from "../../states/environment";
import { ErrorBoundary } from "./error_boundary";

function FallbackElement({ ref }: { ref: RefHandler }) {
  const FallbackComponent = useEnvironmentFallBackComponent();
  if (!FallbackComponent) return <></>;

  return <FallbackComponent props={{}} ref={ref} />;
}

export function ElementView({ id }: { id: string }) {
  const element = useBoardElement(id);
  const environment = useEnvironment();
  const ErrorComponent = useEnvironmentErrorComponent();
  const Component = useEnvironmentComponent(element.component);

  function handleRef(dom: HTMLElement | null) {
    if (!dom) {
      environment.domStore.clear(id);
    } else {
      environment.domStore.set(id, dom);
    }
    return () => environment.domStore.clear(id);
  }

  if (!Component) {
    return <FallbackElement ref={handleRef} />;
  }

  const children = element.children?.map((child) => (
    <ElementView id={child} key={child} />
  ));

  return (
    <ErrorBoundary
      elementId={id}
      errorComponent={ErrorComponent}
      refHandler={handleRef}
    >
      <Component props={element.props || {}} ref={handleRef}>
        {children}
      </Component>
    </ErrorBoundary>
  );
}
