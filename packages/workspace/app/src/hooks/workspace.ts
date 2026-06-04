import { useSession } from "@/contexts/session";
import { useWorkspaceEngine } from "@/contexts/workspace";
import { WorkspaceEngine } from "@/engine/workspace/engine";
import { useUbento, useUbentoEngine } from "@/hooks/app-engine";
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
  const providerHandle = specData?.type === "http" ? specData.connection?.provider : undefined;
  const {
    data: provider,
    isPending: isPendingProvider,
    isError: isErrorProvider,
  } = engine.ubento.vertex.useConnectionProviderByHandle(
    providerHandle || "",
    {
      enabled: !!providerHandle,
    },
  );

  const session = useSession();
  const ubento = useUbento();

  const {
    data: connections,
    isPending: isPendingConnections,
    isError: isErrorConnections,
  } = useQuery({
    queryKey: ["team-connections", session.teamId, provider?.id],
    queryFn: async () => {
      if (!session.teamId || !provider?.id) return [];
      const result = await ubento.sdk.vertex.listConnections({
        team_id: session.teamId,
      });
      return (result?.data || []).filter((c: any) => c.data?.providerId === provider.id);
    },
    enabled: !!session.teamId && !!provider?.id,
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

export function useWorkspaceSpec() {
  const workspaceEngine = useWorkspaceEngine();
  const spec = workspaceEngine.useState((s) => s.workspace.spec);
  return spec;
}
export function useValidWorkspaceSpec() {
  const spec = useWorkspaceSpec();
  return spec?.isValid ? spec.data : undefined;
}
export function useWorkspaceLocation() {
  const workspaceEngine = useWorkspaceEngine();
  const location = workspaceEngine.userSetting.useState((s) => s.data.board);
  return location;
}
export function useActiveBoard() {
  const spec = useValidWorkspaceSpec();
  const location = useWorkspaceLocation();
  return location ? spec?.boards?.[location.id] : undefined;
}
export function useEditingModule() {
  const workspaceEngine = useWorkspaceEngine();
  const editingModule = workspaceEngine.userSetting.useState(
    (s) => s.data.editingModule,
  );
  return editingModule;
}
export function useEditingModuleId() {
  const editingModule = useEditingModule();
  return editingModule?.id;
}
