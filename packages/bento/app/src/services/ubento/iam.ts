import { createStore, useStoreEntity, UseStoreOptions } from "@ubento/fabric";
import { ubentoEntities } from "@ubento/primitives";
import { iamClient, UbentoSDK } from "@ubento/sdk";

export function createUbentoIamService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  const userStore = createStore<iamClient.User>({
    namespace: ubentoEntities.user.name,
    getKey: (user) => user.id,
    fetchOne: async (key) => {
      return await ubentoSdk.iam.getUser(key);
    },
    fetchMany: async ({ page }) => {
      return await ubentoSdk.iam.listUsers({ page });
    },
  });
  const teamStore = createStore<iamClient.Team>({
    namespace: ubentoEntities.team.name,
    getKey: (team) => team.id,
    fetchOne: async (key) => {
      return await ubentoSdk.iam.getTeam(key);
    },
    fetchMany: async ({ page }) => {
      return await ubentoSdk.iam.listTeams({ page });
    },
  });

  const hooks = {
    useUser: (userId: string, options?: UseStoreOptions) => {
      return useStoreEntity(userStore, userId, options);
    },
    useTeam: (teamId: string, options?: UseStoreOptions) => {
      return useStoreEntity(teamStore, teamId, options);
    },
    useUpdateTeam: (teamId: string, options?: UseStoreOptions) => {},
  };
  const imperatives = {
    getUser: async (userId: string) => {
      const userData = await ubentoSdk.iam.getUser(userId);
      userStore.push(userData);
      return userData;
    },
    getTeams: async () => {
      const teamData = await ubentoSdk.iam.listTeams({});
      teamStore.pushMany(teamData.data);
      return teamData;
    },
    getTeam: async (teamId: string) => {
      const teamData = await ubentoSdk.iam.getTeam(teamId);
      teamStore.push(teamData);
      return teamData;
    },
    updateTeam: async ({
      teamId,
      update,
    }: {
      teamId: string;
      update: { name?: string; handle?: string };
    }) => {
      const teamData = await ubentoSdk.iam.updateTeam(teamId, update);
      teamStore.push(teamData);
      return teamData;
    },
  };

  return {
    ...hooks,
    ...imperatives,
  };
}
