import { BoardApi, BoardView, Interactor } from "@ubento/bento.core";
import { useStoreEntity } from "@ubento/fabric";
import { AlertCircle, Loader2 } from "lucide-react";
import { queryClient } from "../query";
import { BentoRuntime } from "../runtime/runtime";

export function BentoBoardView({
  runtime,
  boardId,
  params,
}: {
  runtime: BentoRuntime;
  boardId: string;
  params: Record<string, unknown>;
}) {
  const mode = runtime.useState((s) => s.mode);
  const {
    data: board,
    status,
    error,
  } = useStoreEntity(runtime.boardStore, boardId);

  if (status === "pending") {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-neutral-surface/20 animate-in fade-in duration-500">
        <Loader2 className="w-10 h-10 text-accent animate-spin mb-4" />
        <p className="text-neutral-content-muted font-medium animate-pulse">
          Loading board...
        </p>
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-neutral-surface/20 p-6">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-neutral-content mb-2">
          Failed to load board
        </h2>
        <p className="text-neutral-content-muted text-center max-w-md mb-8">
          {error?.message ||
            "The board you are looking for does not exist or you do not have permission to view it."}
        </p>
        <button
          onClick={() => runtime.goHome()}
          className="px-6 py-3 bg-neutral-surface border border-neutral-border rounded-xl font-bold hover:bg-neutral-surface-hover transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (!board.spec.isValid) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-neutral-surface/20 p-6">
        <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-neutral-content mb-2">
          Invalid Board Specification
        </h2>
        <div className="bg-neutral-surface border border-neutral-border rounded-2xl p-6 max-w-2xl w-full mb-8 max-h-64 overflow-y-auto">
          <p className="text-sm font-bold text-neutral-content mb-4 uppercase tracking-wider">
            Validation Errors:
          </p>
          <ul className="space-y-2">
            {board.spec.issues.map((issue, i) => (
              <li key={i} className="text-sm text-red-500 flex gap-2">
                <span className="opacity-50">•</span>
                <span className="font-mono">{issue.location.join(".")}</span>
                <span className="font-mono">{issue.message}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => runtime.goHome()}
          className="px-6 py-3 bg-neutral-surface border border-neutral-border rounded-xl font-bold hover:bg-neutral-surface-hover transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const isEditMode = mode === "edit";

  const boardApi: BoardApi = {
    id: board.id,
    title: board.title,
    setTitle: (newTitle) => {
      const updatedBoard = {
        ...board,
        title: newTitle,
      };
      runtime.boardStore.push(updatedBoard);
    },
  };

  return (
    <div className="h-full overflow-hidden bg-background">
      <BoardView
        queryClient={queryClient}
        spec={board.spec.data}
        params={params}
        board={boardApi}
      >
        {isEditMode ? <Interactor /> : <></>}
      </BoardView>
    </div>
  );
}
