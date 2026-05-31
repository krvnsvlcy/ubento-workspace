import { useWorkspaceEngine } from "@/contexts/workspace.js";
import React, { useState } from "react";
import { Editor } from "./editor.js";
import { Viewer } from "./viewer.js";

export function WorkspaceContent() {
  const workspaceEngine = useWorkspaceEngine();
  const userSettings = workspaceEngine.userSetting.useState((s) => s.data);
  const activeBoardId = userSettings?.board?.id;
  const mode = userSettings?.mode;

  const [reloadCounter, setReloadCounter] = useState(0);

  const isEditing = mode === "edit" && !!activeBoardId;

  // Reload the viewer iframe when exiting edit mode to re-establish connection
  React.useEffect(() => {
    if (mode === "live") {
      setReloadCounter((prev) => prev + 1);
    }
  }, [mode]);

  const handleCloseEditor = () => {
    workspaceEngine.userSetting.update({
      mode: "live",
      module: undefined,
    });
  };

  return (
    <div className="h-full w-full relative">
      <Viewer reloadCounter={reloadCounter} />
      {isEditing && (
        <Editor activeBoardId={activeBoardId} onClose={handleCloseEditor} />
      )}
    </div>
  );
}
