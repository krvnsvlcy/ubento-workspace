import { Workspace } from "@/app/workspace/main/workspace/workspace";
import { useUbentoEngine } from "@/hooks/app-engine";
import { Case, Default, Switch } from "react-if";
import { Home } from "./home/home";

export function Main() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);

  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      <Switch>
        <Case condition={location.view === "workspace"}>
          <Workspace />
        </Case>
        <Default>
          <Home />
        </Default>
      </Switch>
    </div>
  );
}
