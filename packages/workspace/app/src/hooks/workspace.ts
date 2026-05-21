import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { WorkspaceEngine } from "@/engine/workspace/engine";
import { useQuery } from "@tanstack/react-query";

export function useWorkspaceServices(workspaceEngine: WorkspaceEngine) {
  const workspaceSpec = workspaceEngine.useState((s) => s.workspace.spec) || {};
  const installedServices = workspaceSpec.isValid
    ? workspaceSpec.data?.services || {}
    : {};
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

  const { data: connections, isPending } = useQuery({
    queryKey: ["team-connections", session.teamId, provider],
    queryFn: async () => {
      const result = await ubento.sdk.vertex.listConnections({
        team_id: session.teamId || "",
        provider,
      });
      return result?.data || [];
    },
    enabled: !!session.teamId && !!provider,
  });

  return {
    isInstalled,
    installedServices,
    connections,
    isPending,
  };
}
