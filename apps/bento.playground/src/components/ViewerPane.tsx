import { BoardView, EnvironmentContext, type BoardSpec } from "@ubento/engine";
import { environment } from "../environment/environment";
import { LayoutContext } from "../environment/style";

interface ViewerPaneProps {
  spec: BoardSpec;
  error: string | null;
}

export function ViewerPane({ spec, error }: ViewerPaneProps) {
  return (
    <div className="flex-1 flex flex-col relative bg-[#050505] overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="flex-1 overflow-auto z-10">
        {!error ? (
          <BoardPreview spec={spec} />
        ) : (
          <div className="flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 shadow-lg shadow-rose-500/5">
              <svg
                className="w-8 h-8 text-rose-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white/90 mb-2">
              Configuration Error
            </h3>
            <p className="text-sm text-white/40 max-w-[280px] leading-relaxed">
              {error}
            </p>
          </div>
        )}
      </div>
      {/* Status Bar */}
      <div className="mt-auto border-t border-white/5 bg-[#0d0d0d]/80 backdrop-blur-xl px-10 py-4 flex items-center justify-between text-[10px] text-white/30 uppercase tracking-[0.2em] font-black z-20">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>Renderer 0.18.0</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span>Workspace: Local</span>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
            <span className="text-white/60">Live Preview Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BoardPreview({ spec }: { spec: BoardSpec }) {
  return (
    <EnvironmentContext value={environment}>
      <LayoutContext.Provider value={spec.style?.direction || "column"}>
        <BoardView spec={spec} />
      </LayoutContext.Provider>
    </EnvironmentContext>
  );
}
