import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { spacingBaseUnit } from "../../constants.js";
import { useEngineController } from "../../controller.js";
import { BoardStyle } from "../../models.js";
import { Element, ElementRegistryProvider } from "../elements/element.js";

function getBoardStyle(style: BoardStyle = {}): React.CSSProperties {
  return {
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundColor: style.background,
    display: "flex",
    alignContent: "start",
    flexDirection: style.direction || "row",
    flexWrap: "wrap",
    gap: style.gap ? `${style.gap * spacingBaseUnit}px` : undefined,
    padding: style.padding
      ? `${(style.padding.top || 0) * spacingBaseUnit}px ${(style.padding.right || 0) * spacingBaseUnit}px ${(style.padding.bottom || 0) * spacingBaseUnit}px ${(style.padding.left || 0) * spacingBaseUnit}px`
      : undefined,
    overflow: style.direction === "row" ? "hidden auto" : "auto hidden",
    pointerEvents: "auto",
  };
}

function BoardContent({ boardId }: { boardId: string }): React.JSX.Element {
  const controller = useEngineController();
  const board = useStore(controller, (s) => s.boards[boardId]);

  if (!board) return <></>;

  const content = board.content.map((id) => <Element key={id} id={id} />);

  return (
    <ElementRegistryProvider registry={board.elements as any}>
      <div
        onClick={() => {
          controller.getState().select([]);
        }}
        style={getBoardStyle(board.style)}
      >
        {content}
      </div>
    </ElementRegistryProvider>
  );
}

export function Board({
  id,
}: {
  id: string;
  params?: Record<string, any>;
}): React.JSX.Element {
  const controller = useEngineController();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    controller
      .getState()
      .getBoard(id)
      .then(() => {
        // Data is now in controller.state
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, controller]);

  if (loading) return <PendingView message="Loading board..." />;
  if (error) return <ErrorView message="Failed to load board" />;

  return <BoardContent boardId={id} />;
}
