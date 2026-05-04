import { useBoardElement } from "../states/board";
import {
  useEnvironmentComponent,
  useEnvironmentFallBackComponent,
} from "../states/environment";

function FallbackElement() {
  const FallbackComponent = useEnvironmentFallBackComponent();
  if (!FallbackComponent) return <></>;

  return <FallbackComponent props={{}} />;
}

export function ElementView({ id }: { id: string }) {
  const element = useBoardElement(id);
  const Component = useEnvironmentComponent(element.component);

  if (!Component) return <FallbackElement />;

  return <Component props={element.props || {}} />;
}
