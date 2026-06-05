import { useUbentoEngine } from "@/hooks/app-engine";
import { useState } from "react";
import { Main } from "./main/main";
import { SideSplitView } from "./main/workspace/components/split-view";
import { Side } from "./side/side";

export function Layout() {
  const engine = useUbentoEngine();
  const updateSettings = engine.userSetting.update;
  const sidePanelPinned = engine.userSetting.useState(
    (s) => s.data.sidePanelPinned,
  );
  const sidePanelWidth = engine.userSetting.useState(
    (s) => s.data.sidePanelWidth,
  );
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-tone="neutral"
      className="bg-surface relative z-0 select-none"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Floating Left Panel */}
      {!sidePanelPinned && (
        <div
          className="fixed top-0 left-0 bottom-0 z-[100] transition-all duration-300 ease-in-out bg-background"
          style={{
            width: sidePanelWidth,
            transform: isHovered ? "translateX(0)" : "translateX(-100%)",
            pointerEvents: isHovered ? "auto" : "none",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-surface border-r h-full w-full">
            <Side />
          </div>
        </div>
      )}
      {/* Hover Trigger Area at the left edge */}
      {!sidePanelPinned && !isHovered && (
        <div
          className="fixed top-0 left-0 bottom-0 w-4 z-[90]"
          onMouseEnter={() => setIsHovered(true)}
        />
      )}
      <SideSplitView
        left={{
          content: sidePanelPinned ? (
            <div className="h-full border-r">
              <Side />
            </div>
          ) : null,
          size: sidePanelPinned ? sidePanelWidth : 0,
          onSizeChange: (size) => {
            updateSettings({ sidePanelWidth: size });
          },
          minSize: 240,
          maxSize: 600,
        }}
        gap={0}
      >
        <div
          className="bg-background"
          style={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            // borderTopLeftRadius: sidePanelPinned ? "12px" : "0px",
            // borderBottomLeftRadius: sidePanelPinned ? "12px" : "0px",
            // boxShadow:
            //   "-1px 0 1px 0 color-mix(in srgb, currentcolor 10%, transparent)",
          }}
        >
          <Main />
        </div>
      </SideSplitView>
    </div>
  );
}
