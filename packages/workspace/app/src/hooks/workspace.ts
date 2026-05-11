import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { useQuery } from "@tanstack/react-query";
import { WorkspaceEngine } from "@/engine/workspace/engine";

export function useWorkspaceServices(workspaceEngine: WorkspaceEngine) {
  const workspaceSpec = workspaceEngine.useState((s) => s.workspace.spec) || {};
  const installedServices =
    workspaceSpec.status === "valid" ? workspaceSpec.data?.services || {} : {};
  const installedServiceNames = new Set(
    Object.values(installedServices).map((s) => s.name),
  );

  return { installedServices, installedServiceNames };
}

export function useServiceWorkspaceState(
  workspaceEngine: WorkspaceEngine,
  service: {
    name: string;
    provider?: string;
  },
) {
  const { installedServices, installedServiceNames } = useWorkspaceServices(workspaceEngine);
  const isInstalled = installedServiceNames.has(service.name);

  const session = useSession();
  const ubento = useUbento();
  const provider = service.provider;

  const { data: connections, isLoading: isLoadingConnections } = useQuery({
    queryKey: ["team-connections", session.teamId, provider],
    queryFn: async () => {
      const result = await ubento.sdk.vertex.listConnections({
        team_id: session.teamId || "",
      });
      const connectionsArray = Array.isArray(result) ? result : (result as any)?.data || [];
      return connectionsArray.filter((c: any) => c.provider?.name === provider || c.provider?.code === provider);
    },
    enabled: !!session.teamId && !!provider,
  });

  return { isInstalled, installedServices, connections, isLoadingConnections };
}
