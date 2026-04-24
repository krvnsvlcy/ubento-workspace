import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
