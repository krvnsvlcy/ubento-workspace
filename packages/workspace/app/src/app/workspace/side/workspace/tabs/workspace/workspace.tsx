import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import {
  useWorkspaceEngine,
  WorkspaceEngineProvider,
} from "@/contexts/workspace";
import { useUbento, useUbentoEngine } from "@/engine/app/engine";
import { ServiceData } from "@ubento/bento.core";
import { workspaceClient } from "@ubento/services.sdk";
import React from "react";
import { useModal } from "@/utils/modal-store";
import { DeleteBoardModal } from "@/modals/delete_board/delete_board";

import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import { TabDefinition } from "../../../types";

interface BoardEntryProps {
  board: { id: string; name: string };
  active: boolean;
  onClick: () => void;
  onRename: (newName: string) => Promise<void>;
  onDelete: () => Promise<void>;
}

function BoardEntry({
  board,
  active,
  onClick,
  onRename,
  onDelete,
}: BoardEntryProps) {
  const { open } = useModal();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editName, setEditName] = React.useState(board.name);

  React.useEffect(() => {
    setEditName(board.name);
  }, [board.name]);

  const handleSave = async () => {
    setIsEditing(false);
    if (editName.trim() !== board.name) {
      await onRename(editName.trim());
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(board.name);
  };

  if (isEditing) {
    return (
      <TreeEntry
        icon="board"
        active={active}
        actionMode="hidden"
      >
        <input
          autoFocus
          className="w-full bg-transparent border-none outline-none p-0 text-[13px] text-foreground placeholder:text-neutral-content-muted"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleSave}
          onFocus={(e) => e.target.select()}
          placeholder="Untitled"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            } else if (e.key === "Escape") {
              handleCancel();
            }
            e.stopPropagation();
          }}
        />
      </TreeEntry>
    );
  }

  return (
    <TreeEntry
      icon="board"
      active={active}
      onClick={onClick}
      actions={[
        {
          icon: "edit",
          title: "Rename",
          handler: () => {
            setIsEditing(true);
          },
        },
        {
          icon: "trash",
          title: "Delete",
          handler: () => {
            open(DeleteBoardModal, {
              boardName: board.name,
              onConfirm: onDelete,
            });
          },
        },
      ]}
    >
      {board.name.trim() || "Untitled"}
    </TreeEntry>
  );
}

function BoardsSection({
  workspace,
}: {
  workspace: workspaceClient.Workspace;
}) {
  const engine = useUbentoEngine();
  const ubento = useUbento();
  const location = engine.useState((s) => s.location);
  const workspaceEngine = useWorkspaceEngine();
  const { data: rootBoards } = ubento.workspace.useBoards(
    { workspace_id: workspace.id, parent_id: null },
    { enabled: !!workspace.id },
  );

  return (
    <SideSection
      title="Boards"
      actions={[
        {
          icon: "plus",
          title: "Create Board",
          handler: async () => {
            try {
              const res = await workspaceEngine.createBoard({
                title: "",
              });
              if (res.boardId) {
                engine.goToLocation({
                  board: res.boardId,
                  params: {},
                });
              }
            } catch (err) {
              console.error("Failed to create board:", err);
            }
          },
        },
      ]}
    >
      {(rootBoards || []).length === 0 ? (
        <div className="px-3 py-4 text-center">
          <p className="text-[11px] text-neutral-content-muted italic">
            No boards found
          </p>
        </div>
      ) : (
        rootBoards?.map((board) => (
          <BoardEntry
            key={board.id}
            board={board}
            active={location.board === board.id}
            onClick={() => {
              engine.goToLocation({
                board: board.id,
                params: {},
              });
            }}
            onRename={async (newName) => {
              await workspaceEngine.updateBoard({
                boardId: board.id,
                update: { title: newName },
              });
            }}
            onDelete={async () => {
              await workspaceEngine.deleteBoard({ boardId: board.id });
            }}
          />
        ))
      )}
    </SideSection>
  );
}

function ServicesSection() {
  const workspaceEngine = useWorkspaceEngine();
  const services = workspaceEngine.useState((s) => {
    const spec = s.workspace.spec;
    if (spec.isValid) {
      return spec.data.services ?? {};
    } else {
      return {};
    }
  }) as Record<string, ServiceData>;
  const serviceEntries = Object.entries(services);
  const { push } = useAppModal();

  return (
    <SideSection
      title="Services"
      actions={[
        {
          icon: "plus",
          title: "Install Service",
          handler: () => push(appModalRoutes.services.services),
        },
      ]}
    >
      {serviceEntries.length === 0 ? (
        <div className="px-3 py-4 text-center">
          <p className="text-[11px] text-neutral-content-muted italic">
            No services installed
          </p>
        </div>
      ) : (
        serviceEntries.map(([name, service]) => (
          <TreeEntry
            key={name}
            icon="service"
            onClick={() =>
              push(appModalRoutes.services.service, {
                serviceId: service.id,
              })
            }
          >
            {name}
          </TreeEntry>
        ))
      )}
    </SideSection>
  );
}

export function WorkspaceTab() {
  const engine = useUbentoEngine();
  const activeWorkspaceEngine = engine.useState((s) => s.workspace);
  const ubento = useUbento();
  const location = engine.useState((s) => s.location);

  const { data: workspace, isLoading } = ubento.workspace.useWorkspaceBySlug(
    { slug: location.workspace! },
    { enabled: !!location.workspace },
  );

  if (isLoading && !workspace) {
    return (
      <div className="p-4 text-xs text-neutral-content-muted">
        Loading workspace...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="px-2">
        <TreeEntry
          icon="home"
          onClick={() => {
            engine.goToLocation({
              board: undefined,
              params: {},
            });
          }}
          active={!location.board}
        >
          <span>Home</span>
        </TreeEntry>
      </div>
      {workspace && <BoardsSection workspace={workspace} />}
      {activeWorkspaceEngine && <ServicesSection />}
    </div>
  );
}

export const workspaceTab: TabDefinition = {
  id: "workspace",
  name: "Workspace",
  icon: "workspace",
  component: () => (
    <WorkspaceEngineProvider>
      <WorkspaceTab />
    </WorkspaceEngineProvider>
  ),
  enabled: (location) => !!location.workspace,
};
