import { EmptyView, PendingView } from "@ubento/bento-primitives";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { useEngine } from "../../engine.js";
import { BoardData } from "../../models.js";

export function NoBoard(): React.JSX.Element {
  const listBoards = useEngine((s) => s.listBoards);
  const createBoard = useEngine((s) => s.createBoard);
  const goTo = useEngine((s) => s.goTo);

  const [boards, setBoards] = useState<BoardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    listBoards()
      .then((res: BoardData[]) => {
        setBoards(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [listBoards]);

  const handleCreateBoard = async () => {
    setCreating(true);
    try {
      const name = `Board ${boards.length + 1}`;
      const newBoard = await createBoard(name);
      goTo(newBoard.id);
    } catch (err) {
      console.error("Failed to create board", err);
    } finally {
      setCreating(false);
    }
  };
  const filteredBoards = boards.filter((board) =>
    board.name?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <PendingView message="Loading boards..." />;
  }

  return (
    <div className="relative h-full px-8 py-20 font-sans text-foreground overflow-y-auto selection:bg-foreground-200">
      <div className="relative mx-auto w-full max-w-5xl">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className="mb-12 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Workspace Boards
              </h1>
              <p className="mt-2 text-sm text-foreground-400">
                Choose a board to start building your experience, or create a
                new one from scratch.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <SearchIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-400" />
              <input
                type="text"
                placeholder="Search boards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-2xl border border-white/10 bg-background-300/50 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary-500/50 focus:bg-background-300 focus:ring-4 focus:ring-primary-500/10"
              />
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        >
          {filteredBoards.length === 0 && search !== "" ? (
            <EmptyView message="No boards match your search.">
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-sm font-medium text-primary-300 hover:text-primary-200"
              >
                Clear search
              </button>
            </EmptyView>
          ) : filteredBoards.length === 0 ? (
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
              {filteredBoards.map((board) => (
                <button
                  key={board.id}
                  onClick={() => {
                    goTo(board.id);
                  }}
                  className="bg-background-100 group relative flex flex-col items-start p-6 border hover:border-foreground/20 rounded-2xl text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-background-200 flex items-center justify-center mb-4">
                    <BoardIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground-100 mb-1">
                    {board.name || "Untitled Board"}
                  </h3>
                  <p className="text-sm text-foreground-400 mb-4">
                    Last updated recently
                  </p>
                  <div className="mt-auto flex items-center text-sm font-medium text-foreground-300 opacity-0 transition-opacity group-hover:opacity-100">
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
        </motion.div>
      </div>
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
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
