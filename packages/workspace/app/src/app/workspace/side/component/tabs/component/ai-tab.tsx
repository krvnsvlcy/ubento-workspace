import { Sparkles } from "lucide-react";
import { TabDefinition } from "../../../types";

export function ComponentAiTab() {
  return (
    <div className="flex flex-col gap-0.5 p-4">
      <p className="text-[10px] font-bold text-neutral-content-muted uppercase tracking-wider mb-2">
        AI Chat
      </p>
      <div className="p-4 text-center text-[11px] text-neutral-content-muted italic border border-dashed border-neutral-border rounded-xl">
        AI assistance for building and refining your component.
      </div>
    </div>
  );
}

export const componentAiTab: TabDefinition = {
  id: "ai",
  name: "AI",
  icon: Sparkles,
  component: ComponentAiTab,
  enabled: (location) => !!location.component,
};
