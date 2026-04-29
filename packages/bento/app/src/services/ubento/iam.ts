import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UbentoSDK } from "@ubento/sdk";
import { queryKeys } from "./keys";
import { useUbento } from "./ubento";

// ===== Users =====

export function useUser(userId: string) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      return await ubento.iam.getUser(userId);
    },
    enabled: !!userId,
  });
}

export function useUserTeams(userId: string) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["user-teams", userId],
    queryFn: async () => {
      return await ubento.iam.getUserTeams(userId);
    },
    enabled: !!userId,
  });
}

// ===== Teams =====

export function useTeams(
  filters: { ids?: string[]; name?: string; handle?: string } = {},
) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["teams", filters],
    queryFn: async () => {
      return await ubento.iam.listTeams(filters);
    },
  });
}

export function useTeam(teamId: string) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["team", teamId],
    queryFn: async () => {
      return await ubento.iam.getTeam(teamId);
    },
    enabled: !!teamId,
  });
}

export function useCreateTeam() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      handle: string;
      owner: string;
    }) => {
      return await ubento.iam.createTeam(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
}

export function useUpdateTeam() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      teamId,
      data,
    }: {
      teamId: string;
      data: { name?: string; handle?: string };
    }) => {
      return await ubento.iam.updateTeam(teamId, data);
    },
    onSuccess: (_, { teamId }) => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["team", teamId] });
    },
  });
}

// ===== Invites =====

export function useTeamInvites(teamId: string) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["team-invites", teamId],
    queryFn: async () => {
      return await ubento.iam.listTeamInvites({ teamId });
    },
    enabled: !!teamId,
  });
}

export function useCreateTeamInvite() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      teamId: string;
      email: string;
      role: string;
    }) => {
      return await ubento.iam.createTeamInvite(data);
    },
    onSuccess: (_, { teamId }) => {
      queryClient.invalidateQueries({ queryKey: ["team-invites", teamId] });
    },
  });
}

// ===== Modules =====

export function useModules({ team_id }: { team_id?: string } = {}) {
  const ubento = useUbento();
  return useQuery({
    queryKey: queryKeys.modules({ team_id }),
    queryFn: async () => {
      return await ubento.module.listModules({ team_id });
    },
    enabled: true,
  });
}

export function useModule(moduleId: string) {
  const ubento = useUbento();
  return useQuery({
    queryKey: queryKeys.module({ moduleId }),
    queryFn: async () => {
      return await ubento.module.getModule(moduleId);
    },
    enabled: !!moduleId,
  });
}

export function useCreateModule() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      slug?: string;
      team_id: string;
      source: string;
      scope: "public" | "team";
    }) => {
      return await ubento.module.createModule(data);
    },
    onSuccess: (_, { team_id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.modules({ team_id }),
      });
    },
  });
}

export function useUpdateModule() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      moduleId,
      data,
    }: {
      moduleId: string;
      data: { name?: string; slug?: string };
    }) => {
      return await ubento.module.updateModule(moduleId, data);
    },
    onSuccess: (_, { moduleId }) => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.invalidateQueries({
        queryKey: queryKeys.module({ moduleId }),
      });
    },
  });
}

export function useDeleteModule() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (moduleId: string) => {
      return await ubento.module.deleteModule(moduleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
  });
}

export function createUbentoIamService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  return {
    useDeleteModule: () => {
      const queryClient = useQueryClient();

      return useMutation({
        mutationFn: async (moduleId: string) => {
          return await ubentoSdk.module.deleteModule(moduleId);
        },
        onMutate: async (deletedModuleId: string) => {
          await queryClient.cancelQueries({ queryKey: ["modules"] });
          const previousModules = queryClient.getQueryData(["modules"]);
          queryClient.setQueryData(["modules"], (old: any) => {
            if (!old) return old;
            // Assumes your modules list is a flat array.
            // If it's paginated (e.g., { pages: [...] }), this logic shifts slightly.
            return old.filter((mod: any) => mod.id !== deletedModuleId);
          });

          // Return the snapshot context so onError can use it
          return { previousModules };
        },

        // 3. The Fallback (If the server throws an error)
        onError: (err, deletedModuleId, context) => {
          // Revert the cache back to the exact state it was in before the optimistic update
          if (context?.previousModules) {
            queryClient.setQueryData(["modules"], context.previousModules);
          }
          // Tip: You can also trigger a toast notification here (e.g., "Failed to delete module")
        },

        // 4. The Source of Truth (Fires after success OR error)
        onSettled: (data, error, deletedModuleId) => {
          // Ensure the local cache is perfectly synced with the server state
          queryClient.invalidateQueries({ queryKey: ["modules"] });

          // Granular cleanup: also clear the cache for this specific module ID
          // just in case it's being cached individually in a detail view
          queryClient.invalidateQueries({
            queryKey: ["modules", deletedModuleId],
          });
        },
      });
    },
  };
}
