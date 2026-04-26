import { Console } from "./console.js";
import { WorkspaceNavigation } from "./navigation.js";
import { WorkspaceState } from "../controller.js";

export function WorkspaceInteractor({
  workspace,
  state,
}: {
  workspace?: any;
  state: WorkspaceState;
}) {
  return (
    <>
      <WorkspaceNavigation state={state} workspace={workspace} />
      <Console state={state} />
    </>
  );
}
