import { useBentoHost } from "@/contexts/host";
import { IconButton } from "@ubento/bento-primitives";
import { Home, LayoutDashboard } from "lucide-react";
import { useStore } from "zustand";
import { WorkspaceController } from "../controller.js";

export function WorkspaceNavigation({
  controller,
}: {
  controller: WorkspaceController;
}) {
  const host = useBentoHost();
  const snap = useStore(controller);

  return (
    <div className="relative z-[200] w-full p-1.5">
      <div
        className={`mx-auto flex h-14 w-full items-center justify-between px-4 transition-all rounded-2xl bg-background-100/70`}
        style={{
          background: "var(--page-background)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <IconButton
              onClick={() => host.goToLocation({ view: "home", params: {} })}
              icon={<Home className="h-4 w-4" />}
            />
            <IconButton
              onClick={() => host.goToLocation({ view: "home", params: {} })}
              icon={<LayoutDashboard className="h-4 w-4" />}
            />
          </div>
          <div className="flex items-center gap-3">{snap.workspace?.name}</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-foreground/10" />
        </div>
      </div>
    </div>
  );
}
