import { Icon } from "@/components/icon/icon";
import { PrimitiveButton as Button } from "@ubento/bento.arlo-core";
import clsx from "clsx";
import { useEffect, useMemo } from "react";
import { useUbentoEngine } from "../../../../engine/app/engine";
import { TabDefinition } from "../types";
import { WorkspaceHeader } from "./header";
import { WorkspaceFooter } from "./footer";
import { homeTab } from "./tabs/home/home";
import { workspaceTab } from "./tabs/workspace/workspace";

const tabs: TabDefinition[] = [homeTab, workspaceTab];

function TabButton({
  tab,
  isActive,
  location,
  onClick,
}: {
  tab: TabDefinition;
  isActive: boolean;
  location: any;
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
    >
      <Icon icon={icon} size={16} />
    </Button>
  );
}

export function WorkspaceSide() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);
  const activeTabId = location.workspaceTab || tabs[0].id;

  const enabledTabs = useMemo(() => {
    return tabs.filter((tab) => tab.enabled(location));
  }, [location]);

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
    <div className="h-full w-full flex flex-col py-3 gap-3">
      <WorkspaceHeader />
      {enabledTabs.length > 1 && (
        <div className="flex px-3 gap-1">
          {enabledTabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTabId === tab.id}
              location={location}
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
