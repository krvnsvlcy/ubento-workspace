import { PropsWithChildren } from "react";
import { BoardSpec, BoardStyle } from "../../spec/board.js";
import { BoardRenderingContext } from "../context/context.js";
import { BoardStateProvider } from "../context/state.js";
import { StoreProvider } from "../context/store.js";
import { useEnvironment } from "../renderer.js";
import { BoardContext } from "../states/board.js";
import { ElementView } from "./element/element.js";
import { OverlayRenderer } from "./overlay-renderer.js";

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
  params,
}: PropsWithChildren<{ spec: BoardSpec; params: Record<string, unknown> }>) {
  const environment = useEnvironment();
  const content =
    spec.children?.map((child) => {
      return <ElementView key={child} id={child} />;
    }) ?? [];

  return (
    <BoardContext value={{ spec, params }}>
      <BoardRenderingContext
        value={{
          workspace: environment.workspaceApi,
          session: environment.sessionApi,
          params,
          state: {},
          store: {},
        }}
      >
        <BoardStateProvider initialState={spec.initialState || {}}>
          <StoreProvider store={spec.store || {}}>
            <div
              style={getBoardStyle({
                ...(spec.style || {}),
                direction: "column",
                gap: 0,
                padding: {
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
              })}
            >
              {content}
              {children}
              <OverlayRenderer />
            </div>
          </StoreProvider>
        </BoardStateProvider>
      </BoardRenderingContext>
    </BoardContext>
  );
}
