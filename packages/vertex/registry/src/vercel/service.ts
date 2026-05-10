import axios from "axios";
import {
  createStore,
  FetchOptions,
  useStoreEntities,
  useStoreEntity,
} from "@ubento/fabric";

export function createVercelService({ token }: { token: string }) {
  const client = axios.create({
    baseURL: "https://api.vercel.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const deploymentsStore = createStore<any, any>({
    namespace: "deployment",
    getKey: (deployment) => deployment.uid,
    fetchOne: async (id) => {
      const response = await client.get(`/v13/deployments/${id}`);
      return response.data;
    },
    fetchMany: async ({ params }) => {
      const response = await client.get("/v6/deployments", { params });
      return {
        data: response.data.deployments,
      };
    },
  });

  const projectsStore = createStore<any, any>({
    namespace: "project",
    getKey: (project) => project.id,
    fetchOne: async (id) => {
      const response = await client.get(`/v9/projects/${id}`);
      return response.data;
    },
    fetchMany: async ({ params }) => {
      const response = await client.get("/v9/projects", { params });
      return {
        data: response.data.projects,
      };
    },
  });

  return {
    useDeployment: (id: string, options?: FetchOptions) => {
      return useStoreEntity(deploymentsStore, id, options);
    },
    useDeployments: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(deploymentsStore, params, options);
    },
    useProject: (id: string, options?: FetchOptions) => {
      return useStoreEntity(projectsStore, id, options);
    },
    useProjects: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(projectsStore, params, options);
    },
  };
}

export default createVercelService;
