import { createContext, useContext } from "react";
import type { BentoSession } from "../types";

export const BentoSessionContext = createContext<BentoSession | null>(null);

export function useBentoSession(): BentoSession {
  const session = useContext(BentoSessionContext);
  if (!session) {
    throw new Error("useBentoSession must be used within BentoSessionProvider");
  }
  return session;
}
