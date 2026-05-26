import { TabDefinition } from "../../../types";

export function ComponentDetailsTab() {
  return (
    <div className="flex flex-col gap-0.5 p-4">
      <p className="text-[10px] font-bold text-neutral-content-muted uppercase tracking-wider mb-2">
        Component Details
      </p>
      <div className="p-4 text-center text-[11px] text-neutral-content-muted italic border border-dashed border-neutral-border rounded-xl">
        Details and settings for the active component will appear here.
      </div>
    </div>
  );
}

export const componentDetailsTab: TabDefinition = {
  id: "details",
  name: "Details",
  icon: "info",
  component: ComponentDetailsTab,
  enabled: ({ location }) => !!location.component,
};
