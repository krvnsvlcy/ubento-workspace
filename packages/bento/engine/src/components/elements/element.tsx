import React, { createContext, useContext } from "react";
import { BaseStyle, ElementData } from "../../models";
import { Component } from "./component";
import { Stack } from "./stack";
import { BoxHandle } from "../handles/box-handle";

export type ElementRegistry = {
  [key: string]: ElementData;
};

export const ElementRegistryContext = createContext<ElementRegistry>({});

export function ElementRegistryProvider({
  children,
  registry,
}: {
  children: React.ReactNode;
  registry: ElementRegistry;
}): React.JSX.Element {
  return (
    <ElementRegistryContext.Provider value={registry}>
      {children}
    </ElementRegistryContext.Provider>
  );
}

function getBaseStyle(style: BaseStyle): React.CSSProperties {
  return {
    position: "relative",
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
    padding: style.padding
      ? `${style.padding.top ?? 0}px ${style.padding.right ?? 0}px ${style.padding.bottom ?? 0}px ${style.padding.left ?? 0}px`
      : undefined,
  };
}

function ElementContent({
  element,
}: {
  element: ElementData;
}): React.JSX.Element {
  switch (element.type) {
    case "stack":
      return <Stack content={element.content as any} style={element.style} />;
    case "block":
      return (
        <Component
          moduleId={element.moduleId}
          moduleVersionId={element.moduleVersionId}
          props={element.props ?? {}}
        />
      );
    default:
      return <></>;
  }
}

export function Element({ id }: { id: string }): React.JSX.Element {
  const registry = useContext(ElementRegistryContext);
  const element = registry[id];

  if (!element) {
    return <></>;
  }

  return (
    <div style={getBaseStyle(element.style ?? {})}>
      <BoxHandle id={id} element={element} />
      <ElementContent element={element} />
    </div>
  );
}
