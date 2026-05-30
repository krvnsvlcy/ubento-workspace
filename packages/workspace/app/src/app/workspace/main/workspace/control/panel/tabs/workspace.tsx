import { ServiceData, getSpecOrDefault } from "@ubento/bento.runtime";
import { Globe, Plus, Puzzle, Settings2, Trash2 } from "lucide-react";
import { WorkspaceEngine } from "../../../../../../../engine/workspace/engine";
import { PropertyRow, Section, Select, TextInput } from "../shared";

export function WorkspaceTab({ controller }: { controller: WorkspaceEngine }) {
  const state = controller.useState();
  const workspace = state.workspace;

  if (!workspace) return null;

  const updateWorkspace = (data: Partial<typeof workspace>) => {
    controller.updateWorkspace(data as any);
  };

  const handleAddService = () => {
    const serviceName = prompt("Enter service name:");
    if (!serviceName) return;
    const channel = prompt("Enter channel:") || "stable";
    const connectionId = prompt("Enter connection ID:") || "default";

    const services = { ...(workspace as any).services };
    services[serviceName] = {
      name: serviceName,
      channel,
      connectionId,
    };
    updateWorkspace({ services } as any);
  };

  const handleRemoveService = (name: string) => {
    const services = { ...(workspace as any).services };
    delete services[name];
    updateWorkspace({ services } as any);
  };

  return (
    <div className="pb-8">
      <Section title="General" icon={Settings2}>
        <PropertyRow label="Workspace Name">
          <TextInput
            value={workspace.title}
            onChange={(v) => updateWorkspace({ title: v } as any)}
          />
        </PropertyRow>
        <PropertyRow label="Slug">
          <span className="font-mono text-[10px] text-content-subtle">
            {workspace.slug}
          </span>
        </PropertyRow>
        <PropertyRow label="Home Board">
          <Select
            value={(workspace as any).homeBoardId || ""}
            options={Object.values(
              getSpecOrDefault(workspace.spec, {
                version: 1,
                services: {},
                components: {},
                modules: {},
                packages: {},
                boards: {},
                roots: [],
              }).boards || {},
            ).map((b: any) => b.id)}
            onChange={(v) => updateWorkspace({ homeBoardId: v } as any)}
          />
        </PropertyRow>
      </Section>

      <Section title="Services" icon={Puzzle}>
        <div className="px-4 py-2">
          {(
            Object.entries((workspace as any).services || {}) as [
              string,
              ServiceData,
            ][]
          ).map(([name, data]) => (
            <div key={name} className="mb-2 flex flex-col rounded-md p-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-content">
                  {name}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemoveService(name)}
                    className="text-content-subtle hover:text-base transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="mt-1 flex flex-col gap-1 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-content-subtle">
                    Channel
                  </span>
                  <span className="text-[10px] font-mono text-content-subtle">
                    {(data as any).channelId || (data as any).channel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-content-subtle">
                    Connection
                  </span>
                  <span className="text-[10px] font-mono text-content-subtle">
                    {data.connectionId}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddService}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-md py-2 text-[10px] font-bold uppercase tracking-wider text-content-muted transition-colors hover:text-base"
          >
            <Plus size={12} />
            Add Service
          </button>
        </div>
      </Section>

      <Section title="Info" icon={Globe}>
        <PropertyRow label="Workspace ID">
          <span className="font-mono text-[10px] text-content-subtle">
            {workspace.id}
          </span>
        </PropertyRow>
        <PropertyRow label="Team ID">
          <span className="font-mono text-[10px] text-content-subtle">
            {(workspace as any).teamId}
          </span>
        </PropertyRow>
      </Section>
    </div>
  );
}
