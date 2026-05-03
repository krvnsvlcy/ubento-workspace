import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { useContext } from "react";
import { useBentoEngine } from "../../engine/engine";
import { BlockData } from "../../engine/models";
import { StackContext } from "../core/context";
import { BoxHandle } from "../handles/box-handle";
import { BaseElement, getBaseStyle } from "./base_element";

export function Block({
  id,
  data,
}: {
  id: string;
  data: BlockData;
}): React.JSX.Element {
  const stackContext = useContext(StackContext);
  const engine = useBentoEngine();
  const isEditMode = engine.useState((s) => s.mode === "edit");

  const {
    status,
    error: moduleError,
    value: moduleValue,
  } = engine.moduleManager.useModuleValue(data.module);

  if (status === "pending")
    return <PendingView message="Loading component..." />;
  if (status === "error")
    return <ErrorView message={`Failed to load component: ${moduleError}`} />;
  if (!moduleValue) return <ErrorView message="Component not found" />;

  const Component = moduleValue.default;
  if (!Component)
    return <ErrorView message="No default export found in component module" />;

  return (
    <BaseElement
      id={id}
      data={data}
      style={getBaseStyle(data.style || {}, {
        flex: stackContext.flex,
      })}
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
    >
      {isEditMode && <BoxHandle id={id} element={data} isEmpty={false} />}
      <Component {...data.props} />
    </BaseElement>
  );
}
