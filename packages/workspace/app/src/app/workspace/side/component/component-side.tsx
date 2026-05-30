import { Icon } from "@/components/icon/icon";
import { useEffect, useMemo } from "react";
import { useUbentoEngine } from "@/hooks/app-engine";
import { TabDefinition } from "../types";
import { ComponentHeader } from "./header";
import { componentAiTab } from "./tabs/component/ai-tab";
import { componentDetailsTab } from "./tabs/component/details-tab";

const tabs: TabDefinition[] = [componentAiTab, componentDetailsTab];

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
  const name = typeof tab.name === "function" ? tab.name(location) : tab.name;

  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
        isActive
          ? "bg-surface shadow-sm text-base"
          : "text-content-muted hover:bg-surface-hover"
      }`}
    >
      <Icon icon={tab.icon} size={12} className="mr-1.5" />
      {name}
    </button>
  );
}

export function ComponentSide() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);
  const activeTabId = location.componentTab || tabs[0].id;

  const enabledTabs = useMemo(() => {
    return tabs.filter((tab) => tab.enabled?.({ location }) ?? true);
  }, [location]);

  useEffect(() => {
    if (!enabledTabs.find((t) => t.id === activeTabId)) {
      engine.setState((s) => ({
        ...s,
        location: {
          ...s.location,
          componentTab: enabledTabs[0]?.id || tabs[0].id,
        },
      }));
    }
  }, [enabledTabs, activeTabId, engine]);

  const activeTab = useMemo(() => {
    return enabledTabs.find((t) => t.id === activeTabId) || enabledTabs[0];
  }, [enabledTabs, activeTabId]);

  const ActiveComponent = activeTab?.component;

  return (
    <>
      <ComponentHeader />
      {enabledTabs.length > 1 && (
        <div className="flex p-1.5 gap-1 border-b border-border bg-surface/30">
          {enabledTabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTabId === tab.id}
              location={location}
              onClick={() =>
                engine.setState((s) => ({
                  ...s,
                  location: { ...s.location, componentTab: tab.id },
                }))
              }
            />
          ))}
        </div>
      )}
      <div className="flex-1 overflow-auto p-2">
        {ActiveComponent ? <ActiveComponent key={activeTabId} /> : null}
      </div>
    </>
  );
}
