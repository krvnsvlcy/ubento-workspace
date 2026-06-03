import { standardIcons } from "@/components/icon/icon";
import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import { TreeIndent } from "@/components/tree/tree-indent";
import { useSession } from "@/contexts/session";
import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbentoEngine } from "@/hooks/app-engine";
import { useEditingModuleId } from "@/hooks/workspace";
import { useAppModal } from "@/modals/app/hook.js";
import { appModalRoutes } from "@/modals/app/routes.js";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ModuleRef } from "@ubento/bento.runtime";
import clsx from "clsx";
import { Folder, FolderPlus, Globe2, Plus } from "lucide-react";
import React, { useCallback, useState } from "react";

function removeIdFromTree(
  moduleGroups: Record<string, any>,
  rootModuleGroups: string[],
  idToRemove: string,
): { moduleGroups: Record<string, any>; rootModuleGroups: string[] } {
  const nextGroups = { ...moduleGroups };
  let nextRoots = rootModuleGroups.filter((id) => id !== idToRemove);

  for (const id in nextGroups) {
    const group = nextGroups[id];
    if (group.entries) {
      nextGroups[id] = {
        ...group,
        entries: group.entries.filter((entry: any) => entry.id !== idToRemove),
      };
    }
  }

  return { moduleGroups: nextGroups, rootModuleGroups: nextRoots };
}

function sortEntries(
  ids: string[],
  modules: Record<string, ModuleRef>,
  moduleGroups: Record<string, any>,
): string[] {
  const groups: string[] = [];
  const mods: string[] = [];

  for (const id of ids) {
    if (moduleGroups[id]) {
      groups.push(id);
    } else if (modules[id]) {
      mods.push(id);
    }
  }

  groups.sort((a, b) => {
    const nameA = (moduleGroups[a]?.name || "").toLowerCase();
    const nameB = (moduleGroups[b]?.name || "").toLowerCase();
    return nameA.localeCompare(nameB);
  });

  mods.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  return [...groups, ...mods];
}

function sortChildEntries(
  entries: { type: "group" | "module"; id: string }[],
  modules: Record<string, ModuleRef>,
  moduleGroups: Record<string, any>,
): { type: "group" | "module"; id: string }[] {
  const groups = entries.filter(
    (e) => e.type === "group" && !!moduleGroups[e.id],
  );
  const mods = entries.filter((e) => e.type === "module" && !!modules[e.id]);

  groups.sort((a, b) => {
    const nameA = (moduleGroups[a.id]?.name || "").toLowerCase();
    const nameB = (moduleGroups[b.id]?.name || "").toLowerCase();
    return nameA.localeCompare(nameB);
  });

  mods.sort((a, b) => a.id.toLowerCase().localeCompare(b.id.toLowerCase()));

  return [...groups, ...mods];
}

interface AddFolderEntryProps {
  onCancel: () => void;
  onSuccess: (name: string) => void;
}

function AddFolderEntry({ onCancel, onSuccess }: AddFolderEntryProps) {
  const [folderName, setFolderName] = React.useState("");

  const handleCreate = () => {
    const trimmed = folderName.trim();
    if (!trimmed) {
      onCancel();
      return;
    }
    onSuccess(trimmed);
  };

  return (
    <TreeEntry
      icon={<Folder size={16} className="text-content-muted" />}
      actionMode="hidden"
    >
      <input
        autoFocus
        className="w-full bg-transparent border-none outline-none p-0 text-[13px] text-foreground placeholder:text-content-muted"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        onBlur={handleCreate}
        placeholder="new-folder"
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

interface ModuleNodeProps {
  name: string;
  refData: ModuleRef;
  onSelect: (refData: ModuleRef) => void;
  onRename: (oldName: string, newName: string) => Promise<void>;
  onUninstall: (name: string) => Promise<void>;
  activeDragId: string | null;
}

function ModuleNode({
  name,
  refData,
  onSelect,
  onRename,
  onUninstall,
  activeDragId,
}: ModuleNodeProps) {
  const editingModuleId = useEditingModuleId();
  const isActive = editingModuleId === refData.id;
  const [isEditing, setIsEditing] = React.useState(false);
  const [editName, setEditName] = React.useState(name);

  React.useEffect(() => {
    setEditName(name);
  }, [name]);

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({
    id: name,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
  };

  const handleSave = () => {
    setIsEditing(false);
    const trimmed = editName.trim();
    if (trimmed && trimmed !== name) {
      onRename(name, trimmed);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(name);
  };

  if (isEditing) {
    return (
      <div style={style} ref={setDragRef}>
        <TreeEntry icon={standardIcons.module} actionMode="hidden">
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
      </div>
    );
  }

  return (
    <div
      style={style}
      ref={setDragRef}
      {...attributes}
      {...listeners}
      className="w-full cursor-pointer select-none"
    >
      <TreeEntry
        active={isActive}
        icon={standardIcons.module}
        onClick={() => onSelect(refData)}
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
              onUninstall(name);
            },
          },
        ]}
      >
        {name}
      </TreeEntry>
    </div>
  );
}

