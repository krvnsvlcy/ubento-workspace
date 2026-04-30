import { useUbentoEngine } from "@/engine/engine";
import { useEffect, useRef } from "react";
import { WorkspaceContent } from "./content";
import { createWorkspaceEngine } from "./engine";
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
    createWorkspaceEngine({
      engine,
      slug,
    }),
  );

  useEffect(() => {
    workspaceController.current.load();
    return () => workspaceController.current.dispose();
  }, []);

  useKeyboardShortcuts({ controller: workspaceController.current });

  useEffect(() => {
    if (boardId) {
      workspaceController.current.goTo(boardId);
    }
  }, [boardId, workspaceController]);

  return <WorkspaceContent controller={workspaceController.current} />;
}
