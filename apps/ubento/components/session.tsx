"use client";

import { Session, SessionContext } from "@/hooks/session";
import { PropsWithChildren } from "react";

export function SessionProvider({
  children,
  session,
}: PropsWithChildren<{
  session: Session | undefined;
}>) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
