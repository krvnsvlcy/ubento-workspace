import { WorkspaceEngine } from "@/app/views/workspace/engine/engine";
import { useGlobalModals } from "@/contexts/modals";
import { ServiceData } from "@ubento/bento.engine";
import { workspaceClient } from "@ubento/services.sdk";
import {
  Box,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useUbento, useUbentoEngine } from "../../../../../engine/engine";
import { TabDefinition } from "../../types";

function BoardTreeItem({
  board,
  level,
}: {
  board: workspaceClient.Board;
  level: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const engine = useUbentoEngine();
  const ubento = useUbento();
  const location = engine.useState((s) => s.location);

  const { data: children } = ubento.workspace.useBoards(
    { workspace_id: board.workspace_id, parent_id: board.id },
    { enabled: isExpanded },
  );

  const hasChildren = (children || []).length > 0;
  const isActive = location.board === board.id;

  return (
    <div className="flex flex-col">
      <div
        onClick={() => {
          engine.goToLocation({
            board: board.id,
            params: {},
          });
        }}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        className={`group flex items-center gap-2 py-1.5 pr-2 rounded-lg cursor-pointer transition-colors ${
          isActive
            ? "bg-accent/10 text-accent font-medium"
            : "text-neutral-content-subtle hover:bg-neutral-surface-hover hover:text-neutral-content"
        }`}
      >
        <div className="flex items-center justify-center w-4 h-4">
          <ChevronRight
            size={14}
            className={`transition-transform duration-200 ${
              isExpanded ? "rotate-90" : ""
            } ${isExpanded || hasChildren ? "opacity-100" : "opacity-0"}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          />
        </div>
        <FileText
          size={14}
          className={isActive ? "text-accent" : "text-neutral-content-muted"}
        />
        <span className="flex-1 text-[13px] truncate">{board.name}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implement create sub-board
          }}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-border rounded transition-all"
        >
          <Plus size={12} />
        </button>
      </div>

      {isExpanded && (
        <div className="flex flex-col">
          {(children || []).map((child) => (
            <BoardTreeItem key={child.id} board={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function BoardsSection({
  workspace,
}: {
  workspace: workspaceClient.Workspace;
}) {
  const ubento = useUbento();
  const { data: rootBoards } = ubento.workspace.useBoards(
    { workspace_id: workspace.id, parent_id: null },
    { enabled: !!workspace.id },
  );

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between px-3 py-2">
        <p className="text-[10px] font-bold text-neutral-content-muted uppercase tracking-wider">
          Boards
        </p>
        <button className="p-1 hover:bg-neutral-surface-hover rounded text-neutral-content-muted hover:text-accent transition-colors">
          <Plus size={14} />
        </button>
      </div>
      <div className="flex flex-col gap-px px-1">
        {(rootBoards || []).length === 0 ? (
          <div className="px-3 py-4 text-center">
            <p className="text-[11px] text-neutral-content-muted italic">
              No boards found
            </p>
          </div>
        ) : (
          rootBoards?.map((board) => (
            <BoardTreeItem key={board.id} board={board} level={0} />
          ))
        )}
      </div>
    </div>
  );
}

function ServicesSection({ engine }: { engine: WorkspaceEngine }) {
  const services = engine.useState(
    (s) => s.workspaceData?.services || {},
  ) as Record<string, ServiceData>;
  const serviceEntries = Object.entries(services);
  const { openModal } = useGlobalModals();

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between px-3 py-2">
        <p className="text-[10px] font-bold text-neutral-content-muted uppercase tracking-wider">
          Installed Services
        </p>
        <button
          onClick={() => openModal("services")}
          className="p-1 hover:bg-neutral-surface-hover rounded text-neutral-content-muted hover:text-accent transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>
      <div className="flex flex-col gap-px px-1">
        {serviceEntries.length === 0 ? (
          <div className="px-3 py-4 text-center">
            <p className="text-[11px] text-neutral-content-muted italic">
              No services installed
            </p>
          </div>
        ) : (
          serviceEntries.map(([id, service]) => (
            <div
              key={id}
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-content hover:bg-neutral-surface-hover transition-colors cursor-pointer"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-surface border border-neutral-border text-neutral-content-muted group-hover:text-accent group-hover:border-accent/30 transition-colors">
                <Box size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium truncate">{id}</div>
                <div className="text-[10px] text-neutral-content-muted truncate">
                  {service.module.id}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function WorkspaceTab() {
  const engine = useUbentoEngine();
  const activeWorkspaceEngine = engine.useState((s) => s.activeWorkspaceEngine);
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
      {workspace && <BoardsSection workspace={workspace} />}
      {activeWorkspaceEngine && (
        <ServicesSection engine={activeWorkspaceEngine} />
      )}
    </div>
  );
}

export const workspaceTab: TabDefinition = {
  id: "workspace",
  name: "Workspace",
  icon: LayoutDashboard,
  component: WorkspaceTab,
  enabled: (location) => !!location.workspace,
};
