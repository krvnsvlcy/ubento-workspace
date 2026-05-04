import {
  BoardView,
  DebugOverlay,
  EnvironmentContext,
  type BoardSpec,
} from "@ubento/engine";
import { environment } from "../environment/environment";
import { LayoutContext } from "../environment/style";

interface ViewerPaneProps {
  spec: BoardSpec;
  error: string | null;
}

export function ViewerPane({ spec, error }: ViewerPaneProps) {
  return (
    <div className="flex-1 flex flex-col relative bg-white overflow-hidden h-full">
      <div className="flex-1 overflow-auto">
        {!error ? (
          <BoardPreview spec={spec} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-12 animate-in fade-in duration-500">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-rose-500"
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
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Configuration Error
            </h3>
            <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function BoardPreview({ spec }: { spec: BoardSpec }) {
  return (
    <EnvironmentContext value={environment}>
      <LayoutContext value={spec.style?.direction || "column"}>
        <BoardView spec={spec}>
          <DebugOverlay />
        </BoardView>
      </LayoutContext>
    </EnvironmentContext>
  );
}
