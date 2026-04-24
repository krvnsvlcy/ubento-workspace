import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { createContext, useContext, useMemo } from "react";
import { proxy, useSnapshot } from "valtio";
import { editorContext } from "../models";
import { Element, ElementRegistryProvider } from "./element";
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
export const PageRegistryContext = createContext(proxy({}));
export function PageRegistryProvider({ children, registry, }) {
    const proxyRegistry = useMemo(() => proxy(registry), [registry]);
    return (_jsx(PageRegistryContext.Provider, { value: proxyRegistry, children: children }));
}
export function Page({ id }) {
    const registry = useContext(PageRegistryContext);
    const editorSnap = useSnapshot(editorContext);
    const page = registry[id];
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5,
        },
    }));
    if (!page) {
        return _jsx(_Fragment, {});
    }
    const handleDragStart = (event) => {
        editorContext.selection = [event.active.id];
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id)
            return;
        const activeId = active.id;
        const overId = over.id;
        // Find parents
        let activeParentId = null;
        let overParentId = null;
        for (const [key, el] of Object.entries(page.elements)) {
            if (el.type === "container" && el.content?.includes(activeId))
                activeParentId = key;
            if (el.type === "container" && el.content?.includes(overId))
                overParentId = key;
        }
        if (!activeParentId || !overParentId)
            return;
        const sourceParent = page.elements[activeParentId];
        const targetParent = page.elements[overParentId];
        if (activeParentId === overParentId) {
            // Same container - reorder
            const oldIndex = sourceParent.content.indexOf(activeId);
            const newIndex = sourceParent.content.indexOf(overId);
            sourceParent.content = arrayMove(sourceParent.content, oldIndex, newIndex);
        }
        else {
            // Different containers - move
            const sourceIndex = sourceParent.content.indexOf(activeId);
            const targetIndex = targetParent.content.indexOf(overId);
            sourceParent.content.splice(sourceIndex, 1);
            targetParent.content.splice(targetIndex, 0, activeId);
        }
    };
    const content = (_jsx(ElementRegistryProvider, { registry: page.elements, children: _jsx(Element, { id: page.rootId }) }));
    if (editorSnap.mode === "view") {
        return content;
    }
    return (_jsx(DndContext, { sensors: sensors, collisionDetection: closestCenter, onDragStart: handleDragStart, onDragEnd: handleDragEnd, children: content }));
}
//# sourceMappingURL=page.js.map