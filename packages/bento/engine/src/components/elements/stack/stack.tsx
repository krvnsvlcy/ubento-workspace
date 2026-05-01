import { CSSProperties, useContext, useState } from "react";
import { spacingBaseUnit } from "../../../constants";
import { useBentoEngine } from "../../../engine/engine";
import { StackData } from "../../../engine/models";
import { BaseElement, getBaseStyle } from "../base_element";

import { ParentContext, StackContext } from "../../core/context";
import { BoxHandle } from "../../handles/box-handle";
import { Initializer } from "../../handles/initializer";
import { Element } from "../element";
import { ComponentSelector } from "./component_selector";

export function Stack({ id, data }: { id: string; data: StackData }) {
  const stackContext = useContext(StackContext);
  const engine = useBentoEngine();
  const isEditMode = engine.useState((s) => s.mode === "edit");
  const [showSelector, setShowSelector] = useState(false);

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
                  setShowSelector(true);
                }
              : undefined
          }
          className={`h-full w-full flex items-center justify-center rounded-xl transition-all duration-300 bg-neutral-surface group relative ${
            !isEditMode ? "cursor-pointer" : ""
          }`}
        >
          {isEditMode ? (
            <></>
          ) : (
            <>
              {showSelector && (
                <>
                  <div
                    className="fixed inset-0 z-[999] cursor-default"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSelector(false);
                    }}
                  />
                  <div className="pointer-events-auto relative z-[1000]">
                    <ComponentSelector
                      onSelect={async (moduleId) => {
                        const m = await engine.getModule(moduleId);
                        engine.replaceElement(id, {
                          type: "block",
                          moduleId,
                          moduleVersionId: m.latestVersionId,
                          style: data.style as any,
                          props: {},
                        });
                        setShowSelector(false);
                      }}
                      onClose={() => setShowSelector(false)}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
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
