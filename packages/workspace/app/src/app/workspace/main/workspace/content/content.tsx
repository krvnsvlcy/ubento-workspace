import { useWorkspaceEngine } from "@/contexts/workspace.js";
import { If } from "react-if";
import { Editor } from "./editor/editor.js";
import { Viewer } from "./viewer.js";

export function WorkspaceContent() {
  const workspaceEngine = useWorkspaceEngine();
  const mode = workspaceEngine.userSetting.useState((s) => s.data.mode);
  const isEditing = mode === "edit";

  return (
    <div className="h-full w-full relative">
      <Viewer />
      <If condition={isEditing}>
        <Editor />
      </If>
    </div>
  );
}
