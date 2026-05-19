import { WorkspaceEngine } from "@/engine/workspace/engine";
import { useState } from "react";
import { ServiceBrowser } from "./browser";
import { ServiceDetails } from "./details/details";

export function ServiceBrowserModal({
  workspaceEngine,
  initialSelectedServiceId,
}: {
  workspaceEngine: WorkspaceEngine;
  initialSelectedServiceId?: string;
}) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    initialSelectedServiceId || null,
  );

  return (
    <>
      {selectedServiceId ? (
        <ServiceDetails
          workspaceEngine={workspaceEngine}
          serviceId={selectedServiceId}
          onBack={() => {
            setSelectedServiceId(null);
          }}
        />
      ) : (
        <ServiceBrowser
          activeWorkspaceEngine={workspaceEngine}
          onSelectService={(id: string) => {
            setSelectedServiceId(id);
          }}
        />
      )}
    </>
  );
}
