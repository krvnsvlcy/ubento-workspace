import { Octokit } from "octokit";
import {
  createStore,
  FetchOptions,
  useStoreEntities,
  useStoreEntity,
} from "@ubento/fabric";

export function createGithubService({ token }: { token: string }) {
  const octokit = new Octokit({ auth: token });

  const reposStore = createStore<any, { q?: string }>({
    namespace: "repository",
    getKey: (repo) => repo.id,
    fetchOne: async (id) => {
      // id is usually "owner/repo" or numeric ID. GitHub API supports both but usually owners/repo for detail.
      // For simplicity in this pattern, we assume id is what's needed.
      const [owner, repo] = id.split("/");
      const response = await octokit.rest.repos.get({ owner, repo });
      return response.data;
    },
    fetchMany: async ({ params }) => {
      const response = await octokit.rest.repos.listForAuthenticatedUser(params);
      return {
        data: response.data,
      };
    },
  });

  const issuesStore = createStore<any, any>({
    namespace: "issue",
    getKey: (issue) => issue.id,
    fetchOne: async (id) => {
       // Placeholder: details would need owner/repo/number
       return { id };
    },
    fetchMany: async ({ params }) => {
      const response = await octokit.rest.issues.listForAuthenticatedUser(params);
      return {
        data: response.data,
      };
    },
  });

  const pullsStore = createStore<any, any>({
    namespace: "pull_request",
    getKey: (pr) => pr.id,
    fetchOne: async (id) => {
       return { id };
    },
    fetchMany: async ({ params }) => {
      const response = await octokit.rest.pulls.listForAuthenticatedUser(params);
      return {
        data: response.data,
      };
    },
  });

  return {
    useRepository: (id: string, options?: FetchOptions) => {
      return useStoreEntity(reposStore, id, options);
    },
    useRepositories: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(reposStore, params, options);
    },
    useIssue: (id: string, options?: FetchOptions) => {
      return useStoreEntity(issuesStore, id, options);
    },
    useIssues: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(issuesStore, params, options);
    },
    usePullRequest: (id: string, options?: FetchOptions) => {
      return useStoreEntity(pullsStore, id, options);
    },
    usePullRequests: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(pullsStore, params, options);
    },
  };
}

export default createGithubService;
