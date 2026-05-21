import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { ActionProps } from "../action/action";
import { TreeEntry } from "../tree/tree-entry";

export function SideSection({
  children,
  title,
  actionMode,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  actionMode?: "hidden" | "visible" | "hover";
  actions?: ActionProps[];
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col px-2 gap-0.5">
      <TreeEntry
        onClick={() => setOpen((s) => !s)}
        className="text-[11px] uppercase tracking-wider"
        actionMode={actionMode}
        actions={actions}
      >
        <div className="flex items-center gap-1">
          {title}
          <ChevronRight
            size={14}
            style={{
              position: "relative",
              top: -1,
              transition: "transform 0.2s",
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
            }}
            strokeWidth={1.5}
          />
        </div>
      </TreeEntry>
      {open && children}
    </div>
  );
}
