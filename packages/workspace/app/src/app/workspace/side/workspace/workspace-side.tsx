import { Icon } from "@/components/icon/icon";
import { useUbentoEngine } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import { Button, ScrollArea, useStoreState } from "@ubento/bento.arlo-core";
import clsx from "clsx";
import { Box } from "lucide-react";
import { useEffect, useMemo } from "react";
import { TeamSideLayout } from "../team/team-layout";
import { TabDefinition } from "../types";
import { homeTab } from "./tabs/home/home";
import { workspaceTab } from "./tabs/workspace/workspace";
import { assetsTab } from "./tabs/assets/assets-tab";
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
  const activeTabId = location.workspaceTab || tabs[0].id;

  const slug = location.workspace;
  const { data: workspaceData } = engine.ubento.workspace.useWorkspaceBySlug(
    { slug: slug! },
    { enabled: !!slug },
  );

  const enabledTabs = useMemo(() => {
    return tabs.filter(
      (tab) => tab.enabled?.({ location, workspaceMode }) ?? true,
    );
  }, [location, workspaceMode]);

  useEffect(() => {
    if (!enabledTabs.find((t) => t.id === activeTabId)) {
      engine.setState((s) => ({
        ...s,
        location: {
          ...s.location,
          workspaceTab: enabledTabs[0]?.id || tabs[0].id,
        },
      }));
    }
  }, [enabledTabs, activeTabId, engine]);

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
                engine.setState((s) => ({
                  ...s,
                  location: { ...s.location, workspaceTab: tab.id },
                }))
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
