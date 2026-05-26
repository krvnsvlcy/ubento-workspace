export type ModuleState = {
  status: "idle" | "loading" | "loaded" | "error";
  id: string;
  versionId: string;
  error?: any;
  value: any;
  refCount: number;
};

function moduleKey(id: string, versionId: string): string {
  return `${id}@${versionId}`;
}

// Define the signature for the injected evaluation logic
export type EvaluateModuleFn = (id: string, versionId: string) => Promise<any>;

export class ModuleManager {
  private modules: Map<string, ModuleState> = new Map();
  private loadPromises: Map<string, Promise<ModuleState>> = new Map();

  // The injected evaluation function
  private evaluate: EvaluateModuleFn;

  constructor(evaluate: EvaluateModuleFn) {
    this.evaluate = evaluate;
  }

  public getModule(id: string, versionId: string): ModuleState {
    const key = moduleKey(id, versionId);

    if (!this.modules.has(key)) {
      this.modules.set(key, {
        id,
        versionId,
        status: "idle",
        value: undefined,
        refCount: 0,
      });
    }

    return this.modules.get(key)!;
  }

  public async loadModule(id: string, versionId: string): Promise<ModuleState> {
    const key = moduleKey(id, versionId);
    const state = this.getModule(id, versionId);

    if (state.status === "loaded") return state;
    if (this.loadPromises.has(key)) return this.loadPromises.get(key)!;

    const loadTask = async (): Promise<ModuleState> => {
      state.status = "loading";

      try {
        // Delegate to the injected evaluate function
        const moduleNamespace = await this.evaluate(id, versionId);

        state.value = moduleNamespace;
        state.status = "loaded";
        state.error = undefined;
      } catch (error) {
        state.status = "error";
        state.error = error;
      } finally {
        this.loadPromises.delete(key);
      }

      return state;
    };

    const promise = loadTask();
    this.loadPromises.set(key, promise);
    return promise;
  }

  public unloadModule(id: string, versionId: string): void {
    const key = moduleKey(id, versionId);
    this.modules.delete(key);
  }

  public refModule(id: string, versionId: string): void {
    const state = this.getModule(id, versionId);
    state.refCount += 1;
  }

  public unrefModule(id: string, versionId: string): void {
    const state = this.getModule(id, versionId);
    if (state.refCount > 0) state.refCount -= 1;
    if (state.refCount === 0) this.unloadModule(id, versionId);
  }
}
