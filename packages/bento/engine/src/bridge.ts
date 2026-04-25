export interface BridgeChannel {
  send(message: any): void;
  onMessage(handler: (message: any) => void): () => void;
}

export class PostMessageChannel implements BridgeChannel {
  constructor(private target: Window, private origin: string = "*") {}

  send(message: any) {
    this.target.postMessage(message, this.origin);
  }

  onMessage(handler: (message: any) => void) {
    const listener = (event: MessageEvent) => {
      if (this.origin !== "*" && event.origin !== this.origin) return;
      handler(event.data);
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }
}

export class Bridge {
  private handlers = new Map<string, Set<(payload: any) => void>>();
  private cleanup: () => void;

  constructor(private channel: BridgeChannel) {
    this.cleanup = this.channel.onMessage((msg) => {
      if (msg && typeof msg.type === "string") {
        this.handlers.get(msg.type)?.forEach((h) => h(msg.payload));
      }
    });
  }

  on<T = any>(type: string, handler: (payload: T) => void) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    this.handlers.get(type)!.add(handler);
    return () => this.handlers.get(type)?.delete(handler);
  }

  send<T = any>(type: string, payload: T) {
    this.channel.send({ type, payload });
  }

  dispose() {
    this.cleanup();
  }
}
