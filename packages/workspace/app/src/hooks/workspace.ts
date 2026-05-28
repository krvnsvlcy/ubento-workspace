import { useSession } from "@/contexts/session";
import { useUbento, useUbentoEngine } from "@/hooks/app-engine";
import { WorkspaceEngine } from "@/engine/workspace/engine";
import { useQuery } from "@tanstack/react-query";
import { ServiceSpecV1 } from "@ubento/vertex.core";

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
  {
    serviceId,
    specData,
  }: {
    serviceId: string;
    specData?: ServiceSpecV1;
  },
) {
  const engine = useUbentoEngine();
  const { installedServices, installedServiceIds } =
    useWorkspaceServices(workspaceEngine);
  const isInstalled = installedServiceIds.has(serviceId);
  const {
    data: provider,
    isPending: isPendingProvider,
    isError: isErrorProvider,
  } = engine.ubento.vertex.useConnectionProviderByHandle(
    specData?.connection?.provider || "",
    {
      enabled: !!specData?.connection?.provider,
    },
  );

  const session = useSession();
  const ubento = useUbento();

  const {
    data: connections,
    isPending: isPendingConnections,
    isError: isErrorConnections,
  } = useQuery({
    queryKey: ["team-connections", session.teamId, provider],
    queryFn: async () => {
      const result = await ubento.sdk.vertex.listConnections({
        team_id: session.teamId || "",
        provider_id: provider?.id || "",
      });
      return result?.data || [];
    },
    enabled: !!session.teamId && !!provider,
  });

  return {
    isInstalled,
    installedServices,
    connections,
    provider,
    isPending: isPendingProvider || isPendingConnections,
    isError: isErrorProvider || isErrorConnections,
  };
}
