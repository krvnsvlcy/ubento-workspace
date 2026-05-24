import { useWorkspaceEngine } from "@/contexts/workspace.js";
import { useUbentoEngine } from "@/engine/app/engine.js";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { ControlPanel } from "./panel/control-panel.js";

const style = `
@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.appear {
  opacity: 0;
  animation: appear 200ms ease-in-out;
  animation-delay: 200ms;
  animation-fill-mode: forwards;
}
`;

export function WorkspaceControl() {
  const appEngine = useUbentoEngine();
  const workspaceEngine = useWorkspaceEngine();
  const showControls = appEngine.useState((s) => s.showControls);
  const rightPanelPinned = appEngine.useState((s) => s.rightPanelPinned);
  const setShowControls = (show: boolean) => appEngine.setShowControls(show);

  if (rightPanelPinned && showControls) {
    return null;
  }

  return (
    <div className="absolute bottom-8 right-8 z-50">
      <style>{style}</style>
      <motion.div
        layout
        className="bg-background shadow-2xl overflow-hidden border border-border"
        style={{
          borderRadius: showControls ? 20 : 32,
          width: showControls ? 400 : 48,
          height: showControls ? 600 : 48,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      >
        {showControls ? (
          <div
            key="panel"
            className="w-full h-full"
            style={{
              opacity: showControls ? 1 : 0,
            }}
          >
            <ControlPanel
              controller={workspaceEngine}
              onClose={() => setShowControls(false)}
            />
          </div>
        ) : (
          <button
            key="button"
            onClick={() => setShowControls(true)}
            className="appear h-12 w-12 flex items-center justify-center cursor-pointer"
          >
            <Sparkles size={20} />
          </button>
        )}
      </motion.div>
    </div>
  );
}
