import { useBentoHostApi } from "@/contexts/host";
import { useUbento } from "@/libs/api/ubento";
import { useQueryClient } from "@tanstack/react-query";
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
  const host = useBentoHostApi();
  const queryClient = useQueryClient();
  const ubento = useUbento();

  const workspaceController = useRef(
    createWorkspaceController({
      ubento,
      queryClient,
      host,
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
