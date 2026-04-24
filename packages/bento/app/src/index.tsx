"use client";

import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { AppViewer } from "./components/AppViewer";
import { AppGrid } from "./components/Dashboard/AppGrid";
import { Header } from "./components/Dashboard/Header";
import { Sidebar } from "./components/Dashboard/Sidebar";
import { AIModal } from "./components/modals/AIModal";
import { CreateAppModal } from "./components/modals/CreateAppModal";
import { SettingsModal } from "./components/modals/SettingsModal";
import { UserSettingsModal } from "./components/modals/UserSettingsModal";
import { Host } from "./types";

export { AppViewer };
export type { Host };

export function Bento({ host }: { host: Host }) {
  const currentSession = host.currentSession;
  const ubento = host.ubento;

  const [activeModal, setActiveModal] = useState<
    "create" | "ai" | "settings" | "user-settings" | null
  >(null);
  const [currentTheme, setCurrentTheme] = useState("sky");
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [apps, setApps] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // App opening state
  const [openedApp, setOpenedApp] = useState<any | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("ubento-theme") || "sky";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    if (!currentSession) {
      setIsFetching(false);
      return;
    }

    // Fetch apps
    ubento.app
      .listApps({ team_id: currentSession?.tenantId || "" })
      .then((data) => {
        setApps(Array.isArray(data) && Array.isArray(data[0]) ? data[0] : data);
        setIsFetching(false);
      })
      .catch((err) => {
        console.error("Failed to fetch apps:", err);
        setIsFetching(false);
      });
  }, [currentSession, ubento]);

  // Sync state with URL
  useEffect(() => {
    const syncWithUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const appSlug = params.get("app");

      if (!appSlug) {
        setOpenedApp(null);
      } else if (apps.length > 0) {
        const app = apps.find(
          (a) => a.slug === appSlug || String(a.id) === String(appSlug)
        );
        if (app) {
          setOpenedApp(app);
        }
      }
    };

    window.addEventListener("popstate", syncWithUrl);

    // Initial sync
    if (apps.length > 0) {
      syncWithUrl();
    }

    return () => window.removeEventListener("popstate", syncWithUrl);
  }, [apps]);

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem("ubento-theme", themeId);
    document.documentElement.setAttribute("data-theme", themeId);
  };

  const handleCreateApp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const team_id = currentSession?.tenantId || "default-team";

    try {
      const app = await ubento.app.createApp({ name, team_id });
      setApps((prev) => [app, ...prev]);
      setActiveModal(null);
    } catch (err) {
      console.error("Error creating app:", err);
      alert("Error creating app");
    } finally {
      setIsCreating(false);
    }
  };

  const closeModal = () => setActiveModal(null);

  const openApp = (app: any) => {
    setOpenedApp(app);
    const url = new URL(window.location.href);
    url.searchParams.set("app", app.slug || app.id);
    window.history.pushState({ type: "app", id: app.id }, "", url.toString());
  };

  const closeApp = () => {
    setOpenedApp(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has("app")) {
      url.searchParams.delete("app");
      window.history.pushState({ type: "dashboard" }, "", url.toString());
    }
  };

  // Render App Inline
  if (openedApp) {
    return <AppViewer openedApp={openedApp} closeApp={closeApp} host={host} />;
  }

  // Render Dashboard
  return (
    <div className="relative flex min-h-screen justify-center bg-background px-8 py-10 font-sans text-foreground selection:bg-foreground-200 overflow-x-hidden">
      {/* Background Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-primary-500/10 dark:from-primary-300/7 to-transparent"
      />

      <div className="relative flex w-full max-w-5xl flex-col">
        <Header
          currentSession={currentSession}
          currentTheme={currentTheme}
          isThemeOpen={isThemeOpen}
          setIsThemeOpen={setIsThemeOpen}
          onChangeTheme={changeTheme}
          onOpenUserSettings={() => setActiveModal("user-settings")}
        />

        <div className="flex flex-col gap-x-12 gap-y-12 md:grid md:grid-cols-4">
          <Sidebar onOpenModal={setActiveModal} />

          <div className="col-span-3 flex flex-col px-0">
            <h2 className="mb-4 text-lg font-medium tracking-tight text-foreground-400">
              Your Apps
            </h2>

            {/* Main Action Card */}
            <div className="mb-6 flex cursor-pointer flex-row items-center rounded-2xl bg-background-300 p-6 transition-colors hover:bg-background-200">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-background-500"></div>
                <div className="flex flex-col justify-center">
                  <p className="mb-1 text-xs leading-tight tracking-tight text-foreground-100">
                    Continue where you left off
                  </p>
                  <h3 className="text-[22px] font-medium leading-tight tracking-tight text-foreground">
                    Stock Manager
                  </h3>
                </div>
              </div>
            </div>

            <AppGrid apps={apps} isFetching={isFetching} onOpenApp={openApp} />
          </div>
        </div>
      </div>

      <CreateAppModal
        isOpen={activeModal === "create"}
        onClose={closeModal}
        onSubmit={handleCreateApp}
        isCreating={isCreating}
      />

      <AIModal isOpen={activeModal === "ai"} onClose={closeModal} />

      <SettingsModal isOpen={activeModal === "settings"} onClose={closeModal} />

      <UserSettingsModal
        isOpen={activeModal === "user-settings"}
        onClose={closeModal}
        user={currentSession}
      />
    </div>
  );
}
