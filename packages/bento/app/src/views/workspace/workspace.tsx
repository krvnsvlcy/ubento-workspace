import { useBentoHost } from "@/contexts/host";
import { useUbento } from "@/hooks/ubento";
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
  const host = useBentoHost();
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
    workspaceController.current.load();
    return () => workspaceController.current.dispose();
  }, []);

  useKeyboardShortcuts({ state: workspaceController.current.state });

  useEffect(() => {
    if (boardId) {
      workspaceController.current.goTo(boardId);
    }
  }, [boardId, workspaceController]);

  return <WorkspaceContent controller={workspaceController.current} />;
}
