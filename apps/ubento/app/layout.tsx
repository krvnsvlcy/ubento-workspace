import "@ubento/bento-style/dist/uno.css";
import { SessionProvider } from "@/components/session";
import { getSession } from "@/lib/auth";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
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
        </SessionProvider>
      </body>
    </html>
  );
}
