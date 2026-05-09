import { UbentoSession } from "@/engine/app/session";
import { createContext, useContext } from "react";

export const BentoSessionContext = createContext<UbentoSession | undefined>(
  undefined,
);

export function useSession() {
  const session = useContext(BentoSessionContext);
  if (!session) {
    throw new Error("useSession must be used within BentoSessionProvider");
  }
  return session;
}
