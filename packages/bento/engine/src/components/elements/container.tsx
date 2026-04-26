import {
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSSProperties } from "react";
import { useSnapshot } from "valtio";
import { useEngineController } from "../../controller";
import { ContainerStyle } from "../../models";
import { Element } from "./element";

export function Container({
  content,
  style,
}: {
  content: string[];
  style: ContainerStyle;
}) {
  const controller = useEngineController();
  const snap = useSnapshot(controller.state);
  const isEditMode = snap.mode === "edit";

  const layoutStyle: CSSProperties = {
    display: style.layout === "none" ? "block" : style.layout || "flex",
    flexDirection: style.direction,
    gap: style.gap ? `${style.gap.y ?? 0}px ${style.gap.x ?? 0}px` : undefined,
    padding: style.padding
      ? `${style.padding.top ?? 0}px ${style.padding.right ?? 0}px ${style.padding.bottom ?? 0}px ${style.padding.left ?? 0}px`
      : undefined,
    gridTemplateColumns: style.columns
      ? `repeat(${style.columns}, 1fr)`
      : undefined,
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

  const innerContent = (
    <div style={layoutStyle}>
      {content.map((childId) => (
        <Element key={childId} id={childId} />
      ))}
    </div>
  );

  if (!isEditMode) {
    return innerContent;
  }

  return (
    <SortableContext
      items={content}
      strategy={
        style.direction === "row"
          ? horizontalListSortingStrategy
          : verticalListSortingStrategy
      }
    >
      {innerContent}
    </SortableContext>
  );
}
