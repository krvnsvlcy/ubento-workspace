import React, { createContext, JSX } from "react";
import {
  baseLengthConstraintsUnit,
  baseLengthUnit,
  spacingBaseUnit,
} from "../../constants";
import { BaseStyle, ElementData } from "../../models";
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

export function getBaseStyle(style: BaseStyle): React.CSSProperties {
  return {
    position: "relative",
    width: style.width ? `${style.width * baseLengthUnit}px` : "fit-content",
    height: style.height ? `${style.height * baseLengthUnit}px` : "fit-content",
    minWidth: style.minWidth
      ? `${style.minWidth * baseLengthConstraintsUnit}px`
      : baseLengthUnit,
    maxWidth: style.maxWidth
      ? `${style.maxWidth * baseLengthConstraintsUnit}px`
      : undefined,
    minHeight: style.minHeight
      ? `${style.minHeight * baseLengthConstraintsUnit}px`
      : baseLengthUnit,
    maxHeight: style.maxHeight
      ? `${style.maxHeight * baseLengthConstraintsUnit}px`
      : undefined,
    flexGrow: style.flex,
    padding: style.padding
      ? `${(style.padding.top || 0) * spacingBaseUnit}px ${(style.padding.right || 0) * spacingBaseUnit}px ${(style.padding.bottom || 0) * spacingBaseUnit}px ${(style.padding.left || 0) * spacingBaseUnit}px`
      : undefined,
  };
}

export function BaseElement({
  id,
  children,
  data,
  ...props
}: {
  id: string;
  data: ElementData;
} & JSX.IntrinsicElements["div"]): React.JSX.Element {
  return (
    <div {...props}>
      <BoxHandle id={id} element={data} />
      {children}
    </div>
  );
}
