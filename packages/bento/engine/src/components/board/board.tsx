import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { useEngineController } from "../../controller.js";
import { BoardData, StackData } from "../../models.js";
import { Element, ElementRegistryProvider } from "../elements/element.js";

function BoardContent({ board }: { board: BoardData }): React.JSX.Element {
  const controller = useEngineController();
  const snap = useSnapshot(board);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    controller.select([event.active.id as string]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find parents
    let activeParentId: string | null = null;
    let overParentId: string | null = null;

    for (const [key, el] of Object.entries(snap.elements)) {
      if (el.type === "stack" && el.content?.includes(activeId))
        activeParentId = key;
      if (el.type === "stack" && el.content?.includes(overId))
        overParentId = key;
    }

    if (!activeParentId || !overParentId) return;

    const sourceParent = snap.elements[activeParentId] as StackData;
    const targetParent = snap.elements[overParentId] as StackData;

    if (activeParentId === overParentId) {
      // Same stack - reorder
      const oldIndex = sourceParent.content.indexOf(activeId);
      const newIndex = sourceParent.content.indexOf(overId);
      sourceParent.content = arrayMove(
        sourceParent.content,
        oldIndex,
        newIndex,
      );
    } else {
      // Different stacks - move
      const sourceIndex = sourceParent.content.indexOf(activeId);
      const targetIndex = targetParent.content.indexOf(overId);

      sourceParent.content.splice(sourceIndex, 1);
      targetParent.content.splice(targetIndex, 0, activeId);
    }
  };

  const content = (
    <ElementRegistryProvider registry={snap.elements as any}>
      <Element id={snap.rootId} />
    </ElementRegistryProvider>
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {content}
    </DndContext>
  );
}

export function Board({
  id,
}: {
  id: string;
  params?: Record<string, any>;
}): React.JSX.Element {
  const controller = useEngineController();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [board, setBoard] = useState<BoardData | undefined>();

  useEffect(() => {
    controller
      .getBoard(id)
      .then((board) => {
        setBoard(board);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, controller]);

  if (loading) return <PendingView message="Loading board..." />;
  if (error) return <ErrorView message="Failed to load board" />;
  if (!board) return <ErrorView message="Board not found" />;

  return <BoardContent board={board} />;
}
