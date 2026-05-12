import { createStore, type ExtractState, type StoreApi } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";

export type StateController<S> = {
  getState: () => S;
  subscribe: (listener: (state: S, previousState: S) => void) => () => void;
  useState: {
    (): S;
    <T>(selector: (state: S) => T, equalityFn?: (a: T, b: T) => boolean): T;
  };
  setState: (updater: Partial<S> | ((state: S) => Partial<S>)) => void;
};

export function createZustandStateController<S extends StoreApi<unknown>>(
  store: S,
): StateController<ExtractState<S>> {
  return {
    getState: store.getState as any,
    subscribe: store.subscribe as any,
    useState: ((selector: any, eq: any) => {
      return useStoreWithEqualityFn(store, selector, eq);
    }) as any,
    setState: store.setState,
  };
}

export const nullStore = createStore<any>()(() => ({}));

export function useStoreState<S extends StoreApi<unknown>>(
  store: S | undefined,
): ExtractState<S> | undefined;
export function useStoreState<S extends StoreApi<unknown>, T>(
  store: S | undefined,
  selector: (state: ExtractState<S>) => T,
  equalityFn?: (a: T, b: T) => boolean,
): T | undefined;
export function useStoreState<S extends StoreApi<unknown>, T>(
  store: S | undefined,
  selector?: (state: ExtractState<S>) => T,
  equalityFn?: (a: T, b: T) => boolean,
) {
  const nonNullSelector = selector || ((state: any) => state);
  return useStoreWithEqualityFn(
    store ?? (nullStore as S),
    store ? nonNullSelector : () => undefined,
    store ? equalityFn : undefined,
  );
}

export * from "./react.js";
export * from "./state.js";
