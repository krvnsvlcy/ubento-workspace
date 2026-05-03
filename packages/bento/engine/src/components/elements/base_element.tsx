import React, { createContext, JSX, useContext } from "react";
import { baseLengthConstraintsUnit, baseLengthUnit } from "../../constants";
import { useBentoEngine } from "../../engine/engine";
import { BaseStyle, ElementData, Length } from "../../engine/models";
import { BoardContext } from "../core/context";

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
    flex: mainAxisFlex !== undefined ? mainAxisFlex : undefined,

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
  const boardId = useContext(BoardContext);
  const engine = useBentoEngine();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (boardId && ref.current) {
      engine.setHtmlElement(boardId, id, ref.current);
      return () => {
        engine.setHtmlElement(boardId, id, undefined);
      };
    }
  }, [boardId, id, engine]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
