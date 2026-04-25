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

    return () => bridge.dispose();
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
