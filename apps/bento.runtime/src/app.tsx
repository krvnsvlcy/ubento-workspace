import { PendingView } from "@ubento/bento-primitives";
import { App, PageRegistryProvider, Bridge, PostMessageChannel } from "@ubento/engine";
import { useEffect, useState } from "react";

export function GuestApp() {
  const [initData, setInitData] = useState<any>(null);

  useEffect(() => {
    const bridge = new Bridge(new PostMessageChannel(window.parent));
    
    bridge.on("init", (data) => {
      setInitData(data);
    });

    let lastShiftPress = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        const now = Date.now();
        if (now - lastShiftPress < 300) {
          bridge.send("toggle-mode", {});
          lastShiftPress = 0;
        } else {
          lastShiftPress = now;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      bridge.dispose();
    };
  }, []);

  if (!initData) {
    return <PendingView message="Loading Application..." />;
  }

  return (
    <PageRegistryProvider registry={initData.pages}>
      <App app={initData.app} />
    </PageRegistryProvider>
  );
}
