import { useCopilot } from "@/contexts/copilot";
import { useUbentoEngine } from "@/hooks/app-engine";
import { Button } from "@ubento/bento.arlo-core";
import { History, Plus, Sidebar, X } from "lucide-react";
import { useState } from "react";
import { WorkspaceEngine } from "../../../../../../engine/workspace/engine";
import { CopilotTab } from "./tabs/copilot/copilot";
import { HistoryTab } from "./tabs/copilot/history";

export function ControlPanel({
  controller,
  onClose,
}: {
  controller: WorkspaceEngine;
  onClose: () => void;
}) {
  const copilot = useCopilot();
  const appEngine = useUbentoEngine();
  const rightPanelPinned = appEngine.useState((s) => s.rightPanelPinned);
  const [activeTab, setActiveTab] = useState<string>("ai");
  const mode = controller.userSetting.useState((s) => s.data.mode);

  let content = <></>;
  let actions: Array<{
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
  }> = [
    {
      icon: <Plus size={16} />,
      label: "New Conversation",
      onClick: () => {
        copilot.clearActiveThread();
        setActiveTab("ai");
      },
    },
    {
      icon: <History size={16} />,
      label: "History",
      onClick: () => {
        setActiveTab("ai-history");
      },
    },
  ];

  switch (activeTab) {
    case "ai":
      content = <CopilotTab />;
      break;
    case "ai-history":
      content = <HistoryTab onBack={() => setActiveTab("ai")} />;
      break;
  }

  return (
    <div
      className="h-full flex flex-col"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-between items-center p-3">
        <div className="flex gap-2">
          {actions.map((a) => (
            <Button
              key={a.label}
              size="icon"
              shape="circle"
              onClick={a.onClick}
              variant="ghost"
              title={a.label}
            >
              {a.icon}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant={rightPanelPinned ? "ghost" : "ghost"}
            size="icon"
            shape="circle"
            onClick={() => {
              appEngine.setState((s) => ({
                ...s,
                rightPanelPinned: !s.rightPanelPinned,
              }));
            }}
            title={
              rightPanelPinned
                ? "Float control panel"
                : "Pin control panel to right side"
            }
          >
            <Sidebar size={16} />
          </Button>
          <Button variant="ghost" size="icon" shape="circle" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
      </div>
      <div className="grow overflow-hidden">{content}</div>
    </div>
  );
}
