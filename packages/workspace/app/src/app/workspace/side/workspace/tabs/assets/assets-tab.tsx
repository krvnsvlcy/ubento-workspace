import { WorkspaceTabDefinition } from "../../types";
import { ModulesSection } from "./modules-section";
import { PackagesSection } from "./packages-section";

export function AssetsTab() {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <ModulesSection />
      <PackagesSection />
    </div>
  );
}

export const assetsTab: WorkspaceTabDefinition = {
  id: "assets",
  name: "Assets",
  icon: "assets",
  component: AssetsTab,
  enabled: ({ workspaceMode }) => workspaceMode === "edit",
};
