import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import {
  useWorkspaceEngine,
  WorkspaceEngineProvider,
} from "@/contexts/workspace";
import { useUbento, useUbentoEngine } from "@/engine/app/engine";
import { DeleteBoardModal } from "@/modals/delete_board/delete_board";
import { useModal } from "@/utils/modal-store";
import { ServiceData } from "@ubento/bento.core";
import { workspaceClient } from "@ubento/services.sdk";
import React from "react";

import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import { Globe } from "lucide-react";
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
      <TreeEntry icon="board" active={active} actionMode="hidden">
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
      actionMode="visible"
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

interface ServiceEntryProps {
  name: string;
  service: ServiceData;
  onRename: (newName: string) => void;
  onUninstall: () => void;
  onOpen: () => void;
}

function ServiceEntry({
  name,
  service,
  onRename,
  onUninstall,
  onOpen,
}: ServiceEntryProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editName, setEditName] = React.useState(name);

  React.useEffect(() => {
    setEditName(name);
  }, [name]);

  const handleSave = () => {
    setIsEditing(false);
    const trimmed = editName.trim();
    if (trimmed && trimmed !== name) {
      onRename(trimmed);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(name);
  };

  if (isEditing) {
    return (
      <TreeEntry icon="service" actionMode="hidden">
        <input
          autoFocus
          className="w-full bg-transparent border-none outline-none p-0 text-[13px] text-foreground placeholder:text-neutral-content-muted"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleSave}
          onFocus={(e) => e.target.select()}
          placeholder="Service name"
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
      icon="service"
      onClick={onOpen}
      actions={[
        {
          icon: "edit",
          title: "Rename",
          handler: (e) => {
            e.stopPropagation();
            setIsEditing(true);
          },
        },
        {
          icon: "trash",
          title: "Uninstall",
          handler: (e) => {
            e.stopPropagation();
            onUninstall();
          },
        },
      ]}
    >
      {name}
    </TreeEntry>
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

  const handleUninstall = (name: string) => {
    const updated = { ...services };
    delete updated[name];
    workspaceEngine.updateWorkspaceSpec({ spec: { services: updated } });
  };

  const handleRename = (oldName: string, newName: string) => {
    const updated = { ...services };
    updated[newName] = updated[oldName];
    delete updated[oldName];
    workspaceEngine.updateWorkspaceSpec({ spec: { services: updated } });
  };

  return (
    <SideSection
      title="Services"
      actionMode="visible"
      actions={[
        {
          icon: <Globe size={16} />,
          title: "Browse Services",
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
          <ServiceEntry
            key={name}
            name={name}
            service={service}
            onOpen={() =>
              push(appModalRoutes.services.service, { serviceId: service.id })
            }
            onRename={(newName) => handleRename(name, newName)}
            onUninstall={() => handleUninstall(name)}
          />
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
