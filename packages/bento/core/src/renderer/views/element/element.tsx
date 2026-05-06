import { RefHandler } from "../../../environment/environment";
import { useBoardElement, useBoardState } from "../../states/board";
import {
  useEnvironment,
  useEnvironmentComponent,
  useEnvironmentErrorComponent,
  useEnvironmentFallBackComponent,
} from "../../states/environment";
import { useResolvedValue } from "../../states/resolver";
import { ErrorBoundary } from "./error_boundary";

function FallbackElement({ ref }: { ref: RefHandler }) {
  const FallbackComponent = useEnvironmentFallBackComponent();
  if (!FallbackComponent) return <></>;

  return <FallbackComponent props={{}} ref={ref} />;
}

export function ElementView({
  id,
  parents = [],
}: {
  id: string;
  parents?: string[];
}) {
  const element = useBoardElement(id);
  const environment = useEnvironment();
  const ErrorComponent = useEnvironmentErrorComponent();
  const Component = useEnvironmentComponent(element.component);
  const state = useBoardState();
  const resolvedProps = useResolvedValue(element.props || {}, { state });

  function handleRef(dom: HTMLElement | null) {
    if (!dom) {
      environment.domManager.remove(id);
    } else {
      environment.domManager.add(id, { dom, parents });
    }
    return () => environment.domManager.remove(id);
  }

  if (!Component) {
    return <FallbackElement ref={handleRef} />;
  }

  const children = element.children?.map((child) => (
    <ElementView id={child} key={child} parents={[...parents, id]} />
  ));

  return (
    <ErrorBoundary
      elementId={id}
      errorComponent={ErrorComponent}
      refHandler={handleRef}
    >
      <Component props={resolvedProps} ref={handleRef}>
        {children}
      </Component>
    </ErrorBoundary>
  );
}
