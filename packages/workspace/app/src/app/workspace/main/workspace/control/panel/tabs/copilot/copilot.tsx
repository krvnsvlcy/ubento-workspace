import { CopilotInput } from "./input";
import { CopilotThread } from "./thread";

export function CopilotTab() {
  return (
    <div className="flex h-full flex-col">
      <CopilotThread />
      <CopilotInput />
    </div>
  );
}
