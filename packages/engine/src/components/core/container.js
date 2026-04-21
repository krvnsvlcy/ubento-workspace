import { jsx as _jsx } from "react/jsx-runtime";
import { Element } from "../element";
import { SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useSnapshot } from "valtio";
import { editorContext } from "../../models";
export function Container({ content, style }) {
    const editorSnap = useSnapshot(editorContext);
    const isEditMode = editorSnap.mode === "edit";
    const layoutStyle = {
        display: style.layout === "none" ? "block" : style.layout || "flex",
        flexDirection: style.direction,
        gap: style.gap ? `${style.gap.y ?? 0}px ${style.gap.x ?? 0}px` : undefined,
        padding: style.padding ? `${style.padding.top ?? 0}px ${style.padding.right ?? 0}px ${style.padding.bottom ?? 0}px ${style.padding.left ?? 0}px` : undefined,
        gridTemplateColumns: style.columns ? `repeat(${style.columns}, 1fr)` : undefined,
        gridTemplateRows: style.rows ? `repeat(${style.rows}, 1fr)` : undefined,
        alignItems: style.alignItems,
        justifyContent: style.justifyContent,
        width: style.width,
        height: style.height,
        minWidth: style.minWidth,
        maxWidth: style.maxWidth,
        minHeight: style.minHeight,
        maxHeight: style.maxHeight,
        backgroundColor: style.background,
        borderRadius: style.cornerRadius ? `${style.cornerRadius}px` : undefined,
        borderWidth: style.borderWidth ? `${style.borderWidth}px` : undefined,
        borderStyle: style.borderWidth ? "solid" : undefined,
        borderColor: style.borderColor,
        overflow: style.overflow,
    };
    const innerContent = (_jsx("div", { style: layoutStyle, children: content.map((childId) => (_jsx(Element, { id: childId }, childId))) }));
    if (!isEditMode) {
        return innerContent;
    }
    return (_jsx(SortableContext, { items: content, strategy: style.direction === "row" ? horizontalListSortingStrategy : verticalListSortingStrategy, children: innerContent }));
}
//# sourceMappingURL=container.js.map