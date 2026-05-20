import { Workspace } from "@/app/workspace/main/workspace/workspace";
import { Case, Default, Switch } from "react-if";
import { useUbentoEngine } from "../../../engine/app/engine";
import { ComponentMain } from "./component/component-main";
import { Home } from "./home/home";

export function Main() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);

  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      <Switch>
        <Case condition={location.workspace}>
          <Workspace key={location.workspace} />
        </Case>

        <Case condition={location.component}>
          <ComponentMain componentId={location.component!} />
        </Case>

        <Default>
          <Home />
        </Default>
      </Switch>
    </div>
  );
}
