import { SideSection } from "@/app/components/side/section";
import {
  useWorkspaceEngine,
  WorkspaceEngineProvider,
} from "@/contexts/workspace";
import { useUbento, useUbentoEngine } from "@/engine/app/engine";
import { ServiceBrowserModal } from "@/modals/service_browser/services";
import { useModal } from "@/utils/modal-store";
import { ServiceData } from "@ubento/bento.core";
import { workspaceClient } from "@ubento/services.sdk";
import {
  Box,
  ChevronRight,
  FileText,
  Home,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { TabDefinition } from "../../../types";

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
        className={`group flex h-8 items-center gap-2 pr-2 rounded-lg cursor-pointer transition-all ${
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
    <SideSection
      title="Boards"
      actions={[
        {
          icon: Plus,
          tooltip: "Create Board",
          onClick: () => {},
        },
      ]}
    >
      <div className="flex flex-col gap-px">
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
    </SideSection>
  );
}

function ServicesSection() {
  const workspaceEngine = useWorkspaceEngine();
  const services = workspaceEngine.useState((s) => {
    const spec = s.workspace.spec;
    if (spec.status === "valid") {
      return spec.data.services ?? {};
    } else {
      return {};
    }
  }) as Record<string, ServiceData>;
  const serviceEntries = Object.entries(services);
  const { open } = useModal();

  return (
    <SideSection
      title="Services"
      actions={[
        {
          icon: Plus,
          tooltip: "Install Service",
          onClick: () => open(ServiceBrowserModal, { workspaceEngine }),
        },
      ]}
    >
      <div className="flex flex-col gap-px">
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
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-content hover:bg-neutral-surface-hover transition-all cursor-pointer"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-surface border border-neutral-border text-neutral-content-muted group-hover:text-accent group-hover:border-accent/30 transition-all">
                <Box size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium truncate">{id}</div>
                <div className="text-[10px] text-neutral-content-muted truncate">
                  {service.channel}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
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
    <div className="flex flex-col gap-1 pb-8">
      <div className="px-2">
        <div
          onClick={() => {
            engine.goToLocation({
              board: undefined,
              params: {},
            });
          }}
          className={`flex h-8 items-center gap-2 px-3 rounded-lg cursor-pointer transition-all ${
            !location.board
              ? "bg-accent/10 text-accent font-medium"
              : "text-neutral-content-subtle hover:bg-neutral-surface-hover hover:text-neutral-content"
          }`}
        >
          <Home
            size={14}
            className={
              !location.board ? "text-accent" : "text-neutral-content-muted"
            }
          />
          <span className="text-[13px]">Home</span>
        </div>
      </div>
      {workspace && <BoardsSection workspace={workspace} />}
      {activeWorkspaceEngine && <ServicesSection />}
    </div>
  );
}

export const workspaceTab: TabDefinition = {
  id: "workspace",
  name: "Workspace",
  icon: LayoutDashboard,
  component: () => (
    <WorkspaceEngineProvider>
      <WorkspaceTab />
    </WorkspaceEngineProvider>
  ),
  enabled: (location) => !!location.workspace,
};
