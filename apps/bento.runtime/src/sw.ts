import type {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
} from "@ubento/bento.runtime";
import type { DuplexRpc } from "@ubento/rpc";

export async function runServiceWorker({
  swUrl = "/sw.js",
  registryModuleUrlTemplate,
  rpc,
}: {
  swUrl?: string;
  registryModuleUrlTemplate: string;
  rpc: DuplexRpc<BentoEngineRuntimeRpcInterface, BentoEngineHostRpcInterface>;
}): Promise<void> {
  if (!("serviceWorker" in navigator)) {
    console.error("Service Workers are not supported in this browser.");
    return;
  }

  try {
    // 1. Register the Service Worker
    // Restricting the scope ensures it only intercepts module fetches, not all iframe traffic
    const registration = await navigator.serviceWorker.register(swUrl, {
      scope: "/",
    });

    console.log(
      "Ubento Module Service Worker registered successfully.",
      registration.scope,
    );

    // 2. Listen for direct requests from the active Service Worker
    navigator.serviceWorker.addEventListener("message", async (event) => {
      if (event.data && event.data.type === "REQUEST_TOKEN") {
        // The SW sent a MessageChannel port for us to reply through
        const replyPort = event.ports[0];

        if (!replyPort) {
          console.error(
            "Service Worker requested a token but did not provide a MessageChannel port.",
          );
          return;
        }

        try {
          // Pause and ask the Main Thread for a fresh token via RPC
          const token = await rpc.egress.getModuleRegistryAccessToken({});

          // Send the moduleUrlTemplate + authorization header back down the private pipe to the waiting SW
          replyPort.postMessage({
            registryModuleUrlTemplate,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error(
            "Failed to retrieve token from Main Thread via RPC:",
            error,
          );
          // Send a null/empty response so the SW knows to fail gracefully rather than hanging forever
          replyPort.postMessage({ moduleUrlTemplate: "", headers: {} });
        }
      }
    });
  } catch (error) {
    console.error("Ubento Module Service Worker registration failed:", error);
  }

  await navigator.serviceWorker.ready;
  console.log("Module Service Worker ready!");
}
