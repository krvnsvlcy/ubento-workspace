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
import { useAppEngineController } from "../controller";
import { ContainerData, PageData } from "../models";
import { Element, ElementRegistryProvider } from "./elements/element";

function PageContent({ page }: { page: PageData }): React.JSX.Element {
  const controller = useAppEngineController();
  const snap = useSnapshot(page);

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
      if (el.type === "container" && el.content?.includes(activeId))
        activeParentId = key;
      if (el.type === "container" && el.content?.includes(overId))
        overParentId = key;
    }

    if (!activeParentId || !overParentId) return;

    const sourceParent = snap.elements[activeParentId] as ContainerData;
    const targetParent = snap.elements[overParentId] as ContainerData;

    if (activeParentId === overParentId) {
      // Same container - reorder
      const oldIndex = sourceParent.content.indexOf(activeId);
      const newIndex = sourceParent.content.indexOf(overId);
      sourceParent.content = arrayMove(
        sourceParent.content,
        oldIndex,
        newIndex,
      );
    } else {
      // Different containers - move
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

export function Page({
  id,
}: {
  id: string;
  params?: Record<string, any>;
}): React.JSX.Element {
  const controller = useAppEngineController();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState<PageData | undefined>();

  useEffect(() => {
    controller
      .getPage(id)
      .then((page) => {
        setPage(page);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, controller]);

  if (loading) return <PendingView message="Loading page..." />;
  if (error) return <ErrorView message="Failed to load page" />;
  if (!page) return <ErrorView message="Page not found" />;

  return <PageContent page={page} />;
}
