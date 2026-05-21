import * as React from "react";
import { useEnvironment } from "../states/environment.js";

export function OverlayRenderer() {
  const environment = useEnvironment();
  const overlays = environment.overlayManager.useState((s) => s.overlays);

  if (overlays.length === 0) return null;

  return (
    <div
      id="bento-overlay-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 10000,
      }}
    >
      {overlays.map((overlay) => (
        <OverlayItem key={overlay.id} overlay={overlay} />
      ))}
    </div>
  );
}

function OverlayItem({ overlay }: { overlay: any }) {
  const environment = useEnvironment();
  const Component = environment.componentStore.useState(
    (s) => s.components[overlay.component],
  );

  const style: React.CSSProperties = {
    position: "absolute",
    pointerEvents: "auto",
    zIndex: overlay.zIndex || 1000,
  };

  if (overlay.type === "modal") {
    style.position = "fixed";
    style.top = "50%";
    style.left = "50%";
    style.transform = "translate(-50%, -50%)";
  } else if (overlay.type === "popover" && overlay.anchorRect) {
    // Basic positioning logic - can be refined with libraries like Floating UI later
    style.top = `${overlay.anchorRect.bottom + 8}px`;
    style.left = `${overlay.anchorRect.left}px`;
  }

  if (!Component) return null;

  return (
    <div style={style}>
      <Component.render ref={() => {}} props={overlay.inputs} emit={() => {}} />
    </div>
  );
}
