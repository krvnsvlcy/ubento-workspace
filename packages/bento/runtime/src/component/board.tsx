import { ScrollArea } from "@ubento/bento.arlo-core";
import { AlertCircle } from "lucide-react";
import { BentoRuntime } from "../runtime/runtime";
import { Component } from "./component";

export function BentoBoardView({
  runtime,
  boardId,
  params,
}: {
  runtime: BentoRuntime;
  boardId: string;
  params: Record<string, unknown>;
}) {
  const workspace = runtime.useState((s) => s.workspace);

  const board =
    workspace.spec.isValid && workspace.spec.data?.boards
      ? workspace.spec.data.boards[boardId]
      : undefined;

  // Handle the case where the board definition doesn't exist
  if (!board) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-surface/20 p-6">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-content mb-2">
          Board Not Found
        </h2>
        <p className="text-content-muted text-center max-w-md mb-8 font-mono text-sm bg-surface border border-border rounded-xl p-4">
          The board you are looking for does not exist in the current workspace
          spec.
        </p>
        <button
          onClick={() => runtime.goHome()}
          className="px-6 py-3 bg-surface border border-border rounded-xl font-bold hover:bg-surface-hover transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Render the remote module using our unified component,
  // passing down the URL params straight into the remote component's props.
  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <ScrollArea>
        <Component module={board.module} componentProps={params} />
      </ScrollArea>
    </div>
  );
}
