import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import { TreeIndent } from "@/components/tree/tree-indent";
import {
  WorkspaceEngineProvider,
  useWorkspaceEngine,
} from "@/contexts/workspace";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@ubento/bento.arlo-core";
import { BoardSpec } from "@ubento/bento.core";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { WorkspaceTabDefinition } from "../../types";
import clsx from "clsx";

interface ElementNodeProps {
  elementId: string;
  elements: Record<string, any>;
  selection: string[];
  hoveredId?: string;
  onSelect: (elementId: string) => void;
  onHover: (elementId: string) => void;
  onUnhover: (elementId: string) => void;
  expandedIds: Set<string>;
  toggleExpanded: (id: string) => void;
  onDelete: (id: string) => void;
}

function ElementNode({
  elementId,
  elements,
  selection,
  hoveredId,
  onSelect,
  onHover,
  onUnhover,
  expandedIds,
  toggleExpanded,
  onDelete,
}: ElementNodeProps) {
  const element = elements[elementId];
  if (!element) return null;

  const childIds = element.children || [];
  const hasChildren = childIds.length > 0;
  const isExpanded = expandedIds.has(elementId);
  const isActive = selection.includes(elementId);
  const isHovered = hoveredId === elementId;

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(elementId);
  };

  const handleMouseEnter = () => {
    onHover(elementId);
  };

  const handleMouseLeave = () => {
    onUnhover(elementId);
  };

  return (
    <div className="w-full">
      <ContextMenu>
        <ContextMenuTrigger>
          <div onClick={handleSelect}>
            <TreeEntry
              icon="component"
              isContainer={hasChildren}
              active={isActive}
              isOpen={isExpanded}
              onOpenChange={() => toggleExpanded(elementId)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={clsx({
                "bg-neutral-surface-hover text-neutral-content": isHovered && !isActive,
              })}
            >
              {element.component}
            </TreeEntry>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.stopPropagation();
              onDelete(elementId);
            }}
          >
            <Trash2 size={12} className="mr-1.5" />
            <span>Delete Element</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {hasChildren && isExpanded && (
        <TreeIndent>
          <div className="flex flex-col gap-0.5 mt-0.5">
            {childIds.map((childId: string) => (
              <ElementNode
                key={childId}
                elementId={childId}
                elements={elements}
                selection={selection}
                hoveredId={hoveredId}
                onSelect={onSelect}
                onHover={onHover}
                onUnhover={onUnhover}
                expandedIds={expandedIds}
                toggleExpanded={toggleExpanded}
                onDelete={onDelete}
              />
            ))}
          </div>
        </TreeIndent>
      )}
    </div>
  );
}

export function BoardOutlineTab() {
  const workspaceEngine = useWorkspaceEngine();
  const location = workspaceEngine.appEngine.useState((s) => s.location);
  const selection = workspaceEngine.useState((s) => s.selection);
  const hoveredId = workspaceEngine.useState((s) => s.hover);
  const activeBoardId = location.board;

  const board = workspaceEngine.useState((s) =>
    activeBoardId ? s.boards[activeBoardId] : null,
  );

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const spec = (board?.spec?.isValid ? board.spec.data : undefined) as
    | BoardSpec
    | undefined;

  // Auto-expand all container nodes when active board changes
  useEffect(() => {
    if (spec?.elements) {
      const ids = new Set<string>();
      for (const [id, element] of Object.entries(spec.elements)) {
        if (element.children && element.children.length > 0) {
          ids.add(id);
        }
      }
      setExpandedIds(ids);
    }
  }, [activeBoardId, spec]);

  if (!board) {
    return (
      <div className="p-4 text-xs text-neutral-content-muted">
        No active board.
      </div>
    );
  }

  if (!board.spec.isValid || !spec) {
    return (
      <div className="p-4 text-xs text-neutral-content-muted flex flex-col gap-2">
        <span className="font-semibold text-red-400">
          Invalid board specification
        </span>
        {board.spec.issues?.map((issue, idx) => (
          <div
            key={idx}
            className="text-red-400 font-mono text-[10px] bg-red-400/5 p-1 rounded border border-red-400/10"
          >
            {issue.location.join(".")}: {issue.message}
          </div>
        ))}
      </div>
    );
  }

  const rootIds = spec.children || [];

  const handleSelect = (elementId: string) => {
    workspaceEngine.select([elementId]);
  };

  const handleHover = (elementId: string) => {
    workspaceEngine.hover(elementId);
  };

  const handleUnhover = (elementId: string) => {
    workspaceEngine.unhover(elementId);
  };

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const deleteElement = async (elementId: string) => {
    if (!spec || !activeBoardId) return;

    const newElements = { ...spec.elements };

    // Helper to recursively collect all child IDs to delete
    const collectChildIds = (id: string, ids: Set<string>) => {
      ids.add(id);
      const el = spec.elements?.[id];
      if (el?.children) {
        for (const childId of el.children) {
          collectChildIds(childId, ids);
        }
      }
    };

    const idsToDelete = new Set<string>();
    collectChildIds(elementId, idsToDelete);

    // Remove from elements map
    for (const id of idsToDelete) {
      delete newElements[id];
    }

    // Helper to remove element ID from children arrays
    const removeFromChildren = (childrenArr: string[]) => {
      return childrenArr.filter((id) => id !== elementId);
    };

    const newRootChildren = spec.children ? removeFromChildren(spec.children) : [];

    // Clean up parent references
    for (const [id, el] of Object.entries(newElements)) {
      if (el.children && el.children.includes(elementId)) {
        newElements[id] = {
          ...el,
          children: removeFromChildren(el.children),
        };
      }
    }

    const updatedSpec = {
      ...spec,
      children: newRootChildren,
      elements: newElements,
    };

    // If active selection contains deleted elements, clear or update selection
    const newSelection = selection.filter((id) => !idsToDelete.has(id));
    await workspaceEngine.writeBoardSpec({ boardId: activeBoardId, spec: updatedSpec });

    if (newSelection.length !== selection.length) {
      await workspaceEngine.select(newSelection);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-8">
      <SideSection title="Board Outline">
        {rootIds.length > 0 ? (
          <div className="flex flex-col gap-0.5">
            {rootIds.map((rootId: string) => (
              <ElementNode
                key={rootId}
                elementId={rootId}
                elements={spec.elements || {}}
                selection={selection}
                hoveredId={hoveredId}
                onSelect={handleSelect}
                onHover={handleHover}
                onUnhover={handleUnhover}
                expandedIds={expandedIds}
                toggleExpanded={toggleExpanded}
                onDelete={deleteElement}
              />
            ))}
          </div>
        ) : (
          <div className="text-xs text-neutral-content-subtle p-4 text-center">
            Empty board (no elements)
          </div>
        )}
      </SideSection>
    </div>
  );
}

export const boardTab: WorkspaceTabDefinition = {
  id: "board",
  name: "Board Outline",
  icon: "board",
  component: () => (
    <WorkspaceEngineProvider>
      <BoardOutlineTab />
    </WorkspaceEngineProvider>
  ),
  enabled: ({ workspaceMode, location }) => {
    return workspaceMode === "edit" && !!location.board;
  },
};
