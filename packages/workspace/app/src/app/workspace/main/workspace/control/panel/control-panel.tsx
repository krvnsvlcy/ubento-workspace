import { useCopilot } from "@/contexts/copilot";
import { Button } from "@ubento/workspace.primitives";
import cx from "clsx";
import {
  AppWindow,
  History,
  LayoutDashboard,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { WorkspaceEngine } from "../../../../../../engine/workspace/engine";
import { CopilotTab } from "./tabs/copilot/copilot";
import { HistoryTab } from "./tabs/copilot/history";

const tabs = [
  {
    id: "ai",
    icon: <Sparkles size={14} />,
  },
  {
    id: "board",
    icon: <LayoutDashboard size={14} />,
  },
  {
    id: "workspace",
    icon: <AppWindow size={14} />,
  },
];

function Tab({
  isActive,
  onClick,
  icon,
}: {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "h-7 w-7 flex items-center justify-center rounded-md font-bold transition-all cursor-pointer",
        {
          "text-accent": isActive,
          "text-neutral-content-muted": !isActive,
        },
      )}
    >
      {icon}
    </button>
  );
}

export function ControlPanel({
  controller,
  onClose,
}: {
  controller: WorkspaceEngine;
  onClose: () => void;
}) {
  const copilot = useCopilot();
  const [activeTab, setActiveTab] = useState<string>("ai");

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
      actions = [
        {
          icon: <Plus size={16} />,
          label: "New Conversation",
          onClick: () => {
            copilot.clearActiveThread();
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
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-2">
          {actions.map((a) => (
            <Button
              key={a.label}
              size="icon"
              shape="circle"
              onClick={a.onClick}
              variant="ghost"
            >
              {a.icon}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button size="icon" shape="circle" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
      </div>
      <hr />
      <div className="grow overflow-hidden">{content}</div>
    </div>
  );
}
