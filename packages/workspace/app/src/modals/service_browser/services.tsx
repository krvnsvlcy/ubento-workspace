import { WorkspaceEngine } from "@/engine/workspace/engine";
import { useState } from "react";
import { ServiceBrowser } from "./browser";
import { ServiceDetails } from "./details/details";

export function ServiceBrowserModal({
  workspaceEngine,
}: {
  workspaceEngine: WorkspaceEngine;
}) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
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
