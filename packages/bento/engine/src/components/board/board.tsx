import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { useEffect, useState } from "react";
import { spacingBaseUnit } from "../../constants.js";
import { useBentoEngine } from "../../engine.js";
import { BoardStyle } from "../../models.js";
import { Element, ElementRegistryProvider } from "../elements/element.js";
import { Initializer } from "../elements/initializer.js";

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
    flexWrap: "wrap",
    gap: style.gap ? `${style.gap * spacingBaseUnit}px` : undefined,
    overflow: style.direction === "row" ? "hidden auto" : "auto hidden",
    pointerEvents: "auto",
    padding: paddingStyle(style.padding),
    transition: "padding 0.2s",
  };
}

function BoardContent({ boardId }: { boardId: string }): React.JSX.Element {
  const engine = useBentoEngine();
  const { select, addElement, setBoardContent, getModule } = engine;
  const isEditMode = engine.useState((s) => s.mode === "edit");
  const board = engine.useState((s) => s.boards[boardId]);

  if (!board) return <></>;

  const onAddRootStack = (direction: "row" | "column") => {
    const id = addElement("root", {
      type: "stack",
      content: [],
      style: {
        direction,
        gap: 1,
        padding: { top: 1, bottom: 1, left: 1, right: 1 },
        width: 100,
        height: 100,
      } as any,
    });
    setBoardContent(boardId, [id]);
  };

  const onAddRootComponent = (moduleId: string) => {
    getModule(moduleId).then((m) => {
      const id = addElement("root", {
        type: "block",
        moduleId,
        moduleVersionId: m.latestVersionId,
        style: {
          width: 100,
          height: 100,
        } as any,
        props: {},
      });
      setBoardContent(boardId, [id]);
    });
  };

  const isEmpty = board.content.length === 0;
  const content = isEmpty ? (
    isEditMode ? (
      <Initializer
        onAddStack={onAddRootStack}
        onAddComponent={onAddRootComponent}
      />
    ) : (
      <></>
    )
  ) : (
    board.content.map((id) => <Element key={id} id={id} />)
  );

  return (
    <ElementRegistryProvider registry={board.elements as any}>
      <div
        onClick={() => {
          select([]);
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
