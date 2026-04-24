import { createContext, useContext } from "react";
import type { BentoHost } from "../types";

export const BentoHostContext = createContext<BentoHost | null>(null);

export function useBentoHost(): BentoHost {
  const host = useContext(BentoHostContext);
  if (!host) {
    throw new Error("useBentoHost must be used within BentoHostProvider");
  }
  return host;
}
