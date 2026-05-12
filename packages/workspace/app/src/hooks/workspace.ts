import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { WorkspaceEngine } from "@/engine/workspace/engine";
import { useQuery } from "@tanstack/react-query";

export function useWorkspaceServices(workspaceEngine: WorkspaceEngine) {
  const workspaceSpec = workspaceEngine.useState((s) => s.workspace.spec) || {};
  const installedServices =
    workspaceSpec.status === "valid" ? workspaceSpec.data?.services || {} : {};
  const installedServiceIds = new Set(
    Object.values(installedServices).map((s) => s.id),
  );

  return { installedServices, installedServiceIds };
}

export function useServiceWorkspaceState(
  workspaceEngine: WorkspaceEngine,
  service: {
    id: string;
    provider?: string;
  },
) {
  const { installedServices, installedServiceIds } =
    useWorkspaceServices(workspaceEngine);
  const isInstalled = installedServiceIds.has(service.id);

  const session = useSession();
  const ubento = useUbento();
  const provider = service.provider;

  const { data: connections, isLoading: isLoadingConnections } = useQuery({
    queryKey: ["team-connections", session.teamId, provider],
    queryFn: async () => {
      const result = await ubento.sdk.vertex.listConnections({
        team_id: session.teamId || "",
      });
      const connectionsArray = result?.data || [];
      return connectionsArray.filter(
        (c: any) =>
          c.provider?.name === provider || c.provider?.code === provider,
      );
    },
    enabled: !!session.teamId && !!provider,
  });

  return { isInstalled, installedServices, connections, isLoadingConnections };
}
