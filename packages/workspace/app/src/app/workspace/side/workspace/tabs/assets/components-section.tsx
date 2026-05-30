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

interface ComponentEntryProps {
  name: string;
  refData: ModuleRef;
  onRename: (newName: string) => void;
  onUninstall: () => void;
  onOpen: () => void;
}

function ComponentEntry({
  name,
  refData,
  onRename,
  onUninstall,
  onOpen,
}: ComponentEntryProps) {
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
      <TreeEntry icon="component" actionMode="hidden">
        <input
          autoFocus
          className="w-full bg-transparent border-none outline-none p-0 text-[13px] text-foreground placeholder:text-content-muted"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleSave}
          onFocus={(e) => e.target.select()}
          placeholder="Component name"
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
      icon="component"
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

interface AddComponentEntryProps {
  onCancel: () => void;
  onSuccess: () => void;
  components: Record<string, ModuleRef>;
}

function AddComponentEntry({
  onCancel,
  onSuccess,
  components,
}: AddComponentEntryProps) {
  const workspaceEngine = useWorkspaceEngine();
  const ubento = useUbentoEngine();
  const session = useSession();
  const [newComponentName, setNewComponentName] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const handleCreate = async () => {
    const trimmed = newComponentName.trim();
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

    if (components[trimmed]) {
      setError(`A component named "${trimmed}" already exists.`);
      return;
    }

    setIsCreating(true);
    setError(undefined);
    try {
      const newModule = await ubento.ubento.sdk.module.createModule({
        name: trimmed,
        team_id: session.teamId,
        source: `export default function Component() {\n  return (\n    <div className="p-4 bg-surface rounded-xl border border-border">\n      <h3 className="text-sm font-bold">${trimmed}</h3>\n    </div>\n  );\n}`,
        scope: "private",
        type: "component",
      });

      const updated = {
        ...components,
        [trimmed]: {
          id: newModule.id,
          versionId: newModule.latest_version_id || "",
        },
      };

      workspaceEngine.updateWorkspaceSpec({ spec: { components: updated } });
      onSuccess();
    } catch (err) {
      console.error("Failed to create component:", err);
      setError("Failed to create component. Please try again.");
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
      icon="component"
      actionMode="hidden"
      loading={isCreating}
      error={error}
    >
      <input
        autoFocus
        disabled={isCreating}
        className="w-full bg-transparent border-none outline-none p-0 text-[13px] text-foreground placeholder:text-content-muted"
        value={newComponentName}
        onChange={(e) => {
          setNewComponentName(e.target.value);
          if (error) setError(undefined);
        }}
        onBlur={handleBlur}
        placeholder="new-component"
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

export function ComponentsSection() {
  const workspaceEngine = useWorkspaceEngine();
  const updateSettings = workspaceEngine.userSetting.update;

  const [isAdding, setIsAdding] = React.useState(false);

  const components = workspaceEngine.useState((s) => {
    const spec = s.workspace.spec;
    if (spec.isValid) {
      return spec.data.components ?? {};
    } else {
      return {};
    }
  }) as Record<string, ModuleRef>;

  const componentEntries = Object.entries(components);

  const handleUninstall = (name: string) => {
    const updated = { ...components };
    delete updated[name];
    workspaceEngine.updateWorkspaceSpec({ spec: { components: updated } });
  };

  const handleRename = (oldName: string, newName: string) => {
    const updated = { ...components };
    updated[newName] = updated[oldName];
    delete updated[oldName];
    workspaceEngine.updateWorkspaceSpec({ spec: { components: updated } });
  };

  const { push } = useAppModal();

  return (
    <SideSection
      title="Components"
      actionMode="visible"
      actions={[
        {
          icon: <Plus size={16} />,
          title: "Add Component",
          handler: () => setIsAdding(true),
        },
        {
          icon: <Globe2 size={16} />,
          title: "Browse Components",
          handler: () => push(appModalRoutes.assets.browse),
        },
      ]}
    >
      {isAdding && (
        <AddComponentEntry
          components={components}
          onCancel={() => setIsAdding(false)}
          onSuccess={() => setIsAdding(false)}
        />
      )}
      {componentEntries.length === 0 && !isAdding ? (
        <div className="px-3 py-4 text-center">
          <p className="text-[11px] text-content-muted italic">
            No components installed
          </p>
        </div>
      ) : (
        componentEntries.map(([name, refData]) => (
          <ComponentEntry
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
