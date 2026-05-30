import { WorkspaceEngineProvider } from "@/contexts/workspace";
import { TabDefinition } from "../../../types";
import { ComponentsSection } from "./components-section";
import { ModulesSection } from "./modules-section";
import { PackagesSection } from "./packages-section";

export function AssetsTab() {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <ComponentsSection />
      <ModulesSection />
      <PackagesSection />
    </div>
  );
}

export const assetsTab: TabDefinition = {
  id: "assets",
  name: "Assets",
  icon: "assets",
  component: () => (
    <WorkspaceEngineProvider>
      <AssetsTab />
    </WorkspaceEngineProvider>
  ),
  enabled: ({ location }) => !!location.workspace,
};
