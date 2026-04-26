import {
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSSProperties } from "react";
import { useSnapshot } from "valtio";
import { useEngineController } from "../../controller";
import { StackStyle } from "../../models";
import { Element } from "./element";

export function Stack({
  content,
  style,
}: {
  content: string[];
  style: StackStyle;
}) {
  const controller = useEngineController();
  const snap = useSnapshot(controller.state);
  const isEditMode = snap.mode === "edit";

  const layoutStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: style.direction,
    gap: style.gap,
    padding: style.padding
      ? `${style.padding.top ?? 0}px ${style.padding.right ?? 0}px ${style.padding.bottom ?? 0}px ${style.padding.left ?? 0}px`
      : undefined,
    alignItems: "stretch",
    justifyContent: style.justify,
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
