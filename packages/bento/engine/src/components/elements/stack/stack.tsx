import { createContext, CSSProperties, useContext } from "react";
import { spacingBaseUnit } from "../../../constants";
import { useBentoEngine } from "../../../engine";
import { StackData } from "../../../models";
import { BaseElement, getBaseStyle } from "../base_element";

import { BoxHandle } from "../../handles/box-handle";
import { Initializer } from "../../handles/initializer";
import { StackInterstices } from "../../handles/stack-interstices";
import { Element } from "../element";

export const StackContext = createContext<{ flex: "row" | "column" }>({
  flex: "row",
});

export function Stack({ id, data }: { id: string; data: StackData }) {
  const stackContext = useContext(StackContext);
  const engine = useBentoEngine();
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
    <BaseElement id={id} data={data} style={cssStyle} data-element-id={id}>
      {isEditMode ? (
        <BoxHandle id={id} element={data} isEmpty={isEmpty}>
          {isEmpty ? (
            <Initializer targetId={id} targetType="stack" />
          ) : (
            <StackInterstices id={id} direction={style.direction || "row"} />
          )}
        </BoxHandle>
      ) : (
        isEmpty && (
          <div
            onClick={() => engine.toggleMode()}
            className="absolute inset-1 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 bg-background group"
          >
            <span className="text-[10px] font-semibold text-neutral-content-muted opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
              click to add content
            </span>
          </div>
        )
      )}
      <StackContext
        value={{
          flex: style.direction || "row",
        }}
      >
        {data.content.map((childId) => (
          <Element key={childId} id={childId} />
        ))}
      </StackContext>
    </BaseElement>
  );
}
