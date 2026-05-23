import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import { TreeIndent } from "@/components/tree/tree-indent";
import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbento, useUbentoEngine } from "@/engine/app/engine";
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
import { workspaceClient } from "@ubento/services.sdk";
import clsx from "clsx";
import { generateKeyBetween } from "fractional-indexing";
import React, { useState } from "react";

// Helper to calculate the new lexicographical fractional index safely
function calculateNewIndex(
  beforeIndex: string | null | undefined,
  afterIndex: string | null | undefined,
): string {
  try {
    return generateKeyBetween(beforeIndex || null, afterIndex || null);
  } catch (err) {
    console.error(
      "Failed to generate keys between:",
      beforeIndex,
      afterIndex,
      err,
    );
    if (!beforeIndex && !afterIndex) return "a0";
    if (!beforeIndex) {
      return (afterIndex || "a0") + "a";
    }
    return (beforeIndex || "a0") + "z";
  }
}

interface SeparatorProps {
  id: string;
  activeDragId: string | null;
}

function SeparatorDropZone({ id, activeDragId }: SeparatorProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  // Only show active separators when dragging is in progress
  if (!activeDragId) {
    return <div className="h-[2px] w-full" />;
  }

  const parts = id.split(":");
  const beforeId = parts[2];
  const afterId = parts[3];

  // Do not show drop zones adjacent to the dragged item itself
  if (activeDragId === beforeId || activeDragId === afterId) {
    return <div className="h-[2px] w-full" />;
  }

  return (
    <div
      ref={setNodeRef}
      className={clsx("w-full transition-all duration-150 relative z-10", {
        "h-4 my-1": isOver,
        "h-1.5": !isOver,
      })}
    >
      <div
        className={clsx(
          "absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full transition-all",
          {
            "h-[4px] bg-accent": isOver,
            "h-[2px] bg-transparent hover:bg-neutral-content/10": !isOver,
          },
        )}
      />
    </div>
  );
}

interface BoardNodeProps {
  board: workspaceClient.Board;
  workspaceId: string;
  activeBoardId: string | undefined;
  depth: number;
  onSelect: (boardId: string) => void;
  onRename: (boardId: string, newName: string) => Promise<void>;
  onDelete: (boardId: string, boardName: string) => Promise<void>;
  onCreateChild: (parentId: string) => Promise<void>;
  activeDragId: string | null;
  expandedIds: Set<string>;
  toggleExpanded: (id: string) => void;
}

