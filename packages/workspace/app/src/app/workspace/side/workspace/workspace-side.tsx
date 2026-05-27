import { Icon } from "@/components/icon/icon";
import { Button, useStoreState } from "@ubento/bento.arlo-core";
import clsx from "clsx";
import { useEffect, useMemo } from "react";
import { useUbentoEngine } from "../../../../engine/app/engine";
import { TabDefinition } from "../types";
import { WorkspaceFooter } from "./footer";
import { WorkspaceHeader } from "./header";
import { homeTab } from "./tabs/home/home";
import { workspaceTab } from "./tabs/workspace/workspace";
import { WorkspaceTabDefinition } from "./types";

const tabs: WorkspaceTabDefinition[] = [homeTab, workspaceTab];

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
  const location = engine.useState((s) => s.location);
  const workspace = engine.useState((s) => s.workspace);
  const workspaceMode = useStoreState(workspace?.store, (s) => s.mode);
  const activeTabId = location.workspaceTab || tabs[0].id;

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
    <div className="h-full w-full flex flex-col p-3 gap-3">
      <WorkspaceHeader />
      {enabledTabs.length > 1 && (
        <div className="flex gap-1">
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
      )}
      <div className="flex-1 overflow-auto">
        {ActiveComponent ? <ActiveComponent key={activeTabId} /> : null}
      </div>
      <WorkspaceFooter />
    </div>
  );
}
