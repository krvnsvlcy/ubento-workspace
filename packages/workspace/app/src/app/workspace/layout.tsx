import { useState } from "react";
import { useUbentoEngine } from "@/hooks/app-engine";
import { Main } from "./main/main";
import { SideSplitView } from "./main/workspace/components/split-view";
import { Side } from "./side/side";

export function Layout() {
  const ubento = useUbentoEngine();
  const leftPanelPinned = ubento.useState((s) => s.leftPanelPinned);
  const leftPanelWidth = ubento.useState((s) => s.leftPanelWidth);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-background relative z-0 select-none"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Floating Left Panel */}
      {!leftPanelPinned && (
        <div
          className="fixed top-0 left-0 bottom-0 z-[100] transition-all duration-300 ease-in-out bg-neutral-surface/60 backdrop-blur-xl border-r border-neutral-border"
          style={{
            width: leftPanelWidth,
            transform: isHovered ? "translateX(0)" : "translateX(-100%)",
            // boxShadow: isHovered ? "12px 0 40px rgba(0,0,0,0.15)" : "none",
            pointerEvents: isHovered ? "auto" : "none",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Side />
        </div>
      )}
      {/* Hover Trigger Area at the left edge */}
      {!leftPanelPinned && !isHovered && (
        <div
          className="fixed top-0 left-0 bottom-0 w-4 z-[90]"
          onMouseEnter={() => setIsHovered(true)}
        />
      )}
      <SideSplitView
        left={{
          content: leftPanelPinned ? (
            <div className="h-full">
              <Side />
            </div>
          ) : null,
          size: leftPanelPinned ? leftPanelWidth : 0,
          onSizeChange: (size) => {
            ubento.setState((state) => ({ ...state, leftPanelWidth: size }));
          },
          minSize: 240,
          maxSize: 600,
        }}
        gap={0}
      >
        <Main />
      </SideSplitView>
    </div>
  );
}
