import { PropsWithChildren } from "react";
import { BoardSpec, BoardStyle } from "../../spec/board";
import { BoardContext } from "../states/board";
import { ElementView } from "./element/element";

function paddingStyle(padding: BoardStyle["padding"]) {
  const sidePadding = (value?: number) => `${value || 0}px`;

  return [
    sidePadding(padding?.top),
    sidePadding(padding?.right),
    sidePadding(padding?.bottom),
    sidePadding(padding?.left),
  ].join(" ");
}

function getBoardStyle(style: BoardStyle): React.CSSProperties {
  const direction = style.direction || "column";
  const flow = style.flow || "fixed";
  return {
    position: "relative",
    width:
      direction === "row"
        ? flow === "fixed"
          ? "100%"
          : "fit-content"
        : "100%",
    height:
      direction === "column"
        ? flow === "fixed"
          ? "100%"
          : "fit-content"
        : "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "stretch",
    flexDirection: direction,
    gap: style.gap ? `${style.gap || 0}px` : undefined,
    overflowX:
      direction === "row" ? (flow === "fixed" ? "hidden" : "auto") : "hidden",
    overflowY:
      direction === "column"
        ? flow === "fixed"
          ? "hidden"
          : "auto"
        : "hidden",
    pointerEvents: "auto",
    padding: paddingStyle(style.padding),
  };
}

export function BoardView({
  spec,
  children,
}: PropsWithChildren<{ spec: BoardSpec }>) {
  const content =
    spec.children?.map((child) => {
      return <ElementView key={child} id={child} />;
    }) ?? [];

  return (
    <BoardContext value={spec}>
      <div style={getBoardStyle(spec.style || {})}>
        {content}
        {children}
      </div>
    </BoardContext>
  );
}
