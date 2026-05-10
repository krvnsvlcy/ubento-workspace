import { LinearClient } from "@linear/sdk";
import {
  createStore,
  FetchOptions,
  useStoreEntities,
  useStoreEntity,
} from "@ubento/fabric";

export function createLinearService({ apiKey }: { apiKey: string }) {
  const linear = new LinearClient({ apiKey });

  const issuesStore = createStore<any, any>({
    namespace: "issue",
    getKey: (issue) => issue.id,
    fetchOne: async (id) => {
      return await linear.issue(id);
    },
    fetchMany: async ({ params }) => {
      const response = await linear.issues(params);
      return {
        data: response.nodes,
      };
    },
  });

  const projectsStore = createStore<any, any>({
    namespace: "project",
    getKey: (project) => project.id,
    fetchOne: async (id) => {
      return await linear.project(id);
    },
    fetchMany: async ({ params }) => {
      const response = await linear.projects(params);
      return {
        data: response.nodes,
      };
    },
  });

  const teamsStore = createStore<any, any>({
    namespace: "team",
    getKey: (team) => team.id,
    fetchOne: async (id) => {
      return await linear.team(id);
    },
    fetchMany: async ({ params }) => {
      const response = await linear.teams(params);
      return {
        data: response.nodes,
      };
    },
  });

  return {
    useIssue: (id: string, options?: FetchOptions) => {
      return useStoreEntity(issuesStore, id, options);
    },
    useIssues: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(issuesStore, params, options);
    },
    useProject: (id: string, options?: FetchOptions) => {
      return useStoreEntity(projectsStore, id, options);
    },
    useProjects: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(projectsStore, params, options);
    },
    useTeam: (id: string, options?: FetchOptions) => {
      return useStoreEntity(teamsStore, id, options);
    },
    useTeams: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(teamsStore, params, options);
    },
  };
}

export default createLinearService;
