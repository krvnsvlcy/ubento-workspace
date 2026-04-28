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
          <span className="font-mono text-[10px] text-foreground-500">
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
                <span className="text-[11px] font-bold text-foreground">
                  {name}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemoveService(name)}
                    className="text-foreground-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="mt-1 flex flex-col gap-1 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-foreground-500">
                    Module
                  </span>
                  <span className="text-[10px] font-mono text-foreground-300">
                    {data.moduleId}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-foreground-500">
                    Version
                  </span>
                  <span className="text-[10px] font-mono text-foreground-300">
                    {data.moduleVersionId || "latest"}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddService}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-md py-2 text-[10px] font-bold uppercase tracking-wider text-foreground-400 transition-colors hover:text-primary-500"
          >
            <Plus size={12} />
            Add Service
          </button>
        </div>
      </Section>

      <Section title="Info" icon={Globe}>
        <PropertyRow label="Workspace ID">
          <span className="font-mono text-[10px] text-foreground-500">
            {workspace.id}
          </span>
        </PropertyRow>
        <PropertyRow label="Team ID">
          <span className="font-mono text-[10px] text-foreground-500">
            {workspace.teamId}
          </span>
        </PropertyRow>
      </Section>
    </div>
  );
}
