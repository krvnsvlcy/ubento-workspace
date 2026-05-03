import { EmptyView, ErrorView, PendingView } from "@ubento/bento-primitives";
import { useStoreEntity } from "@ubento/fabric";
import React, { useEffect, useState } from "react";
import { spacingBaseUnit } from "../../constants.js";
import { useBentoEngine } from "../../engine/engine.js";
import { BoardStyle } from "../../engine/models.js";
import { BoardContext, StackContext } from "../core/context.js";
import { Element, ElementRegistryProvider } from "../elements/element.js";
import { Initializer } from "../handles/initializer.js";

function paddingStyle(padding: BoardStyle["padding"]) {
  const sidePadding = (value?: number) =>
    `calc(${(value || 0) * spacingBaseUnit}px + var(--root-padding, 0px))`;

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
    display: "flex",
    alignContent: "start",
    flexDirection: style.direction || "row",
    gap: style.gap ? `${style.gap * spacingBaseUnit}px` : undefined,
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

function BoardContent({ boardId }: { boardId: string }): React.JSX.Element {
  const engine = useBentoEngine();
  const { select } = engine;
  const isEditMode = engine.useState((s) => s.mode === "edit");
  const { data: board } = useStoreEntity(engine.boardStore, boardId);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        if (
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          (e.target as HTMLElement).isContentEditable
        ) {
          return;
        }

        const state = engine.getState();
        if (state.mode === "edit" && state.selection.length > 0) {
          e.preventDefault();
          for (const id of state.selection) {
            engine.deleteElement(boardId, id);
          }
          engine.select([]);
        }
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "g") {
        const state = engine.getState();
        if (state.mode === "edit" && state.selection.length > 0) {
          e.preventDefault();
          if (e.shiftKey) {
            // Find parent of selection
            const firstId = state.selection[0];
            let parentId: string | undefined;

            if (board.content.includes(firstId)) {
              parentId = "root_content";
            } else {
              for (const [id, el] of Object.entries(
                board.elements as Record<string, any>,
              )) {
                if (el.type === "stack" && el.content.includes(firstId)) {
                  parentId = id;
                  break;
                }
              }
            }

            if (parentId) {
              for (const id of state.selection) {
                engine.unwrapStack(boardId, id, parentId);
              }
            }
          } else {
            // Find parent of selection
            const firstId = state.selection[0];
            let parentId: string | undefined;

            if (board.content.includes(firstId)) {
              parentId = "root_content";
            } else {
              for (const [id, el] of Object.entries(
                board.elements as Record<string, any>,
              )) {
                if (el.type === "stack" && el.content.includes(firstId)) {
                  parentId = id;
                  break;
                }
              }
            }

            if (parentId) {
              engine.wrapWithStack(boardId, state.selection, parentId);
            }
          }
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [engine]);

  if (!board) {
    return <ErrorView message="Board not found" />;
  }

  const isEmpty = board.content.length === 0;
  const content = isEmpty ? (
    isEditMode ? (
      <Initializer targetId={boardId} targetType="board" />
    ) : (
      <EmptyView message="This board is empty." />
    )
  ) : (
    board.content.map((id: string) => <Element key={id} id={id} />)
  );

  const direction = board.style?.direction || "row";

  return (
    <BoardContext value={boardId}>
      <ElementRegistryProvider registry={board.elements as any}>
        <StackContext value={{ flex: direction }}>
          <div
            onClick={() => {
              select([]);
              engine.setSelectionScope(undefined);
            }}
            onDoubleClick={() => {
              engine.toggleMode();
            }}
            style={getBoardStyle(board.style)}
          >
            {content}

            {isEditMode ? (
              <div
                style={{
                  height: direction === "row" ? "100%" : "50vh",
                  width: direction === "column" ? "100%" : "50vw",
                  // backgroundColor: "blue",
                }}
              />
            ) : null}
          </div>
        </StackContext>
      </ElementRegistryProvider>
    </BoardContext>
  );
}

export function Board({
  id,
}: {
  id: string;
  params?: Record<string, any>;
}): React.JSX.Element {
  const engine = useBentoEngine();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    engine.boardStore
      .fetch(id)
      .then(() => {
        // Data is now in controller.state
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, engine]);

  if (loading) return <PendingView message="Loading board..." />;
  if (error) return <ErrorView message="Failed to load board" />;

  return <BoardContent boardId={id} />;
}
