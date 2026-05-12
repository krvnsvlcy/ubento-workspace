import { useStoreEntities } from "@ubento/fabric";
import { Button } from "@ubento/workspace.primitives";
import { ArrowRight, Layout, LayoutGrid, Plus, Search } from "lucide-react";
import { BentoRuntime } from "../runtime/runtime";

export function BentoHomeView({ runtime }: { runtime: BentoRuntime }) {
  const { data: boards, status } = useStoreEntities(runtime.boardStore);
  const workspace = runtime.useState((runtime) => runtime.workspace);
  const user = runtime.useState((runtime) => runtime.user);

  const boardsList = boards || [];

  return (
    <div className="h-full overflow-y-auto scroll-smooth bg-neutral-surface/20">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-16 flex flex-col gap-20">
        {/* Hero Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-semibold tracking-tighter text-neutral-content">
            {workspace.title}
          </h1>
          <p className="text-neutral-content-muted">
            {boardsList.length} active boards in this workspace
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-content-muted group-focus-within:text-accent transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search boards..."
              className="w-full bg-neutral-surface border border-neutral-border rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-hidden focus:ring-4 focus:ring-accent/10 focus:border-accent/50 transition-all"
            />
          </div>
          <Button className="h-12 px-6 rounded-2xl flex items-center gap-2">
            <Plus size={20} />
            <span className="font-bold">Create Board</span>
          </Button>
        </div>

        {/* Boards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {status === "pending" ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-3xl border border-neutral-border bg-neutral-surface/50 animate-pulse"
              />
            ))
          ) : boardsList.length === 0 ? (
            <div className="col-span-full py-24 flex flex-col items-center justify-center border-2 border-dashed border-neutral-border rounded-[2.5rem] bg-neutral-surface/10">
              <div className="w-24 h-24 rounded-full bg-neutral-surface flex items-center justify-center mb-6 text-neutral-content-muted opacity-20">
                <LayoutGrid size={48} />
              </div>
              <h3 className="text-2xl font-medium text-neutral-content mb-2">
                No boards yet
              </h3>
              <p className="text-neutral-content-muted max-w-xs text-center mb-10">
                Start by creating your first board to organize your tasks and
                visualize your data.
              </p>
              <Button className="h-14 px-10 rounded-2xl text-lg font-bold">
                Create your first board
              </Button>
            </div>
          ) : (
            boardsList.map((board) => (
              <div
                key={board.id}
                onClick={() => runtime.goToBoard(board.id)}
                className="group relative flex flex-col h-64 rounded-[2rem] border border-neutral-border bg-neutral-surface hover:border-accent transition-all duration-500 cursor-pointer overflow-hidden p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-surface-hover flex items-center justify-center text-neutral-content-muted group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Layout size={28} />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-accent">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-content group-hover:text-accent transition-colors duration-500 mb-2 truncate">
                  {board.title}
                </h3>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
