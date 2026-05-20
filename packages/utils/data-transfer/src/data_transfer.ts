export type DataTransferType<T> = {
  type: string;
  serialize: (data: T) => string;
  deserialize: (data: string) => T;
};

/**
 * Standardized interface that can represent:
 * - Browser DataTransfer
 * - In-memory payload
 * - Any future source (worker bridge, postMessage, etc.)
 */
export interface DataTransferStore {
  /** Returns true if this store has a non-empty value for the mime/type key. */
  hasData(type: string): boolean;

  /** Returns raw string value (or undefined/empty). */
  getData(type: string): string | undefined;

  /** Sets raw string value. May be a no-op if the store can’t write in this context. */
  setData(type: string, value: string): void;

  /** Read-only files view (may be empty). */
  getFiles(): readonly File[];

  /** Add a file (best-effort; some stores may ignore or throw). */
  addFile(file: File): void;
}

/** Wraps the browser DataTransfer. */
export class BrowserDataTransferStore implements DataTransferStore {
  constructor(private readonly dt: DataTransfer) {}

  hasData(type: string): boolean {
    // dt.types is usually safe to inspect during drag lifecycle
    try {
      return Array.from(this.dt.types ?? []).includes(type);
    } catch {
      return false;
    }
  }

  getData(type: string): string | undefined {
    try {
      const raw = this.dt.getData(type);
      return raw === "" ? undefined : raw;
    } catch {
      // In some phases/browsers, reading may be blocked or return empty.
      return undefined;
    }
  }

  setData(type: string, value: string): void {
    try {
      this.dt.setData(type, value);
    } catch {
      // Some contexts may reject writes (rare, but don’t crash).
    }
  }

  getFiles(): readonly File[] {
    try {
      return Array.from(this.dt.files ?? []);
    } catch {
      return [];
    }
  }

  addFile(file: File): void {
    // Best-effort: many browsers disallow adding arbitrary files.
    try {
      if (this.dt.items && typeof this.dt.items.add === "function") {
        this.dt.items.add(file);
      }
    } catch {
      // Ignore
    }
  }
}

/** Pure in-memory store. Works consistently (great for drag preview / internal state). */
export class InMemoryDataTransferStore implements DataTransferStore {
  private data: Record<string, string> = {};
  private files: File[] = [];

  constructor(init?: Record<string, string>) {
    if (init) this.data = { ...init };
  }

  hasData(type: string): boolean {
    const v = this.data[type];
    return v != null && v !== "";
  }

  getData(type: string): string | undefined {
    const v = this.data[type];
    return v == null || v === "" ? undefined : v;
  }

  setData(type: string, value: string): void {
    this.data[type] = value;
  }

  getFiles(): readonly File[] {
    return this.files;
  }

  addFile(file: File): void {
    this.files.push(file);
  }
}
/**
 * Typed façade that fans out writes to ALL stores.
 * Reads return the first store (in priority order) that has a value.
 */
export class DataTransferPayload {
  private readonly stores: DataTransferStore[];

  constructor(...stores: DataTransferStore[]) {
    this.stores = stores;
  }

  addStore(store: DataTransferStore) {
    this.stores.push(store);
  }

  // ---------- String-based typed data ----------

  setData<T>(type: DataTransferType<T>, value: T) {
    const serialized = type.serialize(value);
    for (const store of this.stores) store.setData(type.type, serialized);
  }

  getData<T>(type: DataTransferType<T>): T | undefined {
    for (const store of this.stores) {
      const raw = store.getData(type.type);
      if (raw != null && raw !== "") return type.deserialize(raw);
    }
    return undefined;
  }

  has(type: DataTransferType<any>): boolean {
    return this.stores.some((s) => s.hasData(type.type));
  }

  // ---------- File support ----------

  get files(): readonly File[] {
    // Merge files across stores (avoid duplicates by object identity).
    const out: File[] = [];
    const seen = new Set<File>();
    for (const store of this.stores) {
      for (const f of store.getFiles()) {
        if (!seen.has(f)) {
          seen.add(f);
          out.push(f);
        }
      }
    }
    return out;
  }

  addFile(file: File) {
    for (const store of this.stores) store.addFile(file);
  }

  addFiles(files: Iterable<File> | FileList) {
    for (const file of Array.from(files as any)) this.addFile(file as File);
  }
}
