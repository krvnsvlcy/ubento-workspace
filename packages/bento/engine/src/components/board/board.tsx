import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { useEngineController } from "../../controller.js";
import { BoardData } from "../../models.js";
import { Element, ElementRegistryProvider } from "../elements/element.js";

function BoardContent({ board }: { board: BoardData }): React.JSX.Element {
  const snap = useSnapshot(board);

  const content = snap.content.map((id) => <Element key={id} id={id} />);

  return (
    <ElementRegistryProvider registry={board.elements as any}>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
        }}
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
  const [board, setBoard] = useState<BoardData | undefined>();

  useEffect(() => {
    controller
      .getBoard(id)
      .then((board) => {
        setBoard(board);
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
  if (!board) return <ErrorView message="Board not found" />;

  return <BoardContent board={board} />;
}
