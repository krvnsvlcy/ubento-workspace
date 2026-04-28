import { createContext, useContext } from "react";
import { createStore, ExtractState, StoreApi } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import type { BentoHostState, BentoHostStore } from "../types";

export type BentoHostApi = StoreApi<BentoHostStore>;

export function createBentoHost(initialState: BentoHostState): BentoHostApi {
  return createStore<BentoHostStore>()((set, get) => ({
    ...initialState,
    goToLocation: (location) => {
      // Default implementation just updates state
      // Host apps should override this if they want URL sync
      set({ location });
    },
  }));
}

export const BentoHostContext = createContext<BentoHostApi | null>(null);

export function useBentoHostApi(): BentoHostApi {
  const host = useContext(BentoHostContext);

  if (!host) {
    throw new Error("useBento must be used within a BentoHostProvider");
  }

  return host;
}

export function useBentoHost(): ExtractState<BentoHostApi>;
export function useBentoHost<U>(
  selector: (state: ExtractState<BentoHostApi>) => U,
): U;
export function useBentoHost<U>(
  selector: (state: ExtractState<BentoHostApi>) => U,
  equalityFn: (a: U, b: U) => boolean,
): U;
export function useBentoHost<U>(
  selector?: (state: ExtractState<BentoHostApi>) => U,
  equalityFn?: (a: U, b: U) => boolean,
) {
  const host = useBentoHostApi();
  if (selector) {
    return useStoreWithEqualityFn(host, selector, equalityFn);
  } else {
    return useStoreWithEqualityFn(host);
  }
}
