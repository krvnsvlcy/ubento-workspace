import { Icon } from "@/components/icon/icon";
import {
  useWorkspaceEngine,
  WorkspaceEngineProvider,
} from "@/contexts/workspace";
import { useActiveWorkspaceId, useUbentoEngine } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import { workspaceColorMap } from "@/utils/colors.js";
import {
  Button,
  ErrorView,
  ScrollArea,
  Skeleton,
} from "@ubento/bento.arlo-core";
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
      <Icon icon={icon as any} size={16} />
    </Button>
  );
}

function WorkspaceSideContent() {
  const appEngine = useUbentoEngine();
  const workspaceEngine = useWorkspaceEngine();
  const { push } = useAppModal();
  const location = appEngine.useState((s) => s.location);
  const workspaceMode = workspaceEngine.userSetting.useState(
    (s) => s.data.mode,
  );
  const activeTabId = workspaceEngine.userSetting.useState(
    (s) => s.data.activeTab,
  );

  const workspaceId = useActiveWorkspaceId();
  const { data: workspaceData, isLoading } =
    appEngine.ubento.workspace.useWorkspace(workspaceId || "", {
      enabled: !!workspaceId,
    });

  const enabledTabs = useMemo(() => {
    return tabs.filter(
      (tab) => tab.enabled?.({ location, workspaceMode }) ?? true,
    );
  }, [location, workspaceMode]);

  useEffect(() => {
    if (workspaceId && !enabledTabs.find((t) => t.id === activeTabId)) {
      workspaceEngine.userSetting.update({
        activeTab: (enabledTabs[0]?.id || tabs[0].id) as any,
      });
    }
  }, [enabledTabs, activeTabId, workspaceId, workspaceEngine]);

  const activeTab = useMemo(() => {
    return enabledTabs.find((t) => t.id === activeTabId) || enabledTabs[0];
  }, [enabledTabs, activeTabId]);

  const ActiveComponent = activeTab?.component;

  const activeIcon = (workspaceData?.metadata?.icon || "workspace") as any;
  const accentColor = workspaceData?.metadata?.accentColor;
  const colorHex = accentColor ? workspaceColorMap[accentColor] : undefined;

  return (
    <TeamSideLayout
      icon={
        isLoading ? (
          <Skeleton className="h-4 w-4" />
        ) : (
          <Icon
            icon={activeIcon}
            size={14}
            style={colorHex ? { color: colorHex } : undefined}
          />
        )
      }
      title={
        workspaceData?.title ||
        (isLoading ? <Skeleton className="h-4 w-20" /> : "Untitled")
      }
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
                workspaceEngine.userSetting.update({
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

function PendingWorkspaceView() {
  return (
    <TeamSideLayout
      icon={<Skeleton className="h-4 w-4" />}
      title={<Skeleton className="h-4 w-20 rounded-sm" />}
      onTitleClick={() => {}}
    >
      <div className="h-full w-full flex flex-col gap-4">
        <div className="grow overflow-hidden px-3 space-y-4">
          <Skeleton className="h-8 w-[60%] rounded-md" />
          <Skeleton className="h-8 w-[80%] rounded-md" />
          <Skeleton className="h-8 w-[40%] rounded-md" />
        </div>
      </div>
    </TeamSideLayout>
  );
}

function ErrorWorkspaceView({
  message,
  action,
}: {
  message: string;
  action: { label: string; onClick: () => void };
}) {
  return (
    <TeamSideLayout
      icon={<Box size={14} className="text-destructive" />}
      title="Error"
      onTitleClick={() => {}}
    >
      <div className="h-full w-full flex flex-col p-3">
        <ErrorView message={message} action={action} />
      </div>
    </TeamSideLayout>
  );
}

export function WorkspaceSide() {
  const appEngine = useUbentoEngine();

  return (
    <WorkspaceEngineProvider
      loadingFallback={<PendingWorkspaceView />}
      errorFallback={
        <ErrorWorkspaceView
          message="Failed to load workspace"
          action={{
            label: "Retry",
            onClick: () => appEngine.reloadWorkspace(),
          }}
        />
      }
    >
      <WorkspaceSideContent />
    </WorkspaceEngineProvider>
  );
}
