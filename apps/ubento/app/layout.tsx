import { ModalRenderer } from "@/components/modal-renderer";
import { SessionProvider } from "@/components/session";
import { getSession } from "@/lib/auth";
import "@ubento/bento.style/css/themes.css";
import "@ubento/bento.style/dist/uno.css";
import type { Metadata } from "next";
import { headers } from "next/headers";

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
    <html lang="en" className="antialiased">
      <body className="min-h-full flex flex-col">
        <SessionProvider
          session={
            session
              ? {
                  userId: session.user_id,
                  tenantId: session.tenant_id,
                  name: session.name,
                  picture: session.picture,
                }
              : undefined
          }
        >
          {children}
          <ModalRenderer />
        </SessionProvider>
      </body>
    </html>
  );
}
