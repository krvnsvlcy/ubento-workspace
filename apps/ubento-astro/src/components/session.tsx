"use client";

import { SessionContext } from "@/hooks/session";
import type { Session } from "@/hooks/session";
import type { PropsWithChildren } from "react";

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
