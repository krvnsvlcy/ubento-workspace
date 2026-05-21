import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { BoardSpec, BoardStyle } from "../../spec/board.js";
import { BoardApi, BoardRenderingContext } from "../context/context.js";
import { BoardStateProvider } from "../context/state.js";
import { StoreProvider } from "../context/store.js";
import { useEnvironment } from "../renderer.js";
import { BoardContext } from "../states/board.js";
import { BoardErrorBoundary } from "./board_error_boundary.js";
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
  const layout = style.layout || "column";
  const flow = style.flow || "fixed";
  return {
    position: "relative",
    width:
      layout === "row" ? (flow === "fixed" ? "100vw" : "fit-content") : "100vw",
    height:
      layout === "column"
        ? flow === "fixed"
          ? "100vh"
          : "fit-content"
        : "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: layout === "center" ? "center" : "stretch",
    flexDirection: layout === "center" ? "column" : layout,
    justifyContent: layout === "center" ? "center" : "start",
    gap: style.gap ? `${style.gap || 0}px` : undefined,
    overflowX:
      layout === "row" ? (flow === "fixed" ? "hidden" : "auto") : "hidden",
    overflowY:
      layout === "column" ? (flow === "fixed" ? "hidden" : "auto") : "hidden",
    pointerEvents: "auto",
    padding: paddingStyle(style.padding),
  };
}

export function BoardView({
  spec,
  children,
  params,
  queryClient,
  board,
}: PropsWithChildren<{
  spec: BoardSpec;
  params: Record<string, unknown>;
  queryClient: QueryClient;
  board: BoardApi;
}>) {
  const environment = useEnvironment();
  const content =
    spec.children?.map((child) => {
      return <ElementView key={child} id={child} />;
    }) ?? [];

  return (
    <BoardErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BoardContext value={{ spec, params }}>
          <BoardRenderingContext
            value={{
              workspace: environment.workspaceApi,
              session: environment.sessionApi,
              board,
              params,
              state: {},
              store: {},
              setState: () => {},
            }}
          >
            <BoardStateProvider initialState={spec.initialState || {}}>
              <StoreProvider store={spec.store || {}}>
                <div
                  style={getBoardStyle({
                    ...(spec.style || {}),
                    // direction: "column",
                    // gap: 0,
                    // padding: {
                    //   top: 0,
                    //   left: 0,
                    //   right: 0,
                    //   bottom: 0,
                    // },
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
      </QueryClientProvider>
    </BoardErrorBoundary>
  );
}
