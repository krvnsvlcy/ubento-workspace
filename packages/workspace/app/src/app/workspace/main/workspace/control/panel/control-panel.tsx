import { useCopilot } from "@/contexts/copilot";
import { Button } from "@ubento/workspace.primitives";
import {
  Box,
  Database,
  Edit2,
  History,
  LayoutDashboard,
  Plus,
  Save,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { WorkspaceEngine } from "../../../../../../engine/workspace/engine";
import { BoardTab } from "./tabs/board";
import { CopilotTab } from "./tabs/copilot/copilot";
import { HistoryTab } from "./tabs/copilot/history";

function SelectionTab({ controller }: { controller: WorkspaceEngine }) {
  const selection = controller.useState((s) => s.selection);
  const boards = controller.useState((s) => s.boards);
  const location = controller.appEngine.useState((s) => s.location);

  const currentBoardId = location?.board;
  const currentBoard = currentBoardId ? boards[currentBoardId] : undefined;

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const elements = (currentBoard?.spec?.data as any)?.elements || {};

  useEffect(() => {
    if (!isEditing && selection && currentBoard) {
      const selectedRecord: Record<string, any> = {};
      selection.forEach((id) => {
        if (elements[id]) {
          selectedRecord[id] = elements[id];
        }
      });
      setEditText(JSON.stringify(selectedRecord, null, 2));
    }
  }, [selection, currentBoard, isEditing]);

  if (!selection || selection.length === 0) {
    return (
      <div className="p-4 text-neutral-content-muted">No element selected</div>
    );
  }

  const handleSave = async () => {
    if (!currentBoardId || !currentBoard) return;
    try {
      const parsed = JSON.parse(editText);
      setError(null);

      const updatedElements = { ...elements, ...parsed };
      const updatedSpec = {
        ...currentBoard.spec.data,
        elements: updatedElements,
      };

      await controller.writeBoardSpec({
        boardId: currentBoardId,
        spec: updatedSpec,
      });
      setIsEditing(false);
    } catch (e: any) {
      setError(e.message || "Invalid JSON");
    }
  };

  return (
    <div className="p-4 h-full overflow-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-xs font-bold text-neutral-content-muted uppercase">
          Selection Dataff
        </p>
        <div className="flex items-center gap-2">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-foreground-200 rounded-md transition-colors"
              title="Edit element data"
            >
              <Edit2 size={12} />
              <span>Edit</span>
            </button>
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

      <div className="grow relative min-h-[300px]">
        {isEditing ? (
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full h-full text-[11px] font-mono leading-relaxed text-foreground-300 bg-black/20 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500/50 resize-none scrollbar-hide"
          />
        ) : (
          <pre className="h-full overflow-auto text-[11px] font-mono leading-relaxed text-foreground-300 bg-black/20 p-3 rounded-md scrollbar-hide">
            {editText}
          </pre>
        )}
      </div>

      {!isEditing && selection.map((id) => !elements[id]).some((b) => b) && (
        <div className="p-2 bg-amber-500/10 text-amber-500 text-xs rounded-lg">
          Warning: Some selected IDs were not found in the board spec.
        </div>
      )}
    </div>
  );
}

function ResolvedContextTab({ controller }: { controller: WorkspaceEngine }) {
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

export function ControlPanel({
  controller,
  onClose,
}: {
  controller: WorkspaceEngine;
  onClose: () => void;
}) {
  const copilot = useCopilot();
  const [activeTab, setActiveTab] = useState<string>("ai");
  const mode = controller.useState((s) => s.mode);

  let content = <></>;
  let actions: Array<{
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
  }> = [
    {
      icon: <Plus size={16} />,
      label: "New Conversation",
      onClick: () => {
        copilot.clearActiveThread();
        setActiveTab("ai");
      },
    },
    {
      icon: <History size={16} />,
      label: "History",
      onClick: () => {
        setActiveTab("ai-history");
      },
    },
    {
      icon: <LayoutDashboard size={16} />,
      label: "Board",
      onClick: () => {
        setActiveTab("board");
      },
    },
    {
      icon: <Box size={16} />,
      label: "Selection",
      onClick: () => {
        setActiveTab("selection");
      },
    },
    {
      icon: <Database size={16} />,
      label: "Resolved Context",
      onClick: () => {
        setActiveTab("resolved-context");
      },
    },
  ];

  switch (activeTab) {
    case "ai":
      content = <CopilotTab />;
      break;
    case "ai-history":
      content = <HistoryTab onBack={() => setActiveTab("ai")} />;
      break;
    case "board":
      content = <BoardTab />;
      break;
    case "selection":
      content = <SelectionTab controller={controller} />;
      break;
    case "resolved-context":
      content = <ResolvedContextTab controller={controller} />;
      break;
  }

  return (
    <div
      className="h-full flex flex-col"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-2">
          {actions.map((a) => (
            <Button
              key={a.label}
              size="icon"
              shape="circle"
              onClick={a.onClick}
              variant="ghost"
              title={a.label}
            >
              {a.icon}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            shape="circle"
            onClick={() => {
              controller.setInteractionMode(mode === "live" ? "edit" : "live");
            }}
            title={`Switch to ${mode === "live" ? "edit" : "live"} mode`}
          >
            {mode === "live" ? (
              <Edit2 size={16} />
            ) : (
              <LayoutDashboard size={16} />
            )}
          </Button>
          <Button variant="ghost" size="icon" shape="circle" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
      </div>
      <hr />
      <div className="grow overflow-hidden">{content}</div>
    </div>
  );
}
