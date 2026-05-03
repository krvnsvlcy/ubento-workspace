import { CSSProperties, useContext, useState } from "react";
import { spacingBaseUnit } from "../../../constants";
import { useBentoEngine } from "../../../engine/engine";
import { StackData } from "../../../engine/models";
import { BaseElement, getBaseStyle } from "../base_element";

import { BoardContext, ParentContext, StackContext } from "../../core/context";
import { BoxHandle } from "../../handles/box-handle";
import { Initializer } from "../../handles/initializer";
import { Element } from "../element";

export function Stack({ id, data }: { id: string; data: StackData }) {
  const stackContext = useContext(StackContext);
  const engine = useBentoEngine();
  const boardId = useContext(BoardContext);
  const isEditMode = engine.useState((s) => s.mode === "edit");

  const style = data.style;

  const cssStyle: CSSProperties = {
    ...getBaseStyle(style, { flex: stackContext.flex }),
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

  return (
    <BaseElement
      id={id}
      data={data}
      style={cssStyle}
      data-element-id={id}
      onDoubleClick={(e) => {
        if (!isEditMode) return;
        e.stopPropagation();
        engine.setSelectionScope(id);
      }}
    >
      {isEditMode ? (
        <BoxHandle id={id} element={data} isEmpty={isEmpty}>
          {isEmpty && <Initializer targetId={id} targetType="stack" />}{" "}
        </BoxHandle>
      ) : (
        <></>
      )}

      {isEmpty ? (
        <div
          onClick={
            !isEditMode
              ? (e) => {
                  e.stopPropagation();
                  engine.openComponentBrowser();
                }
              : undefined
          }
          className={`h-full w-full flex items-center justify-center rounded-xl transition-all duration-300 bg-neutral-surface group relative ${
            !isEditMode ? "cursor-pointer" : ""
          }`}
        ></div>
      ) : (
        <StackContext
          value={{
            flex: style.direction || "row",
          }}
        >
          <ParentContext value={id}>
            {data.content.map((childId) => (
              <Element key={childId} id={childId} />
            ))}
          </ParentContext>
        </StackContext>
      )}
    </BaseElement>
  );
}
