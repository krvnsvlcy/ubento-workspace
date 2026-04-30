import { useUbentoEngine } from "@/engine/engine";
import { useEffect, useRef } from "react";
import { WorkspaceContent } from "./content";
import { createWorkspaceController } from "./controller";
import { useKeyboardShortcuts } from "./keyboard";

export function Workspace({
  slug,
  boardId,
}: {
  slug: string;
  boardId?: string;
}) {
  const engine = useUbentoEngine();

  const workspaceController = useRef(
    createWorkspaceController({
      engine,
      slug,
    }),
  );

  useEffect(() => {
    workspaceController.current.getState().load();
    return () => workspaceController.current.getState().dispose();
  }, []);

  useKeyboardShortcuts({ controller: workspaceController.current });

  useEffect(() => {
    if (boardId) {
      workspaceController.current.getState().goTo(boardId);
    }
  }, [boardId, workspaceController]);

  return <WorkspaceContent controller={workspaceController.current} />;
}
