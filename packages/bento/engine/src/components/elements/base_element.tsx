import React, { createContext, JSX } from "react";
import {
  baseLengthConstraintsUnit,
  baseLengthUnit,
  spacingBaseUnit,
} from "../../constants";
import { useBentoEngine } from "../../engine";
import { BaseStyle, ElementData, Length } from "../../models";

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

function lengthToCSS(length?: Length, flexAxis?: "main" | "cross") {
  if (!length) return undefined;
  if (length.unit === "fr") {
    if (flexAxis === "main") {
      return undefined;
    } else {
      return "100%";
    }
  }
  return `${length.value}${length.unit}`;
}

export function getBaseStyle(
  style: BaseStyle,
  context: {
    flex: "row" | "column";
  },
): React.CSSProperties {
  let mainAxisFlex: number | undefined;

  // Determine if we need to apply flex-grow based on our custom 'fr' unit
  if (context.flex === "row" && style.width?.unit === "fr") {
    mainAxisFlex = style.width.value;
  }
  if (context.flex === "column" && style.height?.unit === "fr") {
    mainAxisFlex = style.height.value;
  }

  // Calculate base dimensions
  const widthVal = lengthToCSS(
    style.width,
    context.flex === "row" ? "main" : "cross",
  );
  const heightVal = lengthToCSS(
    style.height,
    context.flex === "row" ? "cross" : "main",
  );

  return {
    position: "relative",
    // Only fallback to fit-content if it's NOT acting as a flex item on this axis
    width:
      widthVal !== undefined
        ? widthVal
        : context.flex === "row" && mainAxisFlex
          ? undefined
          : "fit-content",
    height:
      heightVal !== undefined
        ? heightVal
        : context.flex === "column" && mainAxisFlex
          ? undefined
          : "fit-content",

    // Prioritize the explicit fr unit, fallback to explicit flex property
    flex: mainAxisFlex !== undefined ? mainAxisFlex : style.flex,

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
  const engine = useBentoEngine();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (ref.current) {
      engine.setHtmlElement(id, ref.current);
    }
    return () => {
      engine.setHtmlElement(id, undefined);
    };
  }, [id, engine]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
