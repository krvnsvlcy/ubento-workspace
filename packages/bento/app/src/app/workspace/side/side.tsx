import { useEffect, useMemo } from "react";
import { useUbentoEngine } from "../../../engine/engine";
import { SideHeader } from "./header";
import { homeTab } from "./tabs/home/home-tab";
import { workspaceTab } from "./tabs/workspace/workspace-tab";
import { TabDefinition } from "./types";

const allTabs: TabDefinition[] = [homeTab, workspaceTab];

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
  const Icon = tab.icon;
  const name = typeof tab.name === "function" ? tab.name(location) : tab.name;

  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
        isActive
          ? "bg-neutral-surface shadow-sm text-accent"
          : "text-neutral-content-muted hover:bg-neutral-surface-hover"
      }`}
    >
      <Icon size={12} className="mr-1.5" />
      {name}
    </button>
  );
}

export function Side() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);
  const activeTabId = location.tab || "home";

  const enabledTabs = useMemo(() => {
    return allTabs.filter((tab) => tab.enabled(location));
  }, [location]);

  // If active tab becomes disabled, switch to the first enabled tab
  useEffect(() => {
    if (!enabledTabs.find((t) => t.id === activeTabId)) {
      engine.setState((s) => ({
        ...s,
        location: {
          ...s.location,
          tab: enabledTabs[0]?.id || homeTab.id,
        },
      }));
    }
  }, [enabledTabs, activeTabId, engine]);

  const activeTab = useMemo(() => {
    return enabledTabs.find((t) => t.id === activeTabId) || enabledTabs[0];
  }, [enabledTabs, activeTabId]);

  const ActiveComponent = activeTab?.component;

  return (
    <div className="h-full flex flex-col bg-neutral-surface border-r border-neutral-border overflow-hidden select-none">
      <SideHeader />
      {/* Tabs Header */}
      {enabledTabs.length > 1 && (
        <div className="flex p-1.5 gap-1 border-b border-neutral-border bg-neutral-surface/30">
          {enabledTabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTabId === tab.id}
              location={location}
              onClick={() =>
                engine.setState((s) => ({
                  ...s,
                  location: { ...s.location, tab: tab.id },
                }))
              }
            />
          ))}
        </div>
      )}
      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-2">
        {ActiveComponent ? <ActiveComponent key={activeTabId} /> : null}
      </div>
    </div>
  );
}
