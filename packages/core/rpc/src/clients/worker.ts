import { createWorkerPort } from "~/ports/worker.js";
import { ReqOf, ResOf, RpcInterfaceDefinition } from "~/types.js";
import { createDuplexRpc, DuplexRpc } from "./core.js";
import { createDuplexRpcWithInitializer } from "./with_initializer.js";

export type WorkerType = "classic" | "module";

export type BaseWorkerOptions = {
  type?: WorkerType;
  name?: string;
  credentials?: RequestCredentials;
  autoRecover?: boolean;
};

export class RpcWorkerClient<
  Ingress extends RpcInterfaceDefinition,
  Egress extends RpcInterfaceDefinition
> {
  private _rpc: ReturnType<typeof createDuplexRpc<Ingress, Egress>> | null =
    null;

  url: string;
  protected options: BaseWorkerOptions;
  protected worker: Worker | null = null;

  constructor(workerUrl: string, options: BaseWorkerOptions = {}) {
    this.url = workerUrl;
    this.options = { type: "module", autoRecover: true, ...options };
  }

  /** Ensure worker + rpc exist. */
  get rpc() {
    if (this._rpc) return this._rpc;

    this.worker = new Worker(this.url, {
      type: this.options.type ?? "module",
      name: this.options.name,
      credentials: this.options.credentials as any,
    } as WorkerOptions);

    if (this.options.autoRecover) {
      this.worker.addEventListener("error", (error) => {
        console.error("Worker error, reloading...", error);
        this.reload();
      });
      this.worker.addEventListener("messageerror", (error) => {
        console.error("Worker message error, reloading...", error);
        this.reload();
      });
    }

    this._rpc = createDuplexRpcWithInitializer<Ingress, Egress>({
      port: createWorkerPort(this.worker),
      initializer: async (rpc) => {
        this.initialize(rpc);
      },
    });

    this._rpc.run();
    return this._rpc;
  }

  protected initialize(rpc: DuplexRpc<Ingress, Egress>) {
    // Override in subclass
  }

  /** Typed main->worker call. */
  protected async call<K extends Extract<keyof Egress, string>>(
    method: K,
    arg: ReqOf<Egress[K]>
  ): Promise<ResOf<Egress[K]>> {
    return this.rpc.call(method, arg);
  }

  /** Terminate worker & dispose RPC. */
  dispose() {
    try {
      this._rpc?.dispose();
      this.worker?.terminate();
    } finally {
      console.log(`Worker at ${this.url} disposed`);
      this._rpc = null;
      this.worker = null;
    }
  }

  /** Drop and respawn on next call. */
  reload(nextUrl?: string) {
    if (nextUrl) this.url = nextUrl;
    this.dispose();
  }
}
