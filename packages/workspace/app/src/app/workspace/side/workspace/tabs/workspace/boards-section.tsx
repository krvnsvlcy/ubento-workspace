import { standardIcons } from "@/components/icon/icon";
import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import { TreeIndent } from "@/components/tree/tree-indent";
import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbentoEngine } from "@/hooks/app-engine";
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
import { ModuleRef, WorkspaceBoardSpec } from "@ubento/bento.runtime";
import clsx from "clsx";
import { Edit2, Home, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import React, { useCallback, useState } from "react";

function removeIdFromTree(
  boards: Record<string, any>,
  children: string[],
  idToRemove: string,
): { boards: Record<string, any>; children: string[] } {
  const nextBoards = { ...boards };
  let nextChildren = children.filter((id) => id !== idToRemove);

  for (const id in nextBoards) {
    const board = nextBoards[id];
    if (board.children) {
      nextBoards[id] = {
        ...board,
        children: board.children.filter((cid: string) => cid !== idToRemove),
      };
    }
  }

  return { boards: nextBoards, children: nextChildren };
}

function insertIdIntoArray(
  arr: string[],
  idToInsert: string,
  beforeId: string | null,
  afterId: string | null,
): string[] {
  let index = arr.length;
  if (beforeId !== "null" && beforeId !== null) {
    const idx = arr.indexOf(beforeId);
    if (idx !== -1) {
      index = idx + 1;
    }
  } else if (afterId !== "null" && afterId !== null) {
    const idx = arr.indexOf(afterId);
    if (idx !== -1) {
      index = idx;
    }
  }
  const next = [...arr];
  next.splice(index, 0, idToInsert);
  return next;
}

interface SeparatorProps {
  id: string;
  activeDragId: string | null;
}

function SeparatorDropZone({ id, activeDragId }: SeparatorProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  if (!activeDragId) {
    return <div className="h-[2px] w-full" />;
  }

  const parts = id.split(":");
  const beforeId = parts[2];
  const afterId = parts[3];

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
            "h-[4px] bg-base": isOver,
            "h-[2px] bg-transparent hover:bg-content/10": !isOver,
          },
        )}
      />
    </div>
  );
}

interface BoardNodeProps {
  board: WorkspaceBoardSpec;
  allBoards: Record<string, any>;
  activeBoardId: string | undefined;
  depth: number;
  onSelect: (boardId: string, module: ModuleRef) => void;
  onRename: (boardId: string, newName: string) => Promise<void>;
  onDelete: (boardId: string, boardName: string) => Promise<void>;
  onCreateChild: (parentId: string) => Promise<void>;
  activeDragId: string | null;
  homeBoardId: string | undefined;
}

