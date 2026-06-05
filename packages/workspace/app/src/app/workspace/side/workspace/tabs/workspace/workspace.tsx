import { TabDefinition } from "../../../types";

import { BoardsSection } from "./boards-section";
import { ServicesSection } from "./services-section";

export function WorkspaceTab() {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <BoardsSection />
      <ServicesSection />
    </div>
  );
}

export const workspaceTab: TabDefinition = {
  id: "workspace",
  name: "Workspace",
  icon: "layout-grid",
  component: WorkspaceTab,
  enabled: ({ location }) => location.view === "workspace",
};
