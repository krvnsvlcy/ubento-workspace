import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UbentoSDK } from "@ubento/sdk";

export function createUbentoIamService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  return {
    // ===== Users =====

    useUser: (userId: string) => {
      return useQuery({
        queryKey: ["user", userId],
        queryFn: async () => {
          return await ubentoSdk.iam.getUser(userId);
        },
        enabled: !!userId,
      });
    },

    useUserTeams: (userId: string) => {
      return useQuery({
        queryKey: ["user-teams", userId],
        queryFn: async () => {
          return await ubentoSdk.iam.getUserTeams(userId);
        },
        enabled: !!userId,
      });
    },

    // ===== Teams =====

    useTeams: (
      filters: { ids?: string[]; name?: string; handle?: string } = {},
    ) => {
      return useQuery({
        queryKey: ["teams", filters],
        queryFn: async () => {
          return await ubentoSdk.iam.listTeams(filters);
        },
      });
    },

    useTeam: (teamId: string) => {
      return useQuery({
        queryKey: ["team", teamId],
        queryFn: async () => {
          return await ubentoSdk.iam.getTeam(teamId);
        },
        enabled: !!teamId,
      });
    },

    useCreateTeam: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async (data: {
          name: string;
          handle: string;
          owner: string;
        }) => {
          return await ubentoSdk.iam.createTeam(data);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
      });
    },

    useUpdateTeam: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async ({
          teamId,
          data,
        }: {
          teamId: string;
          data: { name?: string; handle?: string };
        }) => {
          return await ubentoSdk.iam.updateTeam(teamId, data);
        },
        onSuccess: (_, { teamId }) => {
          queryClient.invalidateQueries({ queryKey: ["teams"] });
          queryClient.invalidateQueries({ queryKey: ["team", teamId] });
        },
      });
    },

    // ===== Invites =====

    useTeamInvites: (teamId: string) => {
      return useQuery({
        queryKey: ["team-invites", teamId],
        queryFn: async () => {
          return await ubentoSdk.iam.listTeamInvites({ teamId });
        },
        enabled: !!teamId,
      });
    },

    useCreateTeamInvite: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async (data: {
          teamId: string;
          email: string;
          role: string;
        }) => {
          return await ubentoSdk.iam.createTeamInvite(data);
        },
        onSuccess: (_, { teamId }) => {
          queryClient.invalidateQueries({ queryKey: ["team-invites", teamId] });
        },
      });
    },
  };
}
