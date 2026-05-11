import { useUbento, useUbentoEngine } from "@/engine/app/engine";
import { WorkspaceEngine } from "@/engine/workspace/engine";
import { ServiceData } from "@ubento/bento.core";
import { useEffect, useState } from "react";
import { Modal } from "../../app/components/modal";
import { ServiceBrowser } from "./browser";
import { ServiceDetails } from "./details";

function ServiceBrowserModalContent({
  isOpen,
  onClose,
  onAdd,
  workspaceEngine,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (serviceName: string, data: ServiceData) => void;
  workspaceEngine: WorkspaceEngine;
}) {
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

  const handleInstall = (serviceName: string, data: ServiceData) => {
    onAdd(serviceName, data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={view === "browser" ? "Service Marketplace" : "Service Details"}
    >
      {view === "browser" ? (
        <ServiceBrowser
          activeWorkspaceEngine={workspaceEngine}
          onSelectService={handleSelectService}
        />
      ) : (
        selectedServiceId && (
          <ServiceDetails
            workspaceEngine={workspaceEngine}
            serviceId={selectedServiceId}
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
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const engine = useUbentoEngine();
  const ubento = useUbento();
  const activeWorkspaceEngine = engine.useState((s) => s.workspace);

  if (!activeWorkspaceEngine) return null;

  const handleAddService = async (serviceName: string, data: ServiceData) => {
    activeWorkspaceEngine.installService(serviceName, data);
  };

  return (
    <ServiceBrowserModalContent
      isOpen={isOpen}
      onClose={onClose}
      onAdd={handleAddService}
      workspaceEngine={activeWorkspaceEngine}
    />
  );
}
