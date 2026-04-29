import { UbentoSession } from "@/engine/session";
import { createContext, useContext } from "react";

export const BentoSessionContext = createContext<UbentoSession | undefined>(
  undefined,
);

export function useBentoSession() {
  const session = useContext(BentoSessionContext);
  if (!session) {
    throw new Error(
      "useBentoSession must be used within BentoSessionProvider",
    );
  }
  return session;
}
