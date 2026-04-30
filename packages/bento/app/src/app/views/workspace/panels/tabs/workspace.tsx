import { Globe, Plus, Puzzle, Settings2, Trash2 } from "lucide-react";
import { useStore } from "zustand";
import { WorkspaceController } from "../../controller";
import { PropertyRow, Section, Select, TextInput } from "../shared";

export function WorkspaceTab({
  controller,
}: {
  controller: WorkspaceController;
}) {
  const state = useStore(controller);
  const workspace = state.workspace;

  if (!workspace) return null;

  const updateWorkspace = (data: Partial<typeof workspace>) => {
    controller.getState().updateWorkspace(data);
  };

  const handleAddService = () => {
    const serviceName = prompt("Enter service name:");
    if (!serviceName) return;
    const moduleId = prompt("Enter module ID:");
    if (!moduleId) return;

    const services = { ...workspace.services };
    services[serviceName] = {
      moduleId,
      moduleVersionId: "latest",
      args: {},
    };
    updateWorkspace({ services });
  };

  const handleRemoveService = (name: string) => {
    const services = { ...workspace.services };
    delete services[name];
    updateWorkspace({ services });
  };

  return (
    <div className="pb-8">
      <Section title="General" icon={Settings2}>
        <PropertyRow label="Workspace Name">
          <TextInput
            value={workspace.name}
            onChange={(v) => updateWorkspace({ name: v })}
          />
        </PropertyRow>
        <PropertyRow label="Slug">
          <span className="font-mono text-[10px] text-neutral-content-subtle">
            {workspace.slug}
          </span>
        </PropertyRow>
        <PropertyRow label="Home Board">
          <Select
            value={workspace.homeBoardId || ""}
            options={Object.values(state.boards).map((b) => b.id)}
            onChange={(v) => updateWorkspace({ homeBoardId: v })}
          />
        </PropertyRow>
      </Section>

      <Section title="Services" icon={Puzzle}>
        <div className="px-4 py-2">
          {Object.entries(workspace.services || {}).map(([name, data]) => (
            <div key={name} className="mb-2 flex flex-col rounded-md p-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-neutral-content">
                  {name}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemoveService(name)}
                    className="text-neutral-content-subtle hover:text-destructive transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="mt-1 flex flex-col gap-1 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-content-subtle">
                    Module
                  </span>
                  <span className="text-[10px] font-mono text-neutral-content-subtle">
                    {data.moduleId}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-content-subtle">
                    Version
                  </span>
                  <span className="text-[10px] font-mono text-neutral-content-subtle">
                    {data.moduleVersionId || "latest"}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddService}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-md py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-content-muted transition-colors hover:text-accent"
          >
            <Plus size={12} />
            Add Service
          </button>
        </div>
      </Section>

      <Section title="Info" icon={Globe}>
        <PropertyRow label="Workspace ID">
          <span className="font-mono text-[10px] text-neutral-content-subtle">
            {workspace.id}
          </span>
        </PropertyRow>
        <PropertyRow label="Team ID">
          <span className="font-mono text-[10px] text-neutral-content-subtle">
            {workspace.teamId}
          </span>
        </PropertyRow>
      </Section>
    </div>
  );
}
