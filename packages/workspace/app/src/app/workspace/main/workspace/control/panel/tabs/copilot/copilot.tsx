import { CopilotInput } from "./input";
import { CopilotPlanStatus } from "./plan-status";
import { CopilotThread } from "./thread";

export function CopilotTab() {
  return (
    <div className="flex h-full flex-col">
      <CopilotPlanStatus />
      <CopilotThread />
      <CopilotInput />
    </div>
  );
}
