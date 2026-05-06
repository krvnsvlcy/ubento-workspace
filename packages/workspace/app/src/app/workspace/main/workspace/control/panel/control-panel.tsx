import { Button } from "@ubento/workspace.primitives";
import cx from "clsx";
import {
  AppWindow,
  Eye,
  LayoutDashboard,
  Pencil,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { WorkspaceEngine } from "../../engine/engine";
import { BoardTab } from "./tabs/board";
import { CopilotTab } from "./tabs/copilot/copilot";
import { WorkspaceTab } from "./tabs/workspace";

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
        "h-7 w-7 text-foreground-400 flex items-center justify-center rounded-md font-bold transition-all",
        {
          "bg-foreground/10 text-foreground-500": isActive,
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
  const [activeTab, setActiveTab] = useState<string>("ai");
  const mode = controller.useState((s) => s.mode);

  let content = <></>;

  switch (activeTab) {
    case "ai":
      content = <CopilotTab />;
      break;
    case "board":
      content = <BoardTab controller={controller} />;
      break;
    case "workspace":
      content = <WorkspaceTab controller={controller} />;
      break;
  }

  return (
    <div
      className="h-full flex flex-col"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-2">
          {tabs.map((t) => (
            <Tab
              key={t.id}
              isActive={activeTab === t.id}
              onClick={() => setActiveTab(t.id)}
              icon={t.icon}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              controller.setMode(mode === "edit" ? "live" : "edit")
            }
          >
            {mode === "edit" ? <Eye size={16} /> : <Pencil size={16} />}
          </Button>
          <Button size="icon" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
      </div>
      <hr />
      <div className="grow overflow-hidden">{content}</div>
    </div>
  );
}
