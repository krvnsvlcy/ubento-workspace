import { standardIcons } from "@/components/icon/icon";
import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import { useWorkspaceEngine } from "@/contexts/workspace";
import { useAppModal } from "@/modals/app/hook.js";
import { appModalRoutes } from "@/modals/app/routes.js";
import { Plus } from "lucide-react";
import React from "react";

interface PackageEntryProps {
  name: string;
  version: string;
  onRename: (newName: string) => void;
  onUninstall: () => void;
}

function PackageEntry({
  name,
  version,
  onRename,
  onUninstall,
}: PackageEntryProps) {
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
      <TreeEntry icon={standardIcons.assets} actionMode="hidden">
        <input
          autoFocus
          className="w-full bg-transparent border-none outline-none p-0 text-[13px] text-foreground placeholder:text-content-muted"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleSave}
          onFocus={(e) => e.target.select()}
          placeholder="Package name"
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
      icon={standardIcons.assets}
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
      <div className="flex items-center justify-between w-full pr-2">
        <span className="truncate">{name}</span>
        <span className="text-[10px] text-content-muted font-mono shrink-0 ml-2">
          {version}
        </span>
      </div>
    </TreeEntry>
  );
}

export function PackagesSection() {
  const workspaceEngine = useWorkspaceEngine();

  const packages = workspaceEngine.useState((s) => {
    const spec = s.workspace.spec;
    if (spec.isValid) {
      return spec.data.packages ?? {};
    } else {
      return {};
    }
  }) as Record<string, string>;

  const packageEntries = Object.entries(packages);

  const handleUninstall = (name: string) => {
    const updated = { ...packages };
    delete updated[name];
    workspaceEngine.updateWorkspaceSpec({ spec: { packages: updated } });
  };

  const handleRename = (oldName: string, newName: string) => {
    const updated = { ...packages };
    updated[newName] = updated[oldName];
    delete updated[oldName];
    workspaceEngine.updateWorkspaceSpec({ spec: { packages: updated } });
  };

  const { push } = useAppModal();

  return (
    <SideSection
      title="Packages"
      actionMode="visible"
      actions={[
        {
          icon: <Plus size={16} />,
          title: "Install Package",
          handler: () => push(appModalRoutes.assets.packages),
        },
      ]}
    >
      {packageEntries.length === 0 ? (
        <div className="px-3 py-4 text-center">
          <p className="text-[11px] text-content-muted italic">
            No packages installed
          </p>
        </div>
      ) : (
        packageEntries.map(([name, version]) => (
          <PackageEntry
            key={name}
            name={name}
            version={version}
            onRename={(newName) => handleRename(name, newName)}
            onUninstall={() => handleUninstall(name)}
          />
        ))
      )}
    </SideSection>
  );
}
