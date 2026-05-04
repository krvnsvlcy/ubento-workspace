export type DomStore = {
  get: (id: string) => HTMLElement | undefined;
  getAll: () => Record<string, HTMLElement>;
  set: (id: string, dom: HTMLElement) => void;
  clear: (id: string) => void;
};

export function createDomStore(): DomStore {
  const store = new Map<string, HTMLElement>();
  return {
    get: (id: string) => store.get(id),
    getAll: () => Object.fromEntries(store.entries()),
    set: (id: string, dom: HTMLElement) => store.set(id, dom),
    clear: (id: string) => store.delete(id),
  };
}
