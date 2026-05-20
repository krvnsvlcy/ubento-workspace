import { useWorkspaceEngine } from "@/contexts/workspace";
import { Check, Copy, Edit2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";

export function BoardTab() {
  const workspaceEngine = useWorkspaceEngine();
  const location = workspaceEngine.appEngine.useState((s) => s.location);
  const boardId = location.board;
  const board = workspaceEngine.useState((s) =>
    boardId ? s.boards[boardId] : null,
  );
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (board && !isEditing) {
      setEditText(JSON.stringify(board.spec.data, null, 2));
    }
  }, [board, isEditing]);

  const handleCopy = () => {
    if (board) {
      const content = JSON.stringify(board.spec.data, null, 2);
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = async () => {
    if (!boardId) return;
    try {
      const parsed = JSON.parse(editText);
      setError(null);
      await workspaceEngine.writeBoardSpec({ boardId, spec: parsed });
      setIsEditing(false);
    } catch (e: any) {
      setError(e.message || "Invalid JSON");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-foreground-100">
            {board?.title || "No Board Selected"}
          </h2>
          <span className="text-[10px] text-foreground-400">
            {boardId || "Select a board to view its spec"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {board && !isEditing && (
            <>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-foreground-200 rounded-md transition-colors"
                title="Copy board spec as JSON"
              >
                {copied ? (
                  <Check size={12} className="text-green-400" />
                ) : (
                  <Copy size={12} />
                )}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-foreground-200 rounded-md transition-colors"
                title="Edit board spec"
              >
                <Edit2 size={12} />
                <span>Edit</span>
              </button>
            </>
          )}
          {isEditing && (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-primary-500/10 hover:bg-primary-500/20 text-primary-400 rounded-md transition-colors"
                title="Save changes"
              >
                <Save size={12} />
                <span>Save</span>
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setError(null);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-foreground-200 rounded-md transition-colors"
                title="Cancel editing"
              >
                <X size={12} />
                <span>Cancel</span>
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="text-xs text-red-400 bg-red-400/10 p-2 rounded-md">
          {error}
        </div>
      )}

      {board && (
        <div className="relative group">
          {isEditing ? (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full h-[500px] text-[11px] font-mono leading-relaxed text-foreground-300 bg-black/20 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500/50 resize-none scrollbar-hide"
            />
          ) : (
            <pre className="max-h-[500px] overflow-auto text-[11px] font-mono leading-relaxed text-foreground-300 bg-black/20 p-3 rounded-md scrollbar-hide">
              {JSON.stringify(board.spec.data, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
