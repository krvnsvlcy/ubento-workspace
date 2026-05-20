import { createStore, StoreApi } from "zustand";

export interface RegisteredStore {
  name: string;
  store: StoreApi<any>;
}

export interface ControllerState {
  stores: RegisteredStore[];
  addStore: (name: string, store: StoreApi<any>) => void;
  removeStore: (name: string) => void;
}

export const controller = createStore<ControllerState>((set) => ({
  stores: [],
  addStore: (name, store) =>
    set((state) => ({
      stores: [...state.stores.filter((s) => s.name !== name), { name, store }],
    })),
  removeStore: (name) =>
    set((state) => ({
      stores: state.stores.filter((s) => s.name !== name),
    })),
}));
