import { useCopilot } from "@/contexts/copilot";
import { useUbento, useUbentoEngine } from "@/engine/app/engine";
import cx from "clsx";
import { History, Loader2, MessageSquare } from "lucide-react";

export function HistoryTab({ onBack }: { onBack: () => void }) {
  const engine = useUbentoEngine();
  const copilot = useCopilot();
  const ubento = useUbento();

  const workspaceSlug = engine.useState((s) => s.location.workspace);
  const session = engine.useState((s) => s.session);
  const { data: workspace, isLoading: workspaceLoading } =
    ubento.workspace.useWorkspaceBySlug(
      { slug: workspaceSlug || "" },
      {
        enabled: !!workspaceSlug,
      },
    );

  const { data: threads = [], isLoading: threadsLoading } =
    ubento.intelligence.useThreads(
      {
        // workspace_id: workspace?.id,
        team_id: session.teamId,
      },
      {
        enabled: !workspaceSlug || !!workspace,
      },
    );

  const isLoading = (workspaceSlug && workspaceLoading) || threadsLoading;

  const activeThreadId = copilot.useState((s) => s.activeThreadId);

  const handleSelectThread = (threadId: string) => {
    copilot.setActiveThread(threadId);
    onBack();
  };

  return (
    <div className="h-full overflow-y-auto">
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center p-8">
          <Loader2 size={20} className="animate-spin text-accent" />
        </div>
      ) : threads.length === 0 ? (
        <div className="h-full w-full flex flex-col items-center justify-center text-neutral-content-muted gap-2">
          <History size={24} opacity={0.5} />
          <span className="text-xs">No history yet</span>
        </div>
      ) : (
        <div className="p-2 space-y-1">
          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => handleSelectThread(thread.id)}
              className={cx(
                "w-full flex flex-col items-start gap-1 p-3 rounded-lg text-left transition-colors",
                activeThreadId === thread.id
                  ? "bg-accent/10 border-accent/20"
                  : "hover:bg-neutral-content/5",
              )}
            >
              <div className="flex items-center gap-2 w-full">
                <MessageSquare
                  size={14}
                  className={cx(
                    activeThreadId === thread.id
                      ? "text-accent"
                      : "text-neutral-content-muted",
                  )}
                />
                <span
                  className={cx("text-xs font-medium truncate flex-1", {
                    "text-accent": activeThreadId === thread.id,
                    "text-neutral-content": activeThreadId !== thread.id,
                  })}
                >
                  {thread.title || "Untitled Conversation"}
                </span>
              </div>
              <div className="text-[10px] text-neutral-content-muted flex justify-between w-full">
                <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                <span>
                  {new Date(thread.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
