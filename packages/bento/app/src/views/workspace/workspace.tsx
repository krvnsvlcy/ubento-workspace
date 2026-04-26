import { useBentoHost } from "@/contexts/host";
import { queryKeys } from "@/hooks/keys";
import { useUbento } from "@/hooks/ubento";
import { getBoard, useWorkspaceBySlug } from "@/hooks/workspace";
import { useQueryClient } from "@tanstack/react-query";
import {
  BoardData,
  boardDataSchema,
  workspaceDataSchema,
} from "@ubento/engine";
import { useEffect, useMemo } from "react";
import { WorkspaceContent } from "./content";
import { createWorkspaceController } from "./controller";
import { WorkspaceInteractor } from "./interactor/interactor";
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
  const {
    data: workspaceData,
    isLoading,
    isError,
  } = useWorkspaceBySlug({ slug });
  const ubento = useUbento();

  const workspaceController = useMemo(() => {
    const controller = createWorkspaceController({
      initialState: {
        loading: false,
        error: false,
        mode: "edit",
      },
      handlers: {
        getBoard: async (boardId) => {
          const res = await getBoard({ ubento, queryClient, boardId });
          if (!res) throw new Error("Board not found");
          const boardData = boardDataSchema.parse({
            id: res.id,
            name: res.name,
            ...(res.data as any),
          });
          return boardData;
        },
        listBoards: async () => {
          const boards = await queryClient.fetchQuery({
            queryKey: ["boards", { workspace_id: controller.workspace?.id }],
            queryFn: () =>
              ubento.workspace.listBoards({
                workspace_id: controller.workspace!.id,
              }),
          });
          return boards
            .map((p) => {
              const { data: boardData, error } = boardDataSchema.safeParse({
                id: p.id,
                name: p.name,
                ...(p.data as any),
              });
              if (error) {
                return undefined;
              }
              return boardData;
            })
            .filter(Boolean) as BoardData[];
        },
        createBoard: async (name) => {
          const data: Omit<BoardData, "id" | "name"> = {
            rootId: "root",
            elements: {
              root: {
                type: "stack",
                content: [],
                style: {
                  width: 100,
                  height: 100,
                  background: "#3939dcff",
                  cornerRadius: 20,
                },
              },
            },
          };
          const res = await ubento.workspace.createBoard({
            workspace_id: controller.workspace!.id,
            name: name || "New Board",
            data,
          });
          queryClient.invalidateQueries({
            queryKey: ["boards", { workspace_id: controller.workspace!.id }],
          });
          const boardData = boardDataSchema.parse({
            id: res.id,
            name: res.name,
            ...(res.data as any),
          });
          return boardData;
        },
        getModule: async (moduleId) => {
          const res = await queryClient.fetchQuery({
            queryKey: queryKeys.module({ moduleId }),
            queryFn: async () => {
              return await ubento.module.getModule(moduleId);
            },
          });
          return {
            latestVersionId: res.latest_version_id,
          };
        },
        onGoTo: (boardId, params) => {
          host.goToLocation({
            view: "workspace",
            params: { slug, boardId, ...params },
          });
        },
      },
      moduleUrlTemplate: host.moduleUrlTemplate,
    });

    return controller;
  }, [slug, ubento, host.moduleUrlTemplate]);

  useEffect(() => {
    return () => workspaceController.dispose();
  }, [workspaceController]);

  useKeyboardShortcuts({ state: workspaceController.state });

  useEffect(() => {
    if (boardId) {
      workspaceController.goTo(boardId);
    }
  }, [boardId, workspaceController]);

  useEffect(() => {
    workspaceController.state.loading = isLoading;
    workspaceController.state.error = isError;
    if (workspaceData) {
      try {
        const data = workspaceDataSchema.parse({
          id: workspaceData.id,
          ...(workspaceData.data || {}),
        });
        workspaceController.load(data);
      } catch (err) {
        workspaceController.load({ id: workspaceData.id });
      }
    }
  }, [workspaceData, isLoading, isError]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <WorkspaceInteractor
        workspace={workspaceData}
        state={workspaceController.state}
      />
      <WorkspaceContent
        workspace={workspaceData}
        controller={workspaceController}
      />
    </div>
  );
}