function BoardNode({
  board,
  workspaceId,
  activeBoardId,
  depth,
  onSelect,
  onRename,
  onDelete,
  onCreateChild,
  activeDragId,
  expandedIds,
  toggleExpanded,
}: BoardNodeProps) {
  const ubento = useUbento();
  const isExpanded = expandedIds.has(board.id);

  // Fetch children of this board
  const { data: childBoards } = ubento.workspace.useBoards(
    { workspace_id: workspaceId, parent_id: board.id },
    { enabled: !!workspaceId },
  );

  const hasChildren = childBoards && childBoards.length > 0;

  // Draggable properties
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({
    id: board.id,
  });

  // Droppable properties for nesting
  const { setNodeRef: setNestRef, isOver: isOverNest } = useDroppable({
    id: `nest-target:${board.id}`,
    disabled: activeDragId === board.id, // cannot drop on itself
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleExpanded(board.id);
  };

  return (
    <div style={style} className="w-full">
      <div
        ref={(node) => {
          setNestRef(node);
          setDragRef(node);
        }}
        {...attributes}
        {...listeners}
        onClick={() => onSelect(board.id)}
        className={clsx(
          "relative cursor-pointer select-none rounded-lg transition-all duration-150",
          {
            "ring-2 ring-accent ring-dashed bg-accent/5": isOverNest,
          },
        )}
      >
        <TreeEntry
          icon="board"
          isContainer={hasChildren}
          active={activeBoardId === board.id}
          isOpen={isExpanded}
          onOpenChange={() => toggleExpanded(board.id)}
          actions={[
            {
              icon: "plus" as any,
              title: "Create child board",
              handler: (e: React.MouseEvent) => {
                e.stopPropagation();
                onCreateChild(board.id);
              },
            },
            {
              icon: "edit" as any,
              title: "Rename",
              handler: (e: React.MouseEvent) => {
                e.stopPropagation();
                const newName = prompt("Enter new name:", board.name);
                if (newName) onRename(board.id, newName);
              },
            },
            {
              icon: "trash" as any,
              title: "Delete",
              handler: (e: React.MouseEvent) => {
                e.stopPropagation();
                onDelete(board.id, board.name);
              },
            },
          ]}
        >
          <span className="truncate">{board.name}</span>
        </TreeEntry>
      </div>

      {isExpanded && (
        <TreeIndent>
          <div className="flex flex-col">
            <SeparatorDropZone
              id={`sibling-separator:${board.id}:null:${childBoards[0].id}`}
              activeDragId={activeDragId}
            />
            {childBoards.map((child, index) => (
              <React.Fragment key={child.id}>
                <BoardNode
                  board={child}
                  workspaceId={workspaceId}
                  activeBoardId={activeBoardId}
                  depth={depth + 1}
                  onSelect={onSelect}
                  onRename={onRename}
                  onDelete={onDelete}
                  onCreateChild={onCreateChild}
                  activeDragId={activeDragId}
                  expandedIds={expandedIds}
                  toggleExpanded={toggleExpanded}
                />
                <SeparatorDropZone
                  id={`sibling-separator:${board.id}:${child.id}:${
                    childBoards[index + 1]?.id || "null"
                  }`}
                  activeDragId={activeDragId}
                />
              </React.Fragment>
            ))}
          </div>
        </TreeIndent>
      )}
    </div>
  );
}

export function BoardsSection({
  workspace,
}: {
  workspace: workspaceClient.Workspace;
}) {
  const engine = useUbentoEngine();
  const ubento = useUbento();
  const location = engine.useState((s) => s.location);
  const workspaceEngine = useWorkspaceEngine();
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Fetch root boards (where parent_id is null)
  const { data: rootBoards } = ubento.workspace.useBoards(
    { workspace_id: workspace.id, parent_id: null },
    { enabled: !!workspace.id },
  );

  // Setup sensors with distance activation constraint to allow buttons clicks
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

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

  const handleSelect = (boardId: string) => {
    engine.goToLocation({ board: boardId });
  };

  const handleRename = async (boardId: string, newName: string) => {
    try {
      await workspaceEngine?.updateBoard({
        boardId,
        update: { title: newName },
      });
      engine.notify({
        title: "Board Renamed",
        message: `Successfully renamed to ${newName}`,
        type: "success",
      });
    } catch (err) {
      engine.notify({
        title: "Rename Failed",
        message: "Could not rename board",
        type: "error",
      });
    }
  };

  const handleDelete = async (boardId: string, boardName: string) => {
    if (!confirm(`Are you sure you want to delete "${boardName}"?`)) return;
    try {
      await workspaceEngine?.deleteBoard({ boardId });
      engine.notify({
        title: "Board Deleted",
        message: `Successfully deleted "${boardName}"`,
        type: "success",
      });
      if (location.board === boardId) {
        engine.goToLocation({ board: undefined });
      }
    } catch (err) {
      engine.notify({
        title: "Delete Failed",
        message: "Could not delete board",
        type: "error",
      });
    }
  };

  const handleCreateChild = async (parentId: string) => {
    const title = prompt("Enter child board name:");
    if (!title) return;
    try {
      // Find the last board under the parent to calculate index
      const siblings = Object.values(
        ubento.workspace.boardStore.store.getState().data,
      ).filter((b) => b.parent_id === parentId);
      siblings.sort((a, b) => (a.index || "").localeCompare(b.index || ""));
      const lastChild = siblings[siblings.length - 1];
      const index = calculateNewIndex(lastChild?.index, null);

      const board = await workspaceEngine?.createBoard({
        title,
        parentId,
        index,
      });

      if (board) {
        // Auto expand parent
        setExpandedIds((prev) => new Set([...prev, parentId]));
        engine.goToLocation({ board: board.id });
      }
    } catch (err) {
      engine.notify({
        title: "Creation Failed",
        message: "Could not create child board",
        type: "error",
      });
    }
  };

  const handleCreateRoot = async () => {
    const title = prompt("Enter board name:");
    if (!title) return;
    try {
      // Find last root board to calculate index
      const siblings = Object.values(
        ubento.workspace.boardStore.store.getState().data,
      ).filter((b) => b.parent_id === null);
      siblings.sort((a, b) => (a.index || "").localeCompare(b.index || ""));
      const lastRoot = siblings[siblings.length - 1];
      const index = calculateNewIndex(lastRoot?.index, null);

      const board = await workspaceEngine?.createBoard({
        title,
        parentId: null,
        index,
      });

      if (board) {
        engine.goToLocation({ board: board.id });
      }
    } catch (err) {
      engine.notify({
        title: "Creation Failed",
        message: "Could not create board",
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

    const allBoards = Object.values(
      ubento.workspace.boardStore.store.getState().data,
    );
    const draggedBoard = allBoards.find((b) => b.id === activeId);
    if (!draggedBoard) return;

    let targetParentId: string | null = null;
    let newIndex = "";

    if (overId.startsWith("sibling-separator:")) {
      const parts = overId.split(":");
      const parentIdStr = parts[1];
      const beforeId = parts[2];
      const afterId = parts[3];

      targetParentId = parentIdStr === "root" ? null : parentIdStr;

      const siblings = allBoards.filter(
        (b) => b.parent_id === targetParentId && b.id !== activeId,
      );
      siblings.sort((a, b) => (a.index || "").localeCompare(b.index || ""));

      const beforeBoard =
        beforeId !== "null" ? siblings.find((b) => b.id === beforeId) : null;
      const afterBoard =
        afterId !== "null" ? siblings.find((b) => b.id === afterId) : null;

      newIndex = calculateNewIndex(beforeBoard?.index, afterBoard?.index);
    } else if (overId.startsWith("nest-target:")) {
      targetParentId = overId.replace("nest-target:", "");
      if (targetParentId === activeId) return;

      const siblings = allBoards.filter((b) => b.parent_id === targetParentId);
      siblings.sort((a, b) => (a.index || "").localeCompare(b.index || ""));
      const lastChild = siblings[siblings.length - 1];

      newIndex = calculateNewIndex(lastChild?.index, null);
    } else {
      return;
    }

    // Optimistic Update
    const originalParentId = draggedBoard.parent_id;
    const originalIndex = draggedBoard.index;

    ubento.workspace.boardStore.push({
      ...draggedBoard,
      parent_id: targetParentId,
      index: newIndex,
    });

    try {
      await workspaceEngine?.updateBoard({
        boardId: activeId,
        update: {
          parentId: targetParentId,
          index: newIndex,
        },
      });
      engine.notify({
        title: "Board Reordered",
        message: "Successfully moved the board",
        type: "success",
      });
    } catch (err) {
      // Rollback
      ubento.workspace.boardStore.push({
        ...draggedBoard,
        parent_id: originalParentId,
        index: originalIndex,
      });
      engine.notify({
        title: "Reorder Failed",
        message: "Failed to persist order",
        type: "error",
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SideSection
        title="Boards"
        actionMode="visible"
        actions={[
          {
            icon: "plus",
            title: "Create Board",
            handler: handleCreateRoot,
          },
        ]}
      >
        {rootBoards && rootBoards.length > 0 ? (
          <>
            <SeparatorDropZone
              id={`sibling-separator:root:null:${rootBoards[0].id}`}
              activeDragId={activeDragId}
            />
            {rootBoards.map((board, index) => (
              <React.Fragment key={board.id}>
                <BoardNode
                  board={board}
                  workspaceId={workspace.id}
                  activeBoardId={location.board}
                  depth={0}
                  onSelect={handleSelect}
                  onRename={handleRename}
                  onDelete={handleDelete}
                  onCreateChild={handleCreateChild}
                  activeDragId={activeDragId}
                  expandedIds={expandedIds}
                  toggleExpanded={toggleExpanded}
                />
                <SeparatorDropZone
                  id={`sibling-separator:root:${board.id}:${
                    rootBoards[index + 1]?.id || "null"
                  }`}
                  activeDragId={activeDragId}
                />
              </React.Fragment>
            ))}
          </>
        ) : (
          <div className="text-xs text-neutral-content-subtle p-4 text-center">
            No boards found
          </div>
        )}
      </SideSection>
    </DndContext>
  );
}
