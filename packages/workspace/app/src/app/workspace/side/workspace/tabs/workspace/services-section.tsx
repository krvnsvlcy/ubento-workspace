import { standardIcons } from "@/components/icon/icon";
import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbentoEngine } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import { ServiceData } from "@ubento/bento.runtime";
import { Globe } from "lucide-react";
import React from "react";

interface ServiceEntryProps {
  name: string;
  service: ServiceData;
  onRename: (newName: string) => void;
  onUninstall: () => void;
  onOpen: () => void;
}

function ServiceEntry({
  name,
  service,
  onRename,
  onUninstall,
  onOpen,
}: ServiceEntryProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editName, setEditName] = React.useState(name);

  const engine = useUbentoEngine();
  const { data: serviceDetails } = engine.ubento.vertex.useService(service.id);

  React.useEffect(() => {
    setEditName(name);
  }, [name]);

  const handleSave = () => {
    setIsEditing(false);
    const trimmed = editName.trim();
    if (trimmed && trimmed !== name) {
      onRename(trimmed);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(name);
  };

  if (isEditing) {
    return (
      <TreeEntry icon={standardIcons.service} actionMode="hidden">
        <input
          autoFocus
          className="w-full bg-transparent border-none outline-none p-0 text-[13px] text-foreground placeholder:text-content-muted"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleSave}
          onFocus={(e) => e.target.select()}
          placeholder="Service name"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            } else if (e.key === "Escape") {
              handleCancel();
            }
            e.stopPropagation();
          }}
        />
      </TreeEntry>
    );
  }

  const icon = serviceDetails?.image_url ? (
    <img
      src={serviceDetails.image_url}
      alt={name}
      className="w-4 h-4 rounded-md object-cover"
    />
  ) : (
    "service"
  );

  return (
    <TreeEntry
      icon={icon}
      onClick={onOpen}
      actions={[
        {
          icon: "edit",
          title: "Rename",
          handler: (e) => {
            e.stopPropagation();
            setIsEditing(true);
          },
        },
        {
          icon: "trash",
          title: "Uninstall",
          handler: (e) => {
            e.stopPropagation();
            onUninstall();
          },
        },
      ]}
    >
      {name}
    </TreeEntry>
  );
}

export function ServicesSection() {
  const workspaceEngine = useWorkspaceEngine();
  const services = workspaceEngine.useState((s) => {
    const spec = s.workspace.spec;
    if (spec.isValid) {
      return spec.data.services ?? {};
    } else {
      return {};
    }
  }) as Record<string, ServiceData>;
  const serviceEntries = Object.entries(services);
  const { push } = useAppModal();

  const handleUninstall = (name: string) => {
    const updated = { ...services };
    delete updated[name];
    workspaceEngine.updateWorkspaceSpec({ spec: { services: updated } });
  };

  const handleRename = (oldName: string, newName: string) => {
    const updated = { ...services };
    updated[newName] = updated[oldName];
    delete updated[oldName];
    workspaceEngine.updateWorkspaceSpec({ spec: { services: updated } });
  };

  return (
    <SideSection
      title="Services"
      actionMode="visible"
      actions={[
        {
          icon: <Globe size={16} />,
          title: "Browse Services",
          handler: () => push(appModalRoutes.services.services),
        },
      ]}
    >
      {serviceEntries.length === 0 ? (
        <div className="px-3 py-4 text-center">
          <p className="text-[11px] text-content-muted italic">
            No services installed
          </p>
        </div>
      ) : (
        serviceEntries.map(([name, service]) => (
          <ServiceEntry
            key={name}
            name={name}
            service={service}
            onOpen={() =>
              push(appModalRoutes.services.service, { serviceId: service.id })
            }
            onRename={(newName) => handleRename(name, newName)}
            onUninstall={() => handleUninstall(name)}
          />
        ))
      )}
    </SideSection>
  );
}
