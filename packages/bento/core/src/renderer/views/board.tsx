import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { BoardSpec, BoardStyle } from "../../spec/board.js";
import { ScrollArea } from "../components/scroll-area.js";
import {
  BoardApi,
  BoardRenderingContext,
  ContextCapture,
} from "../context/context.js";
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
  const flow = style.flow || "fixed";
  return {
    position: "relative",
    width: "100vw",
    height: flow === "fixed" ? "100vh" : "fit-content",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    gap: style.gap ? `${style.gap || 0}px` : undefined,
    overflowX: "hidden",
    overflowY: flow === "fixed" ? "hidden" : "auto",
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
                <ContextCapture />
                <ScrollArea
                  style={{
                    height: "100vh",
                    width: "100vw",
                  }}
                >
                  <div
                    style={getBoardStyle({
                      ...(spec.style || {}),
                    })}
                  >
                    {content}
                    {children}
                  </div>
                  <OverlayRenderer />
                </ScrollArea>
              </StoreProvider>
            </BoardStateProvider>
          </BoardRenderingContext>
        </BoardContext>
      </QueryClientProvider>
    </BoardErrorBoundary>
  );
}