function BoardNode({
  board,
  allBoards,
  activeBoardId,
  depth,
  onSelect,
  onRename,
  onDelete,
  onCreateChild,
  activeDragId,
  homeBoardId,
}: BoardNodeProps) {
  const workspaceEngine = useWorkspaceEngine();
  const engine = useUbentoEngine();
  const isExpanded = workspaceEngine.userSetting.useState(
    (s) => s.data.boardExplorer?.expandedStates?.[board.id],
  );
  const childBoards = (board.children || [])
    .map((cid: string) => allBoards[cid])
    .filter(Boolean);

  const hasChildren = childBoards.length > 0;
  const isHome = homeBoardId === board.id;

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({
    id: board.id,
  });

  const { setNodeRef: setNestRef, isOver: isOverNest } = useDroppable({
    id: `nest-target:${board.id}`,
    disabled: activeDragId === board.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
  };

  const toggleExpanded = useCallback(() => {
    workspaceEngine.userSetting.update((s) => {
      const update = {
        boardExplorer: {
          ...s.boardExplorer,
          expandedStates: {
            ...s.boardExplorer?.expandedStates,
            [board.id]: !s.boardExplorer?.expandedStates?.[board.id],
          },
        },
      };

      return update;
    });
  }, [board.id, workspaceEngine]);

  const showMenu = useCallback(
    (x: number, y: number) => {
      const items = [
        {
          id: "create-child",
          label: "Create child board",
          icon: <Plus size={14} />,
          action: () => {
            onCreateChild(board.id);
          },
        },
        {
          id: "rename",
          label: "Rename",
          icon: <Edit2 size={14} />,
          action: () => {
            const newTitle = prompt("Enter new title:", board.title);
            if (newTitle) onRename(board.id, newTitle);
          },
        },
        {
          id: "delete",
          label: "Delete",
          icon: <Trash2 size={14} />,
          action: () => {
            onDelete(board.id, board.title);
          },
        },
      ];

      if (!isHome) {
        items.push({
          id: "set-home",
          label: "Set as home board",
          icon: <Home size={14} />,
          action: () => {
            workspaceEngine?.updateWorkspaceSpec({
              spec: {
                home: board.id,
              },
            });
            engine.notify({
              title: "Home Board Set",
              message: `Successfully set "${board.title}" as home board`,
              type: "success",
            });
          },
        });
      }

      engine.openContextMenu({ x, y }, items);
    },
    [
      board.id,
      board.title,
      isHome,
      onCreateChild,
      onRename,
      onDelete,
      workspaceEngine,
      engine,
    ],
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      showMenu(e.clientX, e.clientY);
    },
    [showMenu],
  );

  return (
    <div style={style} className="w-full">
      <div
        ref={(node) => {
          setNestRef(node);
          setDragRef(node);
        }}
        {...attributes}
        {...listeners}
        onContextMenu={handleContextMenu}
        className={clsx(
          "relative cursor-pointer select-none rounded-lg transition-all duration-150",
          {
            "ring-2 ring-accent ring-dashed bg-base/5": isOverNest,
          },
        )}
      >
        <TreeEntry
          icon={isHome ? standardIcons.home : standardIcons.board}
          isContainer={hasChildren}
          active={activeBoardId === board.id}
          isOpen={isExpanded}
          onOpenChange={toggleExpanded}
          actions={[
            {
              icon: <MoreHorizontal size={14} />,
              title: "More actions",
              handler: (e: React.MouseEvent) => {
                e.stopPropagation();
                showMenu(e.clientX, e.clientY);
              },
            },
          ]}
          onClick={() => onSelect(board.id, board.module)}
        >
          <span className="truncate">{board.title}</span>
        </TreeEntry>
      </div>

      {isExpanded && hasChildren && (
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
                  allBoards={allBoards}
                  activeBoardId={activeBoardId}
                  depth={depth + 1}
                  onSelect={onSelect}
                  onRename={onRename}
                  onDelete={onDelete}
                  onCreateChild={onCreateChild}
                  activeDragId={activeDragId}
                  homeBoardId={homeBoardId}
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

export function BoardsSection() {
  const engine = useUbentoEngine();
  const workspaceEngine = useWorkspaceEngine();
  const updateSettings = workspaceEngine.userSetting.update;
  const activeBoardId = workspaceEngine.userSetting.useState(
    (s) => s.data?.board?.id,
  );

  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const specData = workspaceEngine.useState((s) => s.workspace.spec);
  const allBoards = specData.isValid ? specData.data.boards || {} : {};
  const rootChildrenIds = specData.isValid ? specData.data.roots || [] : [];
  const homeBoardId = specData.isValid ? specData.data.home : undefined;
  const rootBoards = rootChildrenIds
    .map((id: string) => allBoards[id])
    .filter(Boolean);

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

  const handleSelect = (boardId: string, module: ModuleRef) => {
    updateSettings({
      board: {
        id: boardId,
        params: {},
      },
      editingModule: module,
    });
  };

  const handleRename = async (boardId: string, newTitle: string) => {
    try {
      await workspaceEngine?.updateBoard({
        boardId,
        update: { title: newTitle },
      });
      engine.notify({
        title: "Board Renamed",
        message: `Successfully renamed to ${newTitle}`,
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

  const handleDelete = async (boardId: string, boardTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${boardTitle}"?`)) return;
    try {
      await workspaceEngine?.deleteBoard({ boardId });
      engine.notify({
        title: "Board Deleted",
        message: `Successfully deleted "${boardTitle}"`,
        type: "success",
      });
      if (activeBoardId === boardId) {
        updateSettings({ board: undefined });
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
      const board = await workspaceEngine?.createBoard({
        title,
        parentId,
      });

      if (board) {
        setExpandedIds((prev) => new Set([...prev, parentId]));
        updateSettings({
          board: {
            id: board.id,
            params: {},
          },
        });
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
      const board = await workspaceEngine?.createBoard({
        title,
        parentId: null,
      });

      if (board) {
        updateSettings({
          board: {
            id: board.id,
            params: {},
          },
        });
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

    const wsSpec = workspaceEngine?.store.getState().workspace.spec.data as any;
    if (!wsSpec) return;

    let boards = { ...(wsSpec.boards || {}) };
    let children = [...(wsSpec.roots || [])];

    const removedResult = removeIdFromTree(boards, children, activeId);
    boards = removedResult.boards;
    children = removedResult.children;

    if (overId.startsWith("sibling-separator:")) {
      const parts = overId.split(":");
      const parentIdStr = parts[1];
      const beforeId = parts[2];
      const afterId = parts[3];

      if (parentIdStr === "root") {
        children = insertIdIntoArray(children, activeId, beforeId, afterId);
      } else {
        const parentBoard = boards[parentIdStr];
        if (parentBoard) {
          boards[parentIdStr] = {
            ...parentBoard,
            children: insertIdIntoArray(
              parentBoard.children || [],
              activeId,
              beforeId,
              afterId,
            ),
          };
        }
      }
    } else if (overId.startsWith("nest-target:")) {
      const targetParentId = overId.replace("nest-target:", "");
      if (targetParentId === activeId) return;

      const parentBoard = boards[targetParentId];
      if (parentBoard) {
        boards[targetParentId] = {
          ...parentBoard,
          children: [...(parentBoard.children || []), activeId],
        };
      }
    } else {
      return;
    }

    try {
      workspaceEngine?.updateWorkspaceSpec({
        spec: {
          boards,
          roots: children,
        },
      });
      engine.notify({
        title: "Board Reordered",
        message: "Successfully moved the board",
        type: "success",
      });
    } catch (err) {
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
            {rootBoards.map((board, index: number) => (
              <React.Fragment key={board.id}>
                <BoardNode
                  board={board}
                  allBoards={allBoards}
                  activeBoardId={activeBoardId}
                  depth={0}
                  onSelect={handleSelect}
                  onRename={handleRename}
                  onDelete={handleDelete}
                  onCreateChild={handleCreateChild}
                  activeDragId={activeDragId}
                  homeBoardId={homeBoardId}
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
          <div className="text-xs text-content-subtle p-4 text-center">
            No boards found
          </div>
        )}
      </SideSection>
    </DndContext>
  );
}
