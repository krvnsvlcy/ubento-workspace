import { createContext, useContext } from "react";

export type Session = {
  userId: string;
  tenantId: string;
  name?: string;
  picture?: string;
};

export const SessionContext = createContext<Session | undefined>(undefined);

export function useSession() {
  return useContext(SessionContext);
}
