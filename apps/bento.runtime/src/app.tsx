import { PendingView } from "@ubento/bento-primitives";
import {
  App,
  createApp,
  PageRegistryProvider,
  type AppData,
  type GuestRpcInterface,
  type HostRpcInterface,
} from "@ubento/engine";
import { createDuplexRpc, createWindowPort } from "@ubento/rpc-utils";
import { useEffect, useState } from "react";

export function GuestApp() {
  const [app, setApp] = useState<AppData | null>(null);

  useEffect(() => {
    const port = createWindowPort(window, window.parent);
    const rpc = createDuplexRpc<GuestRpcInterface, HostRpcInterface>({
      port,
      handlers: {
        init: (data) => {
          console.log("[Runtime] Received 'init'", data);
          setApp(createApp(data));
        },
      },
    });
    rpc.run();

    console.log("[Runtime] Sending 'ready'...");
    rpc.egress.ready({});

    let lastShiftPress = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        const now = Date.now();
        if (now - lastShiftPress < 300) {
          rpc.egress.toggleMode({});
          lastShiftPress = 0;
        } else {
          lastShiftPress = now;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      rpc.dispose();
    };
  }, []);

  if (!app) {
    return <PendingView message="Loading Application..." />;
  }

  return (
    <PageRegistryProvider registry={{}}>
      <App app={app} />
    </PageRegistryProvider>
  );
}