interface FolderNodeProps {
  groupId: string;
  group: any;
  allGroups: Record<string, any>;
  modules: Record<string, ModuleRef>;
  depth: number;
  onSelectModule: (refData: ModuleRef) => void;
  onRenameModule: (oldName: string, newName: string) => Promise<void>;
  onUninstallModule: (name: string) => Promise<void>;
  onRenameGroup: (groupId: string, newName: string) => Promise<void>;
  onDeleteGroup: (groupId: string, groupName: string) => Promise<void>;
  onCreateChildGroup: (parentId: string, name: string) => Promise<void>;
  activeDragId: string | null;
}

function FolderNode({
  groupId,
  group,
  allGroups,
  modules,
  depth,
  onSelectModule,
  onRenameModule,
  onUninstallModule,
  onRenameGroup,
  onDeleteGroup,
  onCreateChildGroup,
  activeDragId,
}: FolderNodeProps) {
  const workspaceEngine = useWorkspaceEngine();
  const isExpanded = workspaceEngine.userSetting.useState(
    (s) => s.data.moduleExplorer?.expandedStates?.[groupId],
  );

  const [isEditing, setIsEditing] = React.useState(false);
  const [editName, setEditName] = React.useState(group.name);
  const [isAddingChildFolder, setIsAddingChildFolder] = React.useState(false);

  React.useEffect(() => {
    setEditName(group.name);
  }, [group.name]);

  const childEntries = group.entries || [];
  const sortedChildren = sortChildEntries(childEntries, modules, allGroups);
  const hasChildren = childEntries.length > 0;

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({
    id: groupId,
  });

  const { setNodeRef: setNestRef, isOver: isOverNest } = useDroppable({
    id: `nest-target:${groupId}`,
    disabled: activeDragId === groupId,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
  };

  const toggleExpanded = useCallback(() => {
    workspaceEngine.userSetting.update((s) => {
      const update = {
        moduleExplorer: {
          ...s.moduleExplorer,
          expandedStates: {
            ...s.moduleExplorer?.expandedStates,
            [groupId]: !s.moduleExplorer?.expandedStates?.[groupId],
          },
        },
      };
      return update;
    });
  }, [groupId, workspaceEngine]);

  const handleSave = () => {
    setIsEditing(false);
    const trimmed = editName.trim();
    if (trimmed && trimmed !== group.name) {
      onRenameGroup(groupId, trimmed);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(group.name);
  };

  if (isEditing) {
    return (
      <div style={style} ref={setDragRef}>
        <TreeEntry
          icon={<Folder size={16} className="text-content-muted" />}
          actionMode="hidden"
        >
          <input
            autoFocus
            className="w-full bg-transparent border-none outline-none p-0 text-[13px] text-foreground placeholder:text-content-muted"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSave}
            onFocus={(e) => e.target.select()}
            placeholder="Folder name"
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
      </div>
    );
  }

  return (
    <div style={style} className="w-full">
      <div
        ref={(node) => {
          setNestRef(node);
          setDragRef(node);
        }}
        {...attributes}
        {...listeners}
        className={clsx(
          "relative cursor-pointer select-none rounded-lg transition-all duration-150",
          {
            "ring-2 ring-accent ring-dashed bg-base/5": isOverNest,
          },
        )}
      >
        <TreeEntry
          icon={<Folder size={16} className="text-content-muted" />}
          isContainer={hasChildren || isAddingChildFolder}
          isOpen={isExpanded}
          onOpenChange={toggleExpanded}
          actions={[
            {
              icon: "plus" as any,
              title: "Create child folder",
              handler: (e: React.MouseEvent) => {
                e.stopPropagation();
                setIsAddingChildFolder(true);
                if (!isExpanded) {
                  toggleExpanded();
                }
              },
            },
            {
              icon: "edit" as any,
              title: "Rename",
              handler: (e: React.MouseEvent) => {
                e.stopPropagation();
                setIsEditing(true);
              },
            },
            {
              icon: "trash" as any,
              title: "Delete",
              handler: (e: React.MouseEvent) => {
                e.stopPropagation();
                onDeleteGroup(groupId, group.name);
              },
            },
          ]}
          onClick={toggleExpanded}
        >
          <span className="truncate">{group.name}</span>
        </TreeEntry>
      </div>

      {isExpanded && (hasChildren || isAddingChildFolder) && (
        <TreeIndent>
          <div className="flex flex-col gap-0.5">
            {isAddingChildFolder && (
              <AddFolderEntry
                onCancel={() => setIsAddingChildFolder(false)}
                onSuccess={(name) => {
                  onCreateChildGroup(groupId, name);
                  setIsAddingChildFolder(false);
                }}
              />
            )}
            {sortedChildren.map((child: any) => {
              if (child.type === "group") {
                const subGroup = allGroups[child.id];
                if (!subGroup) return null;
                return (
                  <FolderNode
                    key={child.id}
                    groupId={child.id}
                    group={subGroup}
                    allGroups={allGroups}
                    modules={modules}
                    depth={depth + 1}
                    onSelectModule={onSelectModule}
                    onRenameModule={onRenameModule}
                    onUninstallModule={onUninstallModule}
                    onRenameGroup={onRenameGroup}
                    onDeleteGroup={onDeleteGroup}
                    onCreateChildGroup={onCreateChildGroup}
                    activeDragId={activeDragId}
                  />
                );
              } else {
                const refData = modules[child.id];
                if (!refData) return null;
                return (
                  <ModuleNode
                    key={child.id}
                    name={child.id}
                    refData={refData}
                    onSelect={onSelectModule}
                    onRename={onRenameModule}
                    onUninstall={onUninstallModule}
                    activeDragId={activeDragId}
                  />
                );
              }
            })}
          </div>
        </TreeIndent>
      )}
    </div>
  );
}

interface AddModuleEntryProps {
  onCancel: () => void;
  onSuccess: () => void;
  modules: Record<string, ModuleRef>;
}

function AddModuleEntry({ onCancel, onSuccess, modules }: AddModuleEntryProps) {
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

      const specData = workspaceEngine.store.getState().workspace.spec
        .data as any;
      const rootModuleGroups = specData
        ? [...(specData.rootModuleGroups || [])]
        : [];
      if (!rootModuleGroups.includes(trimmed)) {
        rootModuleGroups.push(trimmed);
      }

      workspaceEngine.updateWorkspaceSpec({
        spec: {
          modules: updated,
          rootModuleGroups,
        },
      });
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
      icon={standardIcons.module}
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
  const engine = useUbentoEngine();
  const workspaceEngine = useWorkspaceEngine();
  const updateSettings = workspaceEngine.userSetting.update;

  const [isAdding, setIsAdding] = React.useState(false);
  const [isAddingFolder, setIsAddingFolder] = React.useState(false);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const specData = workspaceEngine.useState((s) => s.workspace.spec);
  const modules = specData.isValid ? specData.data.modules || {} : {};
  const moduleGroups = specData.isValid ? specData.data.moduleGroups || {} : {};
  const rootModuleGroups = specData.isValid
    ? specData.data.rootModuleGroups || []
    : [];

  // Compute all referenced ids to find orphans
  const referencedIds = new Set<string>();
  for (const group of Object.values(moduleGroups) as any[]) {
    for (const entry of group.entries || []) {
      referencedIds.add(entry.id);
    }
  }
  for (const id of rootModuleGroups) {
    referencedIds.add(id);
  }

  const orphanModuleIds = Object.keys(modules).filter(
    (id) => !referencedIds.has(id),
  );
  const orphanGroupIds = Object.keys(moduleGroups).filter(
    (id) => !referencedIds.has(id),
  );

  // Combined root entries list
  const rootEntries = [
    ...rootModuleGroups,
    ...orphanGroupIds,
    ...orphanModuleIds,
  ];
  const sortedRootEntries = sortEntries(rootEntries, modules, moduleGroups);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const { setNodeRef: setRootDroppableRef, isOver: isOverRoot } = useDroppable({
    id: "nest-target:root",
  });

  const handleSelectModule = (refData: ModuleRef) => {
    updateSettings({
      editingModule: refData,
      mode: "edit",
    });
  };

  const handleRenameModule = async (oldName: string, newName: string) => {
    if (!/^[a-z0-9\.\-_]+$/.test(newName)) {
      alert(
        "Name must be lowercase and contain only letters, numbers, dot, hyphen, or underscore.",
      );
      return;
    }

    if (modules[newName]) {
      alert(`A module named "${newName}" already exists.`);
      return;
    }

    try {
      const updatedModules = { ...modules };
      updatedModules[newName] = updatedModules[oldName];
      delete updatedModules[oldName];

      const updatedGroups = { ...moduleGroups };
      for (const gid in updatedGroups) {
        const g = updatedGroups[gid];
        if (g.entries) {
          updatedGroups[gid] = {
            ...g,
            entries: g.entries.map((e: any) =>
              e.type === "module" && e.id === oldName
                ? { ...e, id: newName }
                : e,
            ),
          };
        }
      }

      let updatedRoots = [...rootModuleGroups];
      updatedRoots = updatedRoots.map((id) => (id === oldName ? newName : id));

      workspaceEngine.updateWorkspaceSpec({
        spec: {
          modules: updatedModules,
          moduleGroups: updatedGroups,
          rootModuleGroups: updatedRoots,
        },
      });

      engine.notify({
        title: "Module Renamed",
        message: `Successfully renamed to ${newName}`,
        type: "success",
      });
    } catch (err) {
      engine.notify({
        title: "Rename Failed",
        message: "Could not rename module",
        type: "error",
      });
    }
  };

  const handleUninstallModule = async (name: string) => {
    if (!confirm(`Are you sure you want to uninstall module "${name}"?`))
      return;

    try {
      const updatedModules = { ...modules };
      delete updatedModules[name];

      const updatedGroups = { ...moduleGroups };
      for (const gid in updatedGroups) {
        const g = updatedGroups[gid];
        if (g.entries) {
          updatedGroups[gid] = {
            ...g,
            entries: g.entries.filter((e: any) => e.id !== name),
          };
        }
      }

      const updatedRoots = rootModuleGroups.filter((id) => id !== name);

      workspaceEngine.updateWorkspaceSpec({
        spec: {
          modules: updatedModules,
          moduleGroups: updatedGroups,
          rootModuleGroups: updatedRoots,
        },
      });

      engine.notify({
        title: "Module Uninstalled",
        message: `Successfully uninstalled "${name}"`,
        type: "success",
      });
    } catch (err) {
      engine.notify({
        title: "Uninstall Failed",
        message: "Could not uninstall module",
        type: "error",
      });
    }
  };

  const handleRenameGroup = async (groupId: string, newName: string) => {
    try {
      const updatedGroups = { ...moduleGroups };
      if (updatedGroups[groupId]) {
        updatedGroups[groupId] = {
          ...updatedGroups[groupId],
          name: newName,
        };

        workspaceEngine.updateWorkspaceSpec({
          spec: { moduleGroups: updatedGroups },
        });

        engine.notify({
          title: "Folder Renamed",
          message: `Successfully renamed to ${newName}`,
          type: "success",
        });
      }
    } catch (err) {
      engine.notify({
        title: "Rename Failed",
        message: "Could not rename folder",
        type: "error",
      });
    }
  };

  const handleDeleteGroup = async (groupId: string, groupName: string) => {
    if (
      !confirm(
        `Are you sure you want to delete folder "${groupName}" and all its contents?`,
      )
    )
      return;

    try {
      const updatedGroups = { ...moduleGroups };
      const updatedModules = { ...modules };
      let updatedRoots = [...rootModuleGroups];

      const groupIdsToDelete = new Set<string>([groupId]);
      const moduleIdsToDelete = new Set<string>();

      const collectDescendants = (id: string) => {
        const g = updatedGroups[id];
        if (g && g.entries) {
          for (const entry of g.entries) {
            if (entry.type === "group") {
              groupIdsToDelete.add(entry.id);
              collectDescendants(entry.id);
            } else if (entry.type === "module") {
              moduleIdsToDelete.add(entry.id);
            }
          }
        }
      };
      collectDescendants(groupId);

      for (const gid of groupIdsToDelete) {
        delete updatedGroups[gid];
      }
      for (const mid of moduleIdsToDelete) {
        delete updatedModules[mid];
      }

      for (const gid in updatedGroups) {
        const g = updatedGroups[gid];
        if (g.entries) {
          updatedGroups[gid] = {
            ...g,
            entries: g.entries.filter((e: any) => e.id !== groupId),
          };
        }
      }

      updatedRoots = updatedRoots.filter((id) => id !== groupId);

      workspaceEngine.updateWorkspaceSpec({
        spec: {
          moduleGroups: updatedGroups,
          modules: updatedModules,
          rootModuleGroups: updatedRoots,
        },
      });

      engine.notify({
        title: "Folder Deleted",
        message: `Successfully deleted folder "${groupName}"`,
        type: "success",
      });
    } catch (err) {
      engine.notify({
        title: "Delete Failed",
        message: "Could not delete folder",
        type: "error",
      });
    }
  };

  const handleCreateChildGroup = async (parentId: string, name: string) => {
    try {
      const updatedGroups = { ...moduleGroups };
      const newGroupId = Math.random().toString(36).substring(7);

      updatedGroups[newGroupId] = {
        name,
        entries: [],
      };

      const parentGroup = updatedGroups[parentId];
      if (parentGroup) {
        updatedGroups[parentId] = {
          ...parentGroup,
          entries: [
            ...(parentGroup.entries || []),
            { type: "group", id: newGroupId },
          ],
        };
      }

      workspaceEngine.updateWorkspaceSpec({
        spec: { moduleGroups: updatedGroups },
      });

      workspaceEngine.userSetting.update((s) => ({
        moduleExplorer: {
          ...s.moduleExplorer,
          expandedStates: {
            ...s.moduleExplorer?.expandedStates,
            [parentId]: true,
          },
        },
      }));

      engine.notify({
        title: "Folder Created",
        message: `Successfully created folder "${name}"`,
        type: "success",
      });
    } catch (err) {
      engine.notify({
        title: "Creation Failed",
        message: "Could not create child folder",
        type: "error",
      });
    }
  };

  const handleCreateRootGroup = async (name: string) => {
    try {
      const updatedGroups = { ...moduleGroups };
      const updatedRoots = [...rootModuleGroups];
      const newGroupId = Math.random().toString(36).substring(7);

      updatedGroups[newGroupId] = {
        name,
        entries: [],
      };
      updatedRoots.push(newGroupId);

      workspaceEngine.updateWorkspaceSpec({
        spec: {
          moduleGroups: updatedGroups,
          rootModuleGroups: updatedRoots,
        },
      });

      engine.notify({
        title: "Folder Created",
        message: `Successfully created folder "${name}"`,
        type: "success",
      });
    } catch (err) {
      engine.notify({
        title: "Creation Failed",
        message: "Could not create folder",
        type: "error",
      });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);

    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const wsSpec = workspaceEngine?.store.getState().workspace.spec.data as any;
    if (!wsSpec) return;

    let updatedGroups = { ...(wsSpec.moduleGroups || {}) };
    const currentModules = wsSpec.modules || {};

    const isGroup = !!updatedGroups[activeId];
    const activeType = isGroup ? "group" : "module";

    // Build the initial roots including orphans so drag-and-drop can clean/migrate them
    const refIds = new Set<string>();
    for (const group of Object.values(updatedGroups) as any[]) {
      for (const entry of group.entries || []) {
        refIds.add(entry.id);
      }
    }
    const currentRoots = wsSpec.rootModuleGroups || [];
    for (const id of currentRoots) {
      refIds.add(id);
    }
    const orphanMods = Object.keys(currentModules).filter(
      (id) => !refIds.has(id),
    );
    const orphanGrps = Object.keys(updatedGroups).filter(
      (id) => !refIds.has(id),
    );
    let updatedRoots = [...currentRoots, ...orphanGrps, ...orphanMods];

    // Remove from old position
    const removedResult = removeIdFromTree(
      updatedGroups,
      updatedRoots,
      activeId,
    );
    updatedGroups = removedResult.moduleGroups;
    updatedRoots = removedResult.rootModuleGroups;

    // Insert into new position
    if (overId === "nest-target:root") {
      updatedRoots.push(activeId);
    } else if (overId.startsWith("nest-target:")) {
      const targetParentId = overId.replace("nest-target:", "");
      if (targetParentId === activeId) return;

      const parentGroup = updatedGroups[targetParentId];
      if (parentGroup) {
        updatedGroups[targetParentId] = {
          ...parentGroup,
          entries: [
            ...(parentGroup.entries || []),
            { type: activeType, id: activeId },
          ],
        };
      }
    } else {
      return;
    }

    try {
      workspaceEngine?.updateWorkspaceSpec({
        spec: {
          moduleGroups: updatedGroups,
          rootModuleGroups: updatedRoots,
        },
      });
      engine.notify({
        title: "Module Moved",
        message: "Successfully moved the item",
        type: "success",
      });
    } catch (err) {
      engine.notify({
        title: "Move Failed",
        message: "Failed to persist move",
        type: "error",
      });
    }
  };

  const { push } = useAppModal();

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
            icon: <FolderPlus size={16} />,
            title: "Create Folder",
            handler: () => setIsAddingFolder(true),
          },
          {
            icon: <Globe2 size={16} />,
            title: "Browse Modules",
            handler: () => push(appModalRoutes.assets.browse),
          },
        ]}
      >
        <div
          ref={setRootDroppableRef}
          className={clsx(
            "flex flex-col gap-0.5 w-full min-h-[150px] transition-all rounded-xl",
            {
              "bg-current/5 ring-2 ring-dashed ring-accent":
                isOverRoot && activeDragId,
            },
          )}
        >
          {isAdding && (
            <AddModuleEntry
              modules={modules}
              onCancel={() => setIsAdding(false)}
              onSuccess={() => setIsAdding(false)}
            />
          )}

          {isAddingFolder && (
            <AddFolderEntry
              onCancel={() => setIsAddingFolder(false)}
              onSuccess={(name) => {
                handleCreateRootGroup(name);
                setIsAddingFolder(false);
              }}
            />
          )}

          {sortedRootEntries.length > 0
            ? sortedRootEntries.map((id) => {
                const isGroup = !!moduleGroups[id];
                if (isGroup) {
                  const group = moduleGroups[id];
                  return (
                    <FolderNode
                      key={id}
                      groupId={id}
                      group={group}
                      allGroups={moduleGroups}
                      modules={modules}
                      depth={0}
                      onSelectModule={handleSelectModule}
                      onRenameModule={handleRenameModule}
                      onUninstallModule={handleUninstallModule}
                      onRenameGroup={handleRenameGroup}
                      onDeleteGroup={handleDeleteGroup}
                      onCreateChildGroup={handleCreateChildGroup}
                      activeDragId={activeDragId}
                    />
                  );
                } else {
                  const refData = modules[id];
                  if (!refData) return null;
                  return (
                    <ModuleNode
                      key={id}
                      name={id}
                      refData={refData}
                      onSelect={handleSelectModule}
                      onRename={handleRenameModule}
                      onUninstall={handleUninstallModule}
                      activeDragId={activeDragId}
                    />
                  );
                }
              })
            : !isAdding &&
              !isAddingFolder && (
                <div className="px-3 py-4 text-center my-auto">
                  <p className="text-[11px] text-content-muted italic">
                    No modules installed
                  </p>
                </div>
              )}
        </div>
      </SideSection>
    </DndContext>
  );
}
