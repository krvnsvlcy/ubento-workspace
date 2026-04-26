import { useSnapshot } from "valtio";
import { WorkspaceController } from "../controller";

export function ControlPanel({
  controller,
}: {
  controller: WorkspaceController;
}) {
  const state = useSnapshot(controller.state);
  const selectedId = state.context.selection?.[0];
  const workspace = state.boards[selectedId];

  const element =
    selectedId && workspace ? workspace.elements[selectedId] : null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <pre>{JSON.stringify(state.context, null, 2)}</pre>
    </div>
  );
}
