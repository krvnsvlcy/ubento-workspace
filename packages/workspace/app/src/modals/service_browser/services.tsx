import { useUbentoEngine } from "@/engine/app/engine";
import { useEffect, useState } from "react";
import { Modal } from "../../app/components/modal";
import { ServiceBrowser } from "./browser";
import { ServiceDetails } from "./details";

function ServiceBrowserModalContent({
  isOpen,
  onClose,
  onAdd,
  activeWorkspaceEngine,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (moduleId: string, name: string) => void;
  activeWorkspaceEngine: any;
}) {
  const installedServices =
    activeWorkspaceEngine.useState(
      (s: any) => s.workspaceData?.services || {},
    ) || {};

  const [view, setView] = useState<"browser" | "details">("browser");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );

  // Reset view when modal is closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setView("browser");
        setSelectedServiceId(null);
      }, 300); // Wait for close animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    setView("details");
  };

  const handleBack = () => {
    setView("browser");
    setSelectedServiceId(null);
  };

  const handleInstall = (id: string, name: string) => {
    onAdd(id, name);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={view === "browser" ? "Service Marketplace" : "Service Details"}
    >
      {view === "browser" ? (
        <ServiceBrowser
          activeWorkspaceEngine={activeWorkspaceEngine}
          onSelectService={handleSelectService}
        />
      ) : (
        selectedServiceId && (
          <ServiceDetails
            serviceId={selectedServiceId}
            isInstalled={Object.values(installedServices).some(
              (s: any) => s.module.id === selectedServiceId,
            )}
            onBack={handleBack}
            onInstall={handleInstall}
          />
        )
      )}
    </Modal>
  );
}

export function ServiceBrowserModal({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (moduleId: string, name: string) => void;
}) {
  const engine = useUbentoEngine();
  const activeWorkspaceEngine = engine.useState((s) => s.workspace);

  if (!activeWorkspaceEngine) return null;

  return (
    <ServiceBrowserModalContent
      isOpen={isOpen}
      onClose={onClose}
      onAdd={onAdd}
      activeWorkspaceEngine={activeWorkspaceEngine}
    />
  );
}
