import { PendingView } from "@ubento/bento-primitives";
import { App, PageRegistryProvider } from "@ubento/engine";

export function GuestApp() {
  if (1) {
    return <PendingView message="Stock Manager" />;
  }

  return (
    <PageRegistryProvider registry={initData.pages}>
      <App app={initData.app} />
    </PageRegistryProvider>
  );
}
