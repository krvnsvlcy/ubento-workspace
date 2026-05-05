import { useUbentoEngine } from "../../engine/engine";
import { Main } from "./main/main";
import { SideSplitView } from "./main/workspace/components/split-view";
import { Side } from "./side/side";

export function Layout() {
  const ubento = useUbentoEngine();
  const leftPanelOpen = ubento.useState((s) => s.leftPanelOpen);
  const leftPanelWidth = ubento.useState((s) => s.leftPanelWidth);

  return (
    <div
      className="bg-background relative z-0"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <SideSplitView
        left={{
          content: leftPanelOpen ? <Side /> : null,
          size: leftPanelOpen ? leftPanelWidth : 0,
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
