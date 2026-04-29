import { useBentoHost } from "@/contexts/host";
import { useBentoSession } from "@/contexts/session";
import { useCreateWorkspace, useWorkspaces } from "@/services/ubento/workspace";
import React, { useEffect, useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { WorkspaceGrid } from "./workspace-grid";
// import { AIModal } from "@/modals/AIModal";
// import { CreateWorkspaceModal } from "@/modals/CreateWorkspaceModal";
// import { SettingsModal } from "@/modals/SettingsModal";
// import { UserSettingsModal } from "@/modals/UserSettingsModal";
const AIModal = (props: any) => null;
const CreateWorkspaceModal = (props: any) => null;
const SettingsModal = (props: any) => null;
const UserSettingsModal = (props: any) => null;

export function Home() {
  const host = useBentoHost();
  const session = useBentoSession();

  const { data: workspacesData, isFetching } = useWorkspaces({
    team_id: session.teamId,
  });
  const workspaces = workspacesData || [];

  const { mutateAsync: createWorkspace } = useCreateWorkspace();

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

  const handleCreateWorkspace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const team_id = session.teamId;

    try {
      await createWorkspace({ name, team_id, data: {} });
      setActiveModal(null);
    } catch (err) {
      console.error("Error creating workspace:", err);
    } finally {
      setIsCreating(false);
    }
  };

  const onOpenWorkspace = (workspace: any) => {
    host.goToLocation({ view: "workspace", params: { slug: workspace.slug } });
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div className="relative flex min-h-screen justify-center px-8 py-10 font-sans text-foreground selection:bg-foreground-200 overflow-x-hidden">
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
              Your Workspaces
            </h2>

            {/* Main Action Card */}
            <div className="mb-6 flex cursor-pointer flex-row items-center rounded-2xl bg-background-100 border border-foreground/10 p-6 transition-colors hover:border-foreground/20">
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

            <WorkspaceGrid
              workspaces={workspaces}
              isFetching={isFetching}
              onOpenWorkspace={onOpenWorkspace}
            />
          </div>
        </div>
      </div>

      <CreateWorkspaceModal
        isOpen={activeModal === "create"}
        onClose={closeModal}
        onSubmit={handleCreateWorkspace}
        isCreating={isCreating}
      />

      <AIModal isOpen={activeModal === "ai"} onClose={closeModal} />

      <SettingsModal isOpen={activeModal === "settings"} onClose={closeModal} />

      <UserSettingsModal
        isOpen={activeModal === "user-settings"}
        onClose={closeModal}
        user={session}
      />
    </div>
  );
}
