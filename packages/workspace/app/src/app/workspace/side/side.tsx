import { useUbentoEngine } from "../../../engine/app/engine";
import { ComponentSide } from "./component/component-side";
import { StyleSide } from "./style/style-side";
import { WorkspaceSide } from "./workspace/workspace-side";

export function Side() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);

  let content = <></>;

  if (location.style) {
    content = <StyleSide />;
  } else if (location.component) {
    content = <ComponentSide />;
  } else {
    content = <WorkspaceSide />;
  }

  return <div className="h-full overflow-hidden">{content}</div>;
}
