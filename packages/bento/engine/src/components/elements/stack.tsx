import {
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSSProperties, useState } from "react";
import { spacingBaseUnit } from "../../constants";
import { useEngine } from "../../engine";
import { StackData, StackStyle } from "../../models";
import { BaseElement, getBaseStyle } from "./base_element";

import { ComponentSelector } from "./component_selector";
import { Element } from "./element";
import { Initializer } from "./initializer";

export function Stack({ id, data }: { id: string; data: StackData }) {
  const isEditMode = useEngine((s) => s.mode === "edit");
  const setElementStyle = useEngine((s) => s.setElementStyle);
  const addElement = useEngine((s) => s.addElement);
  const getModule = useEngine((s) => s.getModule);
  const replaceElement = useEngine((s) => s.replaceElement);

  const [showMenu, setShowMenu] = useState(false);

  const style = data.style;

  const cssStyle: CSSProperties = {
    ...getBaseStyle(style),
    gap: style.gap ? `${style.gap * spacingBaseUnit}px` : undefined,

    display: "flex",
    flexWrap: "wrap",
    flexDirection: style.direction,
    alignContent: "flex-start",
    justifyContent: style.justify,
    overflow: style.overflow,
    position: "relative",
  };

  const isEmpty = data.content.length === 0;
  if (isEmpty && isEditMode) {
    cssStyle.border = "1px dashed #ddd";
    cssStyle.borderRadius = "10px";
  }

  const onAddStack = (direction: "row" | "column") => {
    // Update current stack style
    setElementStyle(id, {
      ...style,
      direction,
      gap: 1,
      padding: { top: 1, bottom: 1, left: 1, right: 1 },
    } as StackStyle);

    // Add 2 colored elements directly to this stack
    addElement(id, {
      type: "stack",
      content: [],
      style: {
        width: 4,
        height: 4,
      },
    });

    addElement(id, {
      type: "stack",
      content: [],
      style: {
        width: 4,
        height: 4,
      },
    });
  };

  const onSelectComponent = (moduleId: string) => {
    getModule(moduleId).then((m) => {
      replaceElement(id, {
        type: "block",
        moduleId,
        moduleVersionId: m.latestVersionId,
        style: data.style as any,
        props: {},
      });
    });
    setShowMenu(false);
  };

  const innerContent = (
    <BaseElement id={id} data={data} style={cssStyle}>
      {isEmpty && isEditMode && (
        <Initializer
          onAddStack={onAddStack}
          onAddComponent={onSelectComponent}
        />
      )}
      {data.content.map((childId) => (
        <Element key={childId} id={childId} />
      ))}
    </BaseElement>
  );

  if (!isEditMode) {
    return innerContent;
  }

  return (
    <SortableContext
      items={data.content}
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
