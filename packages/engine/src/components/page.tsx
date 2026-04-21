import React, { createContext, useContext, useMemo } from "react";
import { proxy, useSnapshot } from "valtio";
import { PageData, editorContext, ContainerData } from "../models";
import { Element, ElementRegistryProvider } from "./element";
import { 
  DndContext, 
  DragEndEvent, 
  PointerSensor, 
  useSensor, 
  useSensors,
  closestCenter,
  DragStartEvent
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export interface PageRegistry {
  [key: string]: PageData;
}
export const PageRegistryContext = createContext<PageRegistry>(proxy({}));

export function PageRegistryProvider({
  children,
  registry,
}: {
  children: React.ReactNode;
  registry: PageRegistry;
}): React.JSX.Element {
  const proxyRegistry = useMemo(() => proxy(registry), [registry]);

  return (
    <PageRegistryContext.Provider value={proxyRegistry}>
      {children}
    </PageRegistryContext.Provider>
  );
}

export function Page({ id }: { id: string }): React.JSX.Element {
  const registry = useContext(PageRegistryContext);
  const editorSnap = useSnapshot(editorContext);
  const page = registry[id];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  if (!page) {
    return <></>;
  }

  const handleDragStart = (event: DragStartEvent) => {
    editorContext.selection = [event.active.id as string];
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find parents
    let activeParentId: string | null = null;
    let overParentId: string | null = null;

    for (const [key, el] of Object.entries(page.elements)) {
      if (el.type === "container" && el.content?.includes(activeId)) activeParentId = key;
      if (el.type === "container" && el.content?.includes(overId)) overParentId = key;
    }

    if (!activeParentId || !overParentId) return;

    const sourceParent = page.elements[activeParentId] as ContainerData;
    const targetParent = page.elements[overParentId] as ContainerData;

    if (activeParentId === overParentId) {
      // Same container - reorder
      const oldIndex = sourceParent.content.indexOf(activeId);
      const newIndex = sourceParent.content.indexOf(overId);
      sourceParent.content = arrayMove(sourceParent.content, oldIndex, newIndex);
    } else {
      // Different containers - move
      const sourceIndex = sourceParent.content.indexOf(activeId);
      const targetIndex = targetParent.content.indexOf(overId);
      
      sourceParent.content.splice(sourceIndex, 1);
      targetParent.content.splice(targetIndex, 0, activeId);
    }
  };

  const content = (
    <ElementRegistryProvider registry={page.elements as any}>
      <Element id={page.rootId} />
    </ElementRegistryProvider>
  );

  if (editorSnap.mode === "view") {
    return content;
  }

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
