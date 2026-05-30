import { Icon } from "@/components/icon/icon";
import { useActiveWorkspaceId, useUbentoEngine } from "@/hooks/app-engine";
import { useUserWorkspaceSettings } from "@/hooks/settings/workspace";
import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import { Button, ScrollArea, useStoreState } from "@ubento/bento.arlo-core";
import clsx from "clsx";
import { Box } from "lucide-react";
import { useEffect, useMemo } from "react";
import { TeamSideLayout } from "../team/team-layout";
import { TabDefinition } from "../types";
import { assetsTab } from "./tabs/assets/assets-tab";
import { homeTab } from "./tabs/home/home";
import { workspaceTab } from "./tabs/workspace/workspace";
import { WorkspaceTabDefinition } from "./types";

const tabs: WorkspaceTabDefinition[] = [homeTab, workspaceTab, assetsTab];

function TabButton({
  tab,
  isActive,
  onClick,
}: {
  tab: TabDefinition;
  isActive: boolean;
  onClick: () => void;
}) {
  const icon = tab.icon;

  return (
    <Button
      size="icon"
      onClick={onClick}
      className={clsx("transition-opacity", {
        "opacity-50 hover:opacity-70": !isActive,
      })}
      variant={isActive ? "secondary" : "ghost"}
    >
      <Icon icon={icon} size={16} />
    </Button>
  );
}

export function WorkspaceSide() {
  const engine = useUbentoEngine();
  const { push } = useAppModal();
  const location = engine.useState((s) => s.location);
  const workspace = engine.useState((s) => s.workspace);
  const workspaceMode = useStoreState(workspace?.store, (s) => s.mode);

  const workspaceId = useActiveWorkspaceId();
  const { data: workspaceData } = engine.ubento.workspace.useWorkspace(
    workspaceId || "",
    { enabled: !!workspaceId },
  );

  const {
    data: userSettings,
    update: updateSettings,
    isLoaded,
  } = useUserWorkspaceSettings(workspaceId || "");
  const activeTabId = userSettings.activeTab;

  const enabledTabs = useMemo(() => {
    return tabs.filter(
      (tab) => tab.enabled?.({ location, workspaceMode }) ?? true,
    );
  }, [location, workspaceMode]);

  useEffect(() => {
    if (
      isLoaded &&
      workspaceId &&
      !enabledTabs.find((t) => t.id === activeTabId)
    ) {
      updateSettings({
        activeTab: (enabledTabs[0]?.id || tabs[0].id) as any,
      });
    }
  }, [enabledTabs, activeTabId, workspaceId, updateSettings, isLoaded]);

  const activeTab = useMemo(() => {
    return enabledTabs.find((t) => t.id === activeTabId) || enabledTabs[0];
  }, [enabledTabs, activeTabId]);

  const ActiveComponent = activeTab?.component;

  return (
    <TeamSideLayout
      icon={<Box size={14} />}
      title={workspaceData?.name || ""}
      onTitleClick={() => push(appModalRoutes.workspace.general)}
    >
      <div className="h-full w-full flex flex-col gap-4">
        <div className="flex gap-1 px-3 shrink-0">
          {enabledTabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTabId === tab.id}
              onClick={() =>
                updateSettings({
                  activeTab: tab.id as any,
                })
              }
            />
          ))}
        </div>
        <div className="grow overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="px-3 space-y-4">
              {ActiveComponent ? <ActiveComponent key={activeTabId} /> : null}
            </div>
          </ScrollArea>
        </div>
      </div>
    </TeamSideLayout>
  );
}
