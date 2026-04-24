"use client";

import { LandingPage } from "../components/landing-page";
import { useSession } from "../hooks/session";
import { Bento, Host } from "@ubento/bento-app";
import { ubento } from "@/lib/ubento";

export default function Home() {
  const currentSession = useSession();

  if (!currentSession) {
    return <LandingPage />;
  }

  // The runtime app usually runs on a specific port or URL. For local, it's 4020 or determined by env.
  // Using generic "http://localhost:4020" as per the original bento.app App.tsx.
  const host: Host = {
    currentSession,
    ubento,
    iframeUrl: "http://localhost:4020"
  };

  return <Bento host={host} />;
}
