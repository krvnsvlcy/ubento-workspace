import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbentoEngine } from "@/hooks/app-engine";
import { ModuleRef } from "@ubento/bento.runtime";
import React from "react";
import { useAppModal } from "@/modals/app/hook.js";
import { appModalRoutes } from "@/modals/app/routes.js";
import { Plus } from "lucide-react";

interface ModuleEntryProps {
  name: string;
  refData: ModuleRef;
  onRename: (newName: string) => void;
  onUninstall: () => void;
  onOpen: () => void;
}

function ModuleEntry({
  name,
  refData,
  onRename,
  onUninstall,
  onOpen,
}: ModuleEntryProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editName, setEditName] = React.useState(name);

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
      <TreeEntry icon="service" actionMode="hidden">
        <input
          autoFocus
          className="w-full bg-transparent border-none outline-none p-0 text-[13px] text-foreground placeholder:text-content-muted"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleSave}
          onFocus={(e) => e.target.select()}
          placeholder="Module name"
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

  return (
    <TreeEntry
      icon="service"
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

export function ModulesSection() {
  const workspaceEngine = useWorkspaceEngine();
  const updateSettings = workspaceEngine.userSetting.update;

  const modules = workspaceEngine.useState((s) => {
    const spec = s.workspace.spec;
    if (spec.isValid) {
      return spec.data.modules ?? {};
    } else {
      return {};
    }
  }) as Record<string, ModuleRef>;

  const moduleEntries = Object.entries(modules);

  const handleUninstall = (name: string) => {
    const updated = { ...modules };
    delete updated[name];
    workspaceEngine.updateWorkspaceSpec({ spec: { modules: updated } });
  };

  const handleRename = (oldName: string, newName: string) => {
    const updated = { ...modules };
    updated[newName] = updated[oldName];
    delete updated[oldName];
    workspaceEngine.updateWorkspaceSpec({ spec: { modules: updated } });
  };

  const { push } = useAppModal();

  return (
    <SideSection
      title="Modules"
      actionMode="visible"
      actions={[
        {
          icon: <Plus size={16} />,
          title: "Install Module",
          handler: () => push(appModalRoutes.assets.browse),
        },
      ]}
    >
      {moduleEntries.length === 0 ? (
        <div className="px-3 py-4 text-center">
          <p className="text-[11px] text-content-muted italic">
            No modules installed
          </p>
        </div>
      ) : (
        moduleEntries.map(([name, refData]) => (
          <ModuleEntry
            key={name}
            name={name}
            refData={refData}
            onOpen={() =>
              updateSettings({
                module: refData.id,
              })
            }
            onRename={(newName) => handleRename(name, newName)}
            onUninstall={() => handleUninstall(name)}
          />
        ))
      )}
    </SideSection>
  );
}
