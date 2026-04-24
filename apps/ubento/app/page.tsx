"use client";

import { Dashboard } from "@/views/dashboard";
import { useSession } from "../hooks/session";
import { LandingPage } from "../views/landing-page";

export default function Home() {
  const currentSession = useSession();

  if (!currentSession) {
    return <LandingPage />;
  } else {
    return <Dashboard session={currentSession} />;
  }
}
