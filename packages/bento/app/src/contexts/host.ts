import { createContext, useContext } from "react";
import { createStore, ExtractState, StoreApi } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import type { BentoHostState, BentoHostStore } from "../types";

export type BentoHostStoreApi = StoreApi<BentoHostStore>;

export function createBentoHost(initialState: BentoHostState): BentoHostStoreApi {
  return createStore<BentoHostStore>()((set, get) => ({
    ...initialState,
    goToLocation: (location) => {
      // Default implementation just updates state
      // Host apps should override this if they want URL sync
      set({ location });
    },
  }));
}

export const BentoHostContext = createContext<BentoHostStoreApi | null>(null);

export function useBento(): ExtractState<BentoHostStoreApi>;
export function useBento<U>(
  selector: (state: ExtractState<BentoHostStoreApi>) => U,
): U;
export function useBento<U>(
  selector: (state: ExtractState<BentoHostStoreApi>) => U,
  equalityFn: (a: U, b: U) => boolean,
): U;
export function useBento<U>(
  selector?: (state: ExtractState<BentoHostStoreApi>) => U,
  equalityFn?: (a: U, b: U) => boolean,
) {
  const host = useContext(BentoHostContext);

  if (!host) {
    throw new Error("useBento must be used within a BentoHostProvider");
  }

  if (selector) {
    return useStoreWithEqualityFn(host, selector, equalityFn);
  } else {
    return useStoreWithEqualityFn(host);
  }
}

// For backward compatibility while refactoring
export function useBentoHost(): ExtractState<BentoHostStoreApi> {
  return useBento();
}
