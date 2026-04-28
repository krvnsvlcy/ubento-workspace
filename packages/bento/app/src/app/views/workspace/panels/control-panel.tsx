import cx from "clsx";
import { AppWindow, LayoutDashboard, Sparkles } from "lucide-react";
import { useState } from "react";
import { WorkspaceController } from "../controller";
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
}: {
  controller: WorkspaceController;
}) {
  const [activeTab, setActiveTab] = useState<string>("context");

  let content = <></>;

  switch (activeTab) {
    case "ai":
      content = <CopilotTab controller={controller} />;
      break;
    case "board":
      content = <BoardTab controller={controller} />;
      break;
    case "workspace":
      content = <WorkspaceTab controller={controller} />;
      break;
  }

  return (
    <div className="h-full" style={{ padding: 6 }}>
      <div className="h-full flex flex-col bg-background-100 rounded-xl border">
        <div className="flex gap-2 p-4">
          {tabs.map((t) => (
            <Tab
              key={t.id}
              isActive={activeTab === t.id}
              onClick={() => setActiveTab(t.id)}
              icon={t.icon}
            />
          ))}
        </div>
        <hr />
        <div className="grow overflow-hidden">{content}</div>
      </div>
    </div>
  );
}
