import { LayoutContext } from "@ubento/bento.arlo";
import {
  BoardView,
  EnvironmentContext,
  Interactor,
  useInteractionManager,
  type BoardSpec,
} from "@ubento/bento.core";
import { environment } from "../environment/environment";

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

function Inspector({ spec }: { spec: BoardSpec }) {
  const interactionManager = useInteractionManager();
  const selectedId = interactionManager.useState(
    (state: any) => state.selection[0],
  );

  if (!selectedId || !spec.elements) return null;

  const element = spec.elements[selectedId];
  if (!element) return null;

  return (
    <div className="absolute right-6 top-6 bottom-6 w-80 bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 flex flex-col animate-in slide-in-from-right-4 duration-300 z-[10001]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">
          Inspector
        </h2>
        <button
          onClick={() => interactionManager.clearSelection()}
          className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-6 overflow-auto pr-2">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
            ID
          </label>
          <div className="bg-slate-50 px-3 py-2 rounded-xl text-xs font-mono text-indigo-600 border border-slate-100">
            {selectedId}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
            Component
          </label>
          <div className="text-sm font-bold text-slate-800">
            {element.component}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
            Props
          </label>
          <pre className="bg-slate-50 p-4 rounded-2xl text-[11px] font-mono text-slate-600 border border-slate-100 overflow-auto max-h-60 custom-scrollbar">
            {JSON.stringify(element.inputs, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

function BoardPreview({ spec }: { spec: BoardSpec }) {
  return (
    <EnvironmentContext value={environment}>
      <LayoutContext value={spec.style?.direction || "column"}>
        <BoardView spec={spec}>
          <Interactor />
          <Inspector spec={spec} />
        </BoardView>
      </LayoutContext>
    </EnvironmentContext>
  );
}
