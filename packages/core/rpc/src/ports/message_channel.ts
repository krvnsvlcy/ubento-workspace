import { RpcPort } from "./port.js";

const messageChannelInitializationMessage = (name: string) =>
  `MESSAGE_CHANNEL_INIT:${name}`;
const messageChannelConfirmationMessage = (name: string) =>
  `MESSAGE_CHANNEL_CONFIRM:${name}`;

export function createMessageChannelHostPort({
  name,
  channel,
  controlPort, // The 'Control Plane' (e.g., Window)
}: {
  name: string;
  channel: MessageChannel;
  controlPort: RpcPort;
}): RpcPort & {
  start: () => Promise<void>;
  close: () => void;
} {
  const localPort = channel.port1;
  const remotePort = channel.port2;

  return {
    postMessage: (message, transfer) => {
      localPort.postMessage(message, transfer || []);
    },

    onMessage: (listener) => {
      const handler = (ev: MessageEvent) => listener(ev.data, ev.ports);
      localPort.addEventListener("message", handler);
      localPort.start();
      return () => localPort.removeEventListener("message", handler);
    },

    onError: (listener) => {
      const handler = (ev: MessageEvent) => listener(ev.data);
      localPort.addEventListener("messageerror", handler);
      return () => localPort.removeEventListener("messageerror", handler);
    },

    start: async (timeoutMs = 5000) => {
      return new Promise<void>((resolve, reject) => {
        let timer: any;
        let unsubscribe: (() => void) | undefined;

        // 1. Define cleanup to prevent listener leaks
        const cleanup = () => {
          if (unsubscribe) unsubscribe();
          clearTimeout(timer);
        };

        // 2. The Handler for the ACK
        const confirmationHandler = (d: any) => {
          const data = d.data || d; // Handle both Event and Raw Data
          if (data === messageChannelConfirmationMessage(name)) {
            cleanup();
            resolve();
          }
        };

        // 3. Setup Timeout
        timer = setTimeout(() => {
          cleanup();
          reject(
            new Error(`Timeout waiting for MessageChannel ${name} to confirm`),
          );
        }, timeoutMs);

        // 4. Start Listening & Send Init
        unsubscribe = controlPort.onMessage(confirmationHandler);

        try {
          // TRANSFER the remote port. It becomes unusable locally immediately.
          controlPort.postMessage(messageChannelInitializationMessage(name), [
            remotePort,
          ]);
        } catch (err) {
          cleanup();
          reject(err);
        }
      });
    },

    close: async () => {
      localPort.close();
      // Note: remotePort cannot be closed here as it was transferred (neutered).
      // The receiver is responsible for closing their end.
    },
  };
}

export function createMessageChannelClientPort(
  controlPort: RpcPort,
): RpcPort & {
  close: () => void;
} {
  // Note: Client doesn't need 'start' lifecycle exposed, it just reacts
  let remotePort: MessagePort | null = null;
  const pendingMessages: Array<{ message: any; transfer?: Transferable[] }> =
    [];
  const messageListeners = new Set<(ev: MessageEvent) => void>();
  const errorListeners = new Set<(ev: MessageEvent) => void>();

  let controlPortUnsubscribe: (() => void) | undefined;

  // This handle is what actually processes the Handshake
  const handshakeListener = (data: any, ports: readonly MessagePort[]) => {
    if (typeof data === "string" && data.startsWith("MESSAGE_CHANNEL_INIT:")) {
      const name = data.split(":")[1];
      const transferredPort = ports[0];

      if (transferredPort) {
        // 1. Send ACK immediately (Critical for Host to unblock)
        controlPort.postMessage(`MESSAGE_CHANNEL_CONFIRM:${name}`);

        // 2. Switch to High-Perf Mode
        remotePort = transferredPort;
        remotePort.start();

        // 3. Replay Pending Listeners
        for (const handler of messageListeners) {
          remotePort.addEventListener("message", handler);
        }
        for (const handler of errorListeners) {
          remotePort.addEventListener("messageerror", handler);
        }

        // 4. Replay Pending Messages
        pendingMessages.forEach(({ message, transfer }) => {
          remotePort!.postMessage(message, transfer || []);
        });
        pendingMessages.length = 0; // Clear buffer

        // 5. Cleanup
        if (controlPortUnsubscribe) controlPortUnsubscribe();
      }
    }
  };

  // Start listening for the handshake immediately
  controlPortUnsubscribe = controlPort.onMessage(handshakeListener);

  return {
    postMessage: (message, transfer) => {
      if (remotePort) {
        // Fast Path: Send directly via MessageChannel
        remotePort.postMessage(message, transfer || []);
      } else {
        // Buffer Path: Wait for handshake
        pendingMessages.push({ message, transfer });
      }
    },

    onMessage: (listener) => {
      const handler = (ev: MessageEvent) => {
        listener(ev.data, ev.ports);
      };
      if (remotePort) {
        remotePort.addEventListener("message", handler);
        remotePort.start();
      } else {
        messageListeners.add(handler);
      }
      return () => {
        if (remotePort) {
          remotePort.removeEventListener("message", handler);
        }
        messageListeners.delete(handler);
      };
    },

    onError: (listener) => {
      const handler = (ev: MessageEvent) => listener(ev.data);
      if (remotePort) {
        remotePort.addEventListener("messageerror", handler);
      } else {
        errorListeners.add(handler);
      }
      return () => {
        if (remotePort) {
          remotePort.removeEventListener("messageerror", handler);
        }
        errorListeners.delete(handler);
      };
    },

    close: () => {
      if (remotePort) remotePort.close();
      if (controlPortUnsubscribe) controlPortUnsubscribe();
    },
  };
}
