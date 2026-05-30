import { useCopilot } from "@/contexts/copilot";
import { useUbentoEngine } from "@/hooks/app-engine";
import { 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Circle, 
  ListTodo, 
  Lock, 
  PlayCircle 
} from "lucide-react";
import { useState } from "react";

export function CopilotPlanStatus() {
  const appEngine = useUbentoEngine();
  const copilot = useCopilot();
  const activeThreadId = copilot.useState((s) => s.activeThreadId);

  const { data: threadData } = appEngine.ubento.intelligence.useThread(
    activeThreadId ?? "",
    { enabled: !!activeThreadId }
  );

  const [isExpanded, setIsExpanded] = useState(true);

  if (!threadData || !activeThreadId) return null;

  const resources = (threadData.context as any)?.resources || [];
  const planModeResource = resources.find((r: any) => r.key === "plan_mode");
  const tasksResource = resources.find((r: any) => r.key === "tasks");

  const planMode = planModeResource?.data as { active?: boolean; reason?: string } | undefined;
  const tasks = (tasksResource?.data as { tasks?: any[] } | undefined)?.tasks || [];

  const isPlanModeActive = planMode?.active === true;
  const hasTasks = tasks.length > 0;

  if (!isPlanModeActive && !hasTasks) return null;

  const completedTasks = tasks.filter((t: any) => t.status === "closed").length;
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Build tree structure
  const rootTasks = tasks.filter((t: any) => !t.parentId);
  const getSubtasks = (parentId: string) => tasks.filter((t: any) => t.parentId === parentId);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "closed":
        return <CheckCircle2 className="text-emerald-500 w-4 h-4" />;
      case "in_progress":
        return <PlayCircle className="text-yellow-500 w-4 h-4 animate-pulse" />;
      case "blocked":
        return <AlertTriangle className="text-rose-500 w-4 h-4" />;
      default:
        return <Circle className="text-content-muted w-4 h-4" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "closed":
        return "border-emerald-500/25 bg-emerald-500/5 text-emerald-400";
      case "in_progress":
        return "border-yellow-500/25 bg-yellow-500/5 text-yellow-400";
      case "blocked":
        return "border-rose-500/25 bg-rose-500/5 text-rose-400";
      default:
        return "border-border bg-surface text-content-subtle";
    }
  };

  return (
    <div className="mx-3 mt-3 overflow-hidden rounded-2xl border border-border bg-surface/20 backdrop-blur-md animate-in fade-in slide-in-from-top duration-300">
      {/* Header / Plan Mode active bar */}
      {isPlanModeActive && (
        <div className="flex items-center justify-between border-b border-border bg-amber-500/5 px-4 py-2.5 text-xs text-amber-500">
          <div className="flex items-center gap-2">
            <Lock size={14} className="animate-pulse" />
            <span className="font-semibold">Plan Mode Active</span>
            <span className="text-content-subtle font-normal">
              • Mutating tools locked until approved
            </span>
          </div>
          {planMode?.reason && (
            <span className="max-w-[200px] truncate text-right italic text-amber-500/80">
              "{planMode.reason}"
            </span>
          )}
        </div>
      )}

      {/* Task Tracker Header */}
      {hasTasks && (
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex cursor-pointer items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-surface border border-border p-1.5 text-content">
              <ListTodo size={16} />
            </div>
            <div>
              <div className="text-xs font-semibold text-content font-mono uppercase tracking-wider">Task Checklist</div>
              <div className="text-[10px] text-content-subtle mt-0.5">
                {completedTasks} of {totalTasks} tasks completed ({progressPercent}%)
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Progress bar */}
            <div className="w-24 h-1.5 rounded-full bg-border overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
            {isExpanded ? <ChevronUp size={16} className="text-content-subtle" /> : <ChevronDown size={16} className="text-content-subtle" />}
          </div>
        </div>
      )}

      {/* Expandable Task List */}
      {hasTasks && isExpanded && (
        <div className="border-t border-border bg-black/10 px-4 py-3 max-h-[220px] overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-2.5">
            {rootTasks.map((task: any) => {
              const subtasks = getSubtasks(task.id);
              return (
                <div key={task.id} className="flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-3 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0">{getStatusIcon(task.status)}</span>
                      <div>
                        <span className="font-semibold text-content">{task.id}: {task.title}</span>
                        {task.description && (
                          <div className="text-[11px] text-content-subtle mt-0.5">{task.description}</div>
                        )}
                        {task.dependencies && task.dependencies.length > 0 && (
                          <div className="text-[10px] text-content-subtle mt-1 flex flex-wrap gap-1 items-center">
                            <span>Requires:</span>
                            {task.dependencies.map((depId: string) => (
                              <span key={depId} className="px-1 rounded bg-white/5 border border-white/10 font-mono text-[9px]">{depId}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium border uppercase tracking-wider ${getStatusStyles(task.status)}`}>
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                  {/* Render Subtasks */}
                  {subtasks.length > 0 && (
                    <div className="ml-6 border-l border-border pl-3 flex flex-col gap-2">
                      {subtasks.map((sub: any) => (
                        <div key={sub.id} className="flex items-start justify-between gap-3 text-[11px]">
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5 flex-shrink-0">{getStatusIcon(sub.status)}</span>
                            <div>
                              <span className="font-medium text-content">{sub.id}: {sub.title}</span>
                              {sub.description && (
                                <div className="text-[10px] text-content-subtle">{sub.description}</div>
                              )}
                            </div>
                          </div>
                          <span className={`rounded px-1.5 py-0.2 text-[8px] font-medium border uppercase tracking-wider ${getStatusStyles(sub.status)}`}>
                            {sub.status.replace("_", " ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
