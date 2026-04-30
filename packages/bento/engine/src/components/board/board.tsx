import { EmptyView, ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { useEffect, useState } from "react";
import { spacingBaseUnit } from "../../constants.js";
import { useBentoEngine } from "../../engine.js";
import { BoardStyle } from "../../models.js";
import { StackContext } from "../core/core.js";
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

function getBoardStyle(style: BoardStyle = {}): React.CSSProperties {
  return {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignContent: "start",
    flexDirection: style.direction || "row",
    gap: style.gap ? `${style.gap * spacingBaseUnit}px` : undefined,
    overflow: style.direction === "row" ? "auto hidden" : "hidden auto",
    pointerEvents: "auto",
    padding: paddingStyle(style.padding),
    transition: "padding 0.2s",
  };
}

function BoardContent({ boardId }: { boardId: string }): React.JSX.Element {
  const engine = useBentoEngine();
  const { select } = engine;
  const isEditMode = engine.useState((s) => s.mode === "edit");
  const board = engine.useState((s) => s.boards[boardId]);

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
    board.content.map((id) => <Element key={id} id={id} />)
  );

  return (
    <ElementRegistryProvider registry={board.elements as any}>
      <StackContext value={{ flex: board.style?.direction || "row" }}>
        <div
          onClick={() => {
            select([]);
          }}
          style={getBoardStyle(board.style)}
        >
          {content}
        </div>
      </StackContext>
    </ElementRegistryProvider>
  );
}

export function Board({
  id,
}: {
  id: string;
  params?: Record<string, any>;
}): React.JSX.Element {
  const engine = useBentoEngine();
  const getBoard = engine.getBoard;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getBoard(id)
      .then(() => {
        // Data is now in controller.state
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, getBoard]);

  if (loading) return <PendingView message="Loading board..." />;
  if (error) return <ErrorView message="Failed to load board" />;

  return <BoardContent boardId={id} />;
}
