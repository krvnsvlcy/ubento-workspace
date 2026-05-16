import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import {
  useWorkspaceEngine,
  WorkspaceEngineProvider,
} from "@/contexts/workspace";
import { useUbento, useUbentoEngine } from "@/engine/app/engine";
import { ServiceBrowserModal } from "@/modals/service_browser/services";
import { useModal } from "@/utils/modal-store";
import { ServiceData } from "@ubento/bento.core";
import { workspaceClient } from "@ubento/services.sdk";

import { TabDefinition } from "../../../types";

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
          handler: () => {},
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
          <TreeEntry
            key={board.id}
            icon="board"
            active={location.board === board.id}
            onClick={() => {
              engine.goToLocation({
                board: board.id,
                params: {},
              });
            }}
            actions={[
              {
                icon: "edit",
                title: "Rename",
                handler: async () => {
                  const newName = window.prompt(
                    "Enter new board name:",
                    board.name,
                  );
                  if (newName && newName !== board.name) {
                    await workspaceEngine.updateBoard({
                      boardId: board.id,
                      update: { title: newName },
                    });
                  }
                },
              },
              {
                icon: "trash",
                title: "Delete",
                handler: async () => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete board "${board.name}"?`,
                    )
                  ) {
                    await workspaceEngine.deleteBoard({ boardId: board.id });
                  }
                },
              },
            ]}
          >
            {board.name}
          </TreeEntry>
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
  const { open } = useModal();

  return (
    <SideSection
      title="Services"
      actions={[
        {
          icon: "plus",
          title: "Install Service",
          handler: () => open(ServiceBrowserModal, { workspaceEngine }),
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
              open(ServiceBrowserModal, {
                workspaceEngine,
                initialSelectedServiceId: service.id,
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
