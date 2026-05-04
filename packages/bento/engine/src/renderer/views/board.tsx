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
  return {
    position: "relative",
    width:
      style.direction === "row"
        ? style.flow === "fixed"
          ? "100%"
          : "fit-content"
        : "100%",
    height:
      style.direction === "column"
        ? style.flow === "fixed"
          ? "100%"
          : "fit-content"
        : "100%",
    minHeight: "100vh",
    display: "flex",
    alignContent: "start",
    flexDirection: style.direction || "row",
    gap: style.gap ? `${style.gap || 0}px` : undefined,
    overflowX:
      style.direction === "row"
        ? style.flow === "fixed"
          ? "hidden"
          : "auto"
        : "hidden",
    overflowY:
      style.direction === "column"
        ? style.flow === "fixed"
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
