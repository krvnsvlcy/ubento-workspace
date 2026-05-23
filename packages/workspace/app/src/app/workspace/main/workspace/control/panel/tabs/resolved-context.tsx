import React, { useEffect, useState } from "react";
import { WorkspaceEngine } from "../../../../../../../engine/workspace/engine";

export function ResolvedContextTab({
  controller,
}: {
  controller: WorkspaceEngine;
}) {
  const [resolvedContext, setResolvedContext] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = controller.appEngine.useState((s) => s.location);
  const boardId = location?.board;

  useEffect(() => {
    if (boardId) {
      setLoading(true);
      setError(null);
      controller
        .resolveBoardContextSchema({ boardId })
        .then((result) => {
          setResolvedContext(result);
          setLoading(false);
        })
        .catch((e) => {
          setError(e.message || "Failed to resolve context");
          setLoading(false);
        });
    }
  }, [boardId, controller]);

  if (!boardId) {
    return (
      <div className="p-4 text-neutral-content-muted">No active board</div>
    );
  }

  if (loading) {
    return <div className="p-4 text-neutral-content-muted">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-400 bg-red-400/10 rounded-md">{error}</div>
    );
  }

  return (
    <div className="p-4 h-full overflow-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-xs font-bold text-neutral-content-muted uppercase">
          Resolved Context Schema
        </p>
      </div>
      <pre className="grow text-[11px] font-mono leading-relaxed text-foreground-300 bg-black/20 p-3 rounded-md scrollbar-hide overflow-auto">
        {JSON.stringify(resolvedContext, null, 2)}
      </pre>
    </div>
  );
}
