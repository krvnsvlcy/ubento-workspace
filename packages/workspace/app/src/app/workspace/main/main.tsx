import { Workspace } from "@/app/workspace/main/workspace/workspace";
import { useUbentoEngine } from "@/hooks/app-engine";
import { Case, Default, Switch } from "react-if";
import { ComponentMain } from "./component/component-main";
import { Home } from "./home/home";

export function Main() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);

  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      <Switch>
        <Case condition={location.component}>
          <ComponentMain componentId={location.component!} />
        </Case>
        <Case condition={location.workspace}>
          <Workspace key={location.workspace} />
        </Case>
        <Default>
          <Home />
        </Default>
      </Switch>
    </div>
  );
}
