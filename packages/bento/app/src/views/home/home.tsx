import { useBentoHost } from "@/contexts/host";
import { useBentoSession } from "@/contexts/session";
import { useApps, useCreateApp } from "@/hooks/app";
import { AIModal } from "@/modals/AIModal";
import { CreateAppModal } from "@/modals/CreateAppModal";
import { SettingsModal } from "@/modals/SettingsModal";
import { UserSettingsModal } from "@/modals/UserSettingsModal";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { AppGrid } from "./AppGrid";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function Home() {
  const host = useBentoHost();
  const session = useBentoSession();

  const { data: appsData, isFetching } = useApps({
    team_id: session.teamId,
  });
  const apps = appsData || [];

  const { mutateAsync: createApp } = useCreateApp();

  const [activeModal, setActiveModal] = useState<
    "create" | "ai" | "settings" | "user-settings" | null
  >(null);
  const [currentTheme, setCurrentTheme] = useState("sky");
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("ubento-theme") || "sky";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

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
    const team_id = session.teamId;

    try {
      await createApp({ name, team_id });
      setActiveModal(null);
    } catch (err) {
      console.error("Error creating app:", err);
      alert("Error creating app");
    } finally {
      setIsCreating(false);
    }
  };

  const onOpenApp = (app: any) => {
    host.goToLocation({ view: "app", params: { slug: app.slug } });
  };

  const closeModal = () => setActiveModal(null);

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

            <AppGrid
              apps={apps}
              isFetching={isFetching}
              onOpenApp={onOpenApp}
            />
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
      />
    </div>
  );
}
