import { EmptyView, PendingView } from "@ubento/bento-primitives";
import React, { useEffect, useState } from "react";
import { useEngineController } from "../../controller.js";
import { BoardData } from "../../models.js";

export function NoBoard(): React.JSX.Element {
  const controller = useEngineController();
  const [boards, setBoards] = useState<BoardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    controller
      .getState()
      .listBoards()
      .then((res: BoardData[]) => {
        setBoards(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [controller]);

  const handleCreateBoard = async () => {
    setCreating(true);
    try {
      const name = `Board ${boards.length + 1}`;
      const newBoard = await controller.getState().createBoard(name);
      controller.getState().goTo(newBoard.id);
    } catch (err) {
      console.error("Failed to create board", err);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <PendingView message="Loading boards..." />;
  }

  return (
    <div className="w-full h-screen overflow-y-auto overflow-y-auto flex flex-col items-center p-20 animate-in fade-in duration-700">
      <div className="max-w-4xl w-full my-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground-100 tracking-tight mb-3">
            Welcome to your Workspace
          </h1>
          <p className="text-lg text-foreground-300 max-w-xl mx-auto">
            Choose a board to start building your experience, or create a new
            one from scratch.
          </p>
        </header>

        {boards.length === 0 ? (
          <EmptyView message="No boards found in this workspace.">
            <button
              onClick={handleCreateBoard}
              disabled={creating}
              className="mt-4 px-6 py-3 bg-primary-300 hover:bg-primary-200 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/20 disabled:opacity-50 flex items-center gap-2 mx-auto"
            >
              {creating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <PlusIcon className="w-5 h-5" />
              )}
              Create your first board
            </button>
          </EmptyView>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board) => (
              <button
                key={board.id}
                onClick={() => {
                  controller.getState().goTo(board.id);
                }}
                className="group relative flex flex-col items-start p-6 bg-paper border border-background-400 rounded-2xl text-left transition-all hover:border-primary-400 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500 text-primary-300 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary-300 group-hover:text-white">
                  <BoardIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground-100 mb-1">
                  {board.name || "Untitled Board"}
                </h3>
                <p className="text-sm text-foreground-400 mb-4">
                  Last updated recently
                </p>
                <div className="mt-auto flex items-center text-sm font-medium text-primary-300 opacity-0 transition-opacity group-hover:opacity-100">
                  Open Board <ArrowRightIcon className="ml-1 w-4 h-4" />
                </div>
              </button>
            ))}

            <button
              onClick={handleCreateBoard}
              disabled={creating}
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-background-400 rounded-2xl text-foreground-400 transition-all hover:border-primary-400 hover:text-primary-300 hover:bg-primary-500 group disabled:opacity-50"
            >
              {creating ? (
                <div className="w-8 h-8 border-3 border-primary-300 border-t-transparent rounded-full animate-spin mb-4" />
              ) : (
                <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <PlusIcon className="w-6 h-6" />
                </div>
              )}
              <span className="font-semibold text-lg">Create New Board</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function BoardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}
