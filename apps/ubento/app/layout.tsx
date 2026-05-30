import { ModalRenderer } from "@/components/modal-renderer";
import { SessionProvider } from "@/components/session";
import { getSession } from "@/lib/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { fontRegistryClassNames } from "./fonts";
import { Analytics } from "@vercel/analytics/react";

import "@ubento/bento.style/dist/uno.css";

import "@ubento/bento.style/css/themes.css";

export const metadata: Metadata = {
  title: "Ubento",
  description: "Identity and App Management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const head = await headers();
  const session = await getSession(
    new Request("http://localhost", { headers: head }),
  );

  return (
    <html lang="en" className={`${fontRegistryClassNames} antialiased`}>
      <body data-tone="neutral" className="min-h-full flex flex-col">
        <SessionProvider
          session={
            session
              ? {
                  userId: session.user_id,
                  teamId: session.team_id,
                  email: session.email,
                  name: session.name,
                  picture: session.picture,
                }
              : undefined
          }
        >
          {children}
          <ModalRenderer />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
