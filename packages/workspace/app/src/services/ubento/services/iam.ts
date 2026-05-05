import {
  createStore,
  useMutation,
  useStoreEntities,
  useStoreEntity,
  UseStoreOptions,
} from "@ubento/fabric";
import { ubentoEntities } from "@ubento/services.primitives";
import { iamClient, UbentoSDK } from "@ubento/services.sdk";
import { useEffect, useState } from "react";
import { UbentoApiPage, ubentoToFabricPagedResponse } from "../libs/pagination";

export function createUbentoIamService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  // --- Stores ---

  const userStore = createStore<
    iamClient.User,
    { email?: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.user.name,
    getKey: (user) => user.id,
    fetchOne: async (key) => {
      return await ubentoSdk.iam.getUser(key);
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.iam.listUsers({
          cursor: page?.cursor,
          limit: page?.limit,
          email: params?.email,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((entity) => {
          if (params?.email) return entity.email === params.email;
          return true;
        })
        .sort((a, b) => a.email.localeCompare(b.email));
    },
  });

  const teamStore = createStore<
    iamClient.Team,
    {
      ids?: string[];
      name?: string;
      handle?: string;
    },
    UbentoApiPage
  >({
    namespace: ubentoEntities.team.name,
    getKey: (team) => team.id,
    fetchOne: async (key) => {
      return await ubentoSdk.iam.getTeam(key);
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.iam.listTeams({
          cursor: page?.cursor,
          limit: page?.limit,
          ids: params?.ids,
          name: params?.name,
          handle: params?.handle,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((entity) => {
          if (params?.name) return entity.name === params.name;
          if (params?.handle) return entity.handle === params.handle;
          if (params?.ids) return params.ids.includes(entity.id);
          return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  });

  const teamInviteStore = createStore<
    iamClient.TeamInvite,
    { teamId: string; email?: string; statuses?: iamClient.InviteStatus[] },
    UbentoApiPage
  >({
    namespace: ubentoEntities.teamInvite.name,
    getKey: (invite) => invite.id,
    fetchOne: async (key) => {
      return await ubentoSdk.iam.getTeamInvite(key);
    },
    fetchMany: async ({ page, params }) => {
      if (!params?.teamId) {
        throw new Error("teamId is required to list team invites");
      }
      return ubentoToFabricPagedResponse(
        await ubentoSdk.iam.listTeamInvites({
          teamId: params.teamId,
          cursor: page?.cursor,
          limit: page?.limit,
          email: params?.email,
          statuses: params?.statuses,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((entity) => {
          if (params?.teamId && entity.team_id !== params.teamId) return false;
          if (params?.email && entity.email !== params.email) return false;
          if (params?.statuses && !params.statuses.includes(entity.status)) {
            return false;
          }
          return true;
        })
        .sort((a, b) => b.created_at.localeCompare(a.created_at));
    },
  });

  const sessionStore = createStore<
    iamClient.Session,
    { user_id?: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.session.name,
    getKey: (session) => session.id,
    fetchOne: async (key) => {
      return await ubentoSdk.iam.getSession(key);
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.iam.listSessions({
          cursor: page?.cursor,
          limit: page?.limit,
          user_id: params?.user_id,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((entity) => {
          if (params?.user_id && entity.user_id !== params.user_id)
            return false;
          return true;
        })
        .sort((a, b) => b.created_at.localeCompare(a.created_at));
    },
  });

  const clientStore = createStore<iamClient.Client, {}, UbentoApiPage>({
    namespace: ubentoEntities.client.name,
    getKey: (client) => client.id,
    fetchOne: async (key) => {
      return await ubentoSdk.iam.getClient(key);
    },
    fetchMany: async ({ page }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.iam.listClients({
          cursor: page?.cursor,
          limit: page?.limit,
        }),
      );
    },
    project: (entities) => {
      return [...entities].sort((a, b) => a.name.localeCompare(b.name));
    },
  });

  const clientCredentialStore = createStore<
    iamClient.ClientCredential,
    { client_id?: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.clientCredential.name,
    getKey: (cred) => cred.id,
    fetchOne: async () => {
      throw new Error("Single client credential fetch is not supported");
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.iam.listClientCredentials({
          cursor: page?.cursor,
          limit: page?.limit,
          client_id: params?.client_id,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((entity) => {
          if (params?.client_id && entity.client_id !== params.client_id) {
            return false;
          }
          return true;
        })
        .sort((a, b) => b.created_at.localeCompare(a.created_at));
    },
  });

  // --- Hooks ---

  const hooks = {
    // Users
    useUser: (userId: string, options?: UseStoreOptions) => {
      return useStoreEntity(userStore, userId, options);
    },
    useUsers: (params?: { email?: string }, options?: UseStoreOptions) => {
      return useStoreEntities(userStore, params, options);
    },
    useDeleteUser: () => {
      return useMutation({
        mutationFn: async (userId: string) => {
          return await ubentoSdk.iam.deleteUser(userId);
        },
        onSuccess: (_, userId) => {
          userStore.remove(userId);
        },
      });
    },
    useUserTeams: (userId: string, options?: { enabled?: boolean }) => {
      const [loading, setLoading] = useState(false);

      useEffect(() => {
        if (options?.enabled === false || !userId) return;

        const load = async () => {
          setLoading(true);
          try {
            await ubentoSdk.iam.getUserTeams(userId).then((res) => {
              teamStore.pushMany(res.data);
            });
          } finally {
            setLoading(false);
          }
        };

        load();
      }, [userId, options?.enabled]);

      return { loading };
    },

    // Teams
    useTeam: (teamId: string, options?: UseStoreOptions) => {
      return useStoreEntity(teamStore, teamId, options);
    },
    useTeams: (
      params?: { ids?: string[]; name?: string; handle?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(teamStore, params, options);
    },
    useCreateTeam: () => {
      return useMutation({
        mutationFn: async (data: {
          name: string;
          handle: string;
          owner: string;
        }) => {
          return await ubentoSdk.iam.createTeam(data);
        },
        onSuccess: (newTeam) => {
          teamStore.push(newTeam);
        },
      });
    },
    useUpdateTeam: (teamId: string) => {
      return useMutation({
        mutationFn: async (update: { name?: string; handle?: string }) => {
          return await ubentoSdk.iam.updateTeam(teamId, update);
        },
        onSuccess: (updatedTeam) => {
          teamStore.push(updatedTeam);
        },
      });
    },
    useDeleteTeam: () => {
      return useMutation({
        mutationFn: async (teamId: string) => {
          return await ubentoSdk.iam.deleteTeam(teamId);
        },
        onSuccess: (_, teamId) => {
          teamStore.remove(teamId);
        },
      });
    },
    useCheckTeamHandle: () => {
      return useMutation({
        mutationFn: async (handle: string) => {
          return await ubentoSdk.iam.checkTeamHandle(handle);
        },
      });
    },

    // Team Invites
    useTeamInvite: (inviteId: string, options?: UseStoreOptions) => {
      return useStoreEntity(teamInviteStore, inviteId, options);
    },
    useTeamInvites: (
      params: {
        teamId: string;
        email?: string;
        statuses?: iamClient.InviteStatus[];
      },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(teamInviteStore, params, options);
    },
    useCreateTeamInvite: () => {
      return useMutation({
        mutationFn: async (params: {
          teamId: string;
          email: string;
          role: string;
          expires_in_seconds?: number;
        }) => {
          return await ubentoSdk.iam.createTeamInvite(params);
        },
        onSuccess: (response) => {
          teamInviteStore.push(response.invite);
        },
      });
    },
    useRevokeTeamInvite: () => {
      return useMutation({
        mutationFn: async (inviteId: string) => {
          return await ubentoSdk.iam.revokeTeamInvite(inviteId);
        },
        onSuccess: (updatedInvite) => {
          teamInviteStore.push(updatedInvite);
        },
      });
    },
    useResolveTeamInvite: () => {
      return useMutation({
        mutationFn: async (token: string) => {
          return await ubentoSdk.iam.resolveTeamInvite(token);
        },
      });
    },
    useAcceptTeamInvite: () => {
      return useMutation({
        mutationFn: async (token: string) => {
          return await ubentoSdk.iam.acceptTeamInvite(token);
        },
        onSuccess: (response) => {
          teamInviteStore.push(response.invite);
          teamStore.push(response.team);
        },
      });
    },

    // Sessions
    useSession: (sessionId: string, options?: UseStoreOptions) => {
      return useStoreEntity(sessionStore, sessionId, options);
    },
    useSessions: (params?: { user_id?: string }, options?: UseStoreOptions) => {
      return useStoreEntities(sessionStore, params, options);
    },
    useRevokeSession: () => {
      return useMutation({
        mutationFn: async (sessionId: string) => {
          return await ubentoSdk.iam.revokeSession(sessionId);
        },
        onSuccess: (updatedSession) => {
          sessionStore.push(updatedSession);
        },
      });
    },

    // Clients
    useClient: (clientId: string, options?: UseStoreOptions) => {
      return useStoreEntity(clientStore, clientId, options);
    },
    useClients: (options?: UseStoreOptions) => {
      return useStoreEntities(clientStore, {}, options);
    },
    useCreateClient: () => {
      return useMutation({
        mutationFn: async (data: { name: string; description?: string }) => {
          return await ubentoSdk.iam.createClient(data);
        },
        onSuccess: (newClient) => {
          clientStore.push(newClient);
        },
      });
    },
    useDeleteClient: () => {
      return useMutation({
        mutationFn: async (clientId: string) => {
          return await ubentoSdk.iam.deleteClient(clientId);
        },
        onSuccess: (_, clientId) => {
          clientStore.remove(clientId);
        },
      });
    },

    // Client Credentials
    useClientCredentials: (
      params?: { client_id?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(clientCredentialStore, params, options);
    },
    useCreateClientCredential: () => {
      return useMutation({
        mutationFn: async (data: { client_id: string; label?: string }) => {
          return await ubentoSdk.iam.createClientCredential(data);
        },
        onSuccess: (newCred) => {
          clientCredentialStore.push(newCred);
        },
      });
    },
    useDeleteClientCredential: () => {
      return useMutation({
        mutationFn: async (credId: string) => {
          return await ubentoSdk.iam.deleteClientCredential(credId);
        },
        onSuccess: (_, credId) => {
          clientCredentialStore.remove(credId);
        },
      });
    },
  };

  // --- Imperatives ---

  const imperatives = {
    // Users
    getUser: async (userId: string) => {
      const userData = await ubentoSdk.iam.getUser(userId);
      userStore.push(userData);
      return userData;
    },
    getUsers: async (
      params: { email?: string; limit?: number; cursor?: string } = {},
    ) => {
      const response = await ubentoSdk.iam.listUsers(params);
      userStore.pushMany(response.data);
      return response;
    },
    deleteUser: async (userId: string) => {
      const response = await ubentoSdk.iam.deleteUser(userId);
      userStore.remove(userId);
      return response;
    },
    getUserTeams: async (userId: string) => {
      const response = await ubentoSdk.iam.getUserTeams(userId);
      teamStore.pushMany(response.data);
      return response;
    },

    // Teams
    getTeam: async (teamId: string) => {
      const teamData = await ubentoSdk.iam.getTeam(teamId);
      teamStore.push(teamData);
      return teamData;
    },
    getTeams: async (
      params: {
        ids?: string[];
        name?: string;
        handle?: string;
        limit?: number;
        cursor?: string;
      } = {},
    ) => {
      const response = await ubentoSdk.iam.listTeams(params);
      teamStore.pushMany(response.data);
      return response;
    },
    createTeam: async (data: {
      name: string;
      handle: string;
      owner: string;
    }) => {
      const team = await ubentoSdk.iam.createTeam(data);
      teamStore.push(team);
      return team;
    },
    updateTeam: async (
      teamId: string,
      data: { name?: string; handle?: string },
    ) => {
      const team = await ubentoSdk.iam.updateTeam(teamId, data);
      teamStore.push(team);
      return team;
    },
    deleteTeam: async (teamId: string) => {
      const response = await ubentoSdk.iam.deleteTeam(teamId);
      teamStore.remove(teamId);
      return response;
    },
    checkTeamHandle: async (handle: string) => {
      return await ubentoSdk.iam.checkTeamHandle(handle);
    },

    // Team Invites
    getTeamInvite: async (inviteId: string) => {
      const data = await ubentoSdk.iam.getTeamInvite(inviteId);
      teamInviteStore.push(data);
      return data;
    },
    getTeamInvites: async (params: {
      teamId: string;
      limit?: number;
      cursor?: string;
      statuses?: iamClient.InviteStatus[];
      email?: string;
    }) => {
      const response = await ubentoSdk.iam.listTeamInvites(params);
      teamInviteStore.pushMany(response.data);
      return response;
    },
    createTeamInvite: async (params: {
      teamId: string;
      email: string;
      role: string;
      expires_in_seconds?: number;
    }) => {
      const response = await ubentoSdk.iam.createTeamInvite(params);
      teamInviteStore.push(response.invite);
      return response;
    },
    revokeTeamInvite: async (inviteId: string) => {
      const invite = await ubentoSdk.iam.revokeTeamInvite(inviteId);
      teamInviteStore.push(invite);
      return invite;
    },
    resolveTeamInvite: async (token: string) => {
      return await ubentoSdk.iam.resolveTeamInvite(token);
    },
    acceptTeamInvite: async (token: string) => {
      const response = await ubentoSdk.iam.acceptTeamInvite(token);
      teamInviteStore.push(response.invite);
      teamStore.push(response.team);
      return response;
    },

    // Sessions
    getSession: async (sessionId: string) => {
      const data = await ubentoSdk.iam.getSession(sessionId);
      sessionStore.push(data);
      return data;
    },
    getSessions: async (
      params: { limit?: number; cursor?: string; user_id?: string } = {},
    ) => {
      const response = await ubentoSdk.iam.listSessions(params);
      sessionStore.pushMany(response.data);
      return response;
    },
    revokeSession: async (sessionId: string) => {
      const session = await ubentoSdk.iam.revokeSession(sessionId);
      sessionStore.push(session);
      return session;
    },

    // Clients
    getClient: async (clientId: string) => {
      const data = await ubentoSdk.iam.getClient(clientId);
      clientStore.push(data);
      return data;
    },
    getClients: async (params: { limit?: number; cursor?: string } = {}) => {
      const response = await ubentoSdk.iam.listClients(params);
      clientStore.pushMany(response.data);
      return response;
    },
    createClient: async (data: { name: string; description?: string }) => {
      const client = await ubentoSdk.iam.createClient(data);
      clientStore.push(client);
      return client;
    },
    deleteClient: async (clientId: string) => {
      const response = await ubentoSdk.iam.deleteClient(clientId);
      clientStore.remove(clientId);
      return response;
    },

    // Client Credentials
    getClientCredentials: async (
      params: { limit?: number; cursor?: string; client_id?: string } = {},
    ) => {
      const response = await ubentoSdk.iam.listClientCredentials(params);
      clientCredentialStore.pushMany(response.data);
      return response;
    },
    createClientCredential: async (data: {
      client_id: string;
      label?: string;
    }) => {
      const cred = await ubentoSdk.iam.createClientCredential(data);
      clientCredentialStore.push(cred);
      return cred;
    },
    deleteClientCredential: async (credId: string) => {
      const response = await ubentoSdk.iam.deleteClientCredential(credId);
      clientCredentialStore.remove(credId);
      return response;
    },
  };

  return {
    ...hooks,
    ...imperatives,
  };
}
