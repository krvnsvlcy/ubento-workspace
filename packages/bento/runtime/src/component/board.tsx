import { AlertCircle, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { transform } from "sucrase";
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
  const workspace = runtime.useState((s) => s.workspace);
  const [compiledComponent, setCompiledComponent] = useState<React.ComponentType<any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const board = workspace.spec.isValid && workspace.spec.data?.boards
    ? workspace.spec.data.boards[boardId]
    : undefined;

  useEffect(() => {
    if (!board) {
      setError("Board not found in workspace spec.");
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError(null);

    const loadAndCompile = async () => {
      try {
        // Fetch source code from host via RPC
        const { sourceCode } = await runtime.rpc.egress.readModuleSource({
          moduleId: board.module.id,
          versionId: board.module.versionId,
        });

        if (!active) return;

        // Transpile using Sucrase
        const { code: compiledCode } = transform(sourceCode, {
          transforms: ["typescript", "jsx"],
          jsxRuntime: "automatic",
          production: true,
        });

        const blob = new Blob([compiledCode], {
          type: "application/javascript",
        });
        const url = URL.createObjectURL(blob);

        try {
          const mod = await import(/* @vite-ignore */ url);
          const DefaultExport = mod.default || mod;

          if (typeof DefaultExport !== "function") {
            throw new Error("The board component must export a default React component.");
          }

          if (active) {
            setCompiledComponent(() => DefaultExport);
            setError(null);
          }
        } finally {
          setTimeout(() => URL.revokeObjectURL(url), 5000);
        }
      } catch (err: any) {
        console.error("[bento.runtime] Failed to load/compile board:", err);
        if (active) {
          setError(err.message || "Failed to load/compile board.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadAndCompile();

    return () => {
      active = false;
    };
  }, [boardId, board?.module?.id, board?.module?.versionId]);

  if (loading) {
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
        <p className="text-neutral-content-muted text-center max-w-md mb-8 font-mono text-sm bg-neutral-surface border border-neutral-border rounded-xl p-4">
          {error || "The board you are looking for does not exist."}
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

  const Component = compiledComponent;

  if (!Component) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-neutral-surface/20 p-6">
        <Loader2 className="w-10 h-10 text-accent animate-spin mb-4" />
        <p className="text-neutral-content-muted font-medium">Compiling component...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden bg-background">
      <Component {...params} />
    </div>
  );
}
