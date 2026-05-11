import { Button, Tooltip } from "@ubento/workspace.primitives";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function SideSection({
  children,
  title,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  actions?: Array<{
    tooltip: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    onClick: () => void;
  }>;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col px-2 gap-0.5">
      <div
        onClick={() => setOpen((s) => !s)}
        className="h-8 text-[10px] text-neutral-content-muted hover:bg-neutral-surface-hover cursor-pointer uppercase tracking-wider flex items-center justify-between rounded-lg px-1"
      >
        <div className="px-2 flex items-center gap-1">
          {title}
          <ChevronRight
            size={14}
            style={{
              transition: "transform 0.2s",
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
            }}
          />
        </div>

        {actions?.length && (
          <div className="flex items-center gap-1">
            {actions.map((action, index) => (
              <Tooltip key={index} content={action.tooltip}>
                <Button
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                  variant="ghost"
                >
                  <action.icon size={14} />
                </Button>
              </Tooltip>
            ))}
          </div>
        )}
      </div>
      {open && children}
    </div>
  );
}
