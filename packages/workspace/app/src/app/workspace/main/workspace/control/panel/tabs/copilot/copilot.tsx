import { useUbentoEngine } from "@/engine/engine";
import { copilotScope } from "@/engine/copilot/copilot";
import { CopilotInput } from "./input";
import { CopilotThread } from "./thread";

export function CopilotTab() {
  const engine = useUbentoEngine();
  const workspaceId = engine.useState((s) => s.location.workspace);
  const scope = workspaceId ? copilotScope.workspace(workspaceId) : copilotScope.team;

  return (
    <div className="flex h-full flex-col">
      <CopilotThread scope={scope} />
      <CopilotInput scope={scope} />
    </div>
  );
}
