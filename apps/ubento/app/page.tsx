"use client";

import { Dashboard } from "../components/dashboard";
import { LandingPage } from "../components/landing-page";
import { useSession } from "../hooks/session";

export default function Home() {
  const currentSession = useSession();

  if (!currentSession) {
    return <LandingPage />;
  }

  return <Dashboard />;
}
