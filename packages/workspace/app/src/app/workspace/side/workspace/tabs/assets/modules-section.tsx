import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import { useSession } from "@/contexts/session";
import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbentoEngine } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook.js";
import { appModalRoutes } from "@/modals/app/routes.js";
import { ModuleRef } from "@ubento/bento.runtime";
import { Globe2, Plus } from "lucide-react";
import React from "react";

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

interface AddModuleEntryProps {
  onCancel: () => void;
  onSuccess: () => void;
  modules: Record<string, ModuleRef>;
}

function AddModuleEntry({
  onCancel,
  onSuccess,
  modules,
}: AddModuleEntryProps) {
  const workspaceEngine = useWorkspaceEngine();
  const ubento = useUbentoEngine();
  const session = useSession();
  const [newModuleName, setNewModuleName] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const handleCreate = async () => {
    const trimmed = newModuleName.trim();
    if (!trimmed) {
      onCancel();
      return;
    }

    if (!/^[a-z0-9\.\-_]+$/.test(trimmed)) {
      setError(
        "Name must be lowercase and contain only letters, numbers, dot, hyphen, or underscore.",
      );
      return;
    }

    if (modules[trimmed]) {
      setError(`A module named "${trimmed}" already exists.`);
      return;
    }

    setIsCreating(true);
    setError(undefined);
    try {
      const newModule = await ubento.ubento.sdk.module.createModule({
        name: trimmed,
        team_id: session.teamId,
        source: `export default function Module() {\n  // TODO: Implement module\n}`,
        scope: "private",
        type: "module",
      });

      const updated = {
        ...modules,
        [trimmed]: {
          id: newModule.id,
          versionId: newModule.latest_version_id || "",
        },
      };

      workspaceEngine.updateWorkspaceSpec({ spec: { modules: updated } });
      onSuccess();
    } catch (err) {
      console.error("Failed to create module:", err);
      setError("Failed to create module. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!isCreating) {
        onCancel();
      }
    }, 150);
  };

  return (
    <TreeEntry
      icon="service"
      actionMode="hidden"
      loading={isCreating}
      error={error}
    >
      <input
        autoFocus
        disabled={isCreating}
        className="w-full bg-transparent border-none outline-none p-0 text-[13px] text-foreground placeholder:text-content-muted"
        value={newModuleName}
        onChange={(e) => {
          setNewModuleName(e.target.value);
          if (error) setError(undefined);
        }}
        onBlur={handleBlur}
        placeholder="new-module"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreate();
          } else if (e.key === "Escape") {
            onCancel();
          }
          e.stopPropagation();
        }}
      />
    </TreeEntry>
  );
}

export function ModulesSection() {
  const workspaceEngine = useWorkspaceEngine();
  const updateSettings = workspaceEngine.userSetting.update;

  const [isAdding, setIsAdding] = React.useState(false);

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
          title: "Add Module",
          handler: () => setIsAdding(true),
        },
        {
          icon: <Globe2 size={16} />,
          title: "Browse Modules",
          handler: () => push(appModalRoutes.assets.browse),
        },
      ]}
    >
      {isAdding && (
        <AddModuleEntry
          modules={modules}
          onCancel={() => setIsAdding(false)}
          onSuccess={() => setIsAdding(false)}
        />
      )}
      {moduleEntries.length === 0 && !isAdding ? (
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
                editingModule: refData,
                mode: "edit",
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
