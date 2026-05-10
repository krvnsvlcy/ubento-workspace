import axios from "axios";
import {
  createStore,
  FetchOptions,
  useStoreEntities,
  useStoreEntity,
} from "@ubento/fabric";

export function createFigmaService({ accessToken }: { accessToken: string }) {
  const client = axios.create({
    baseURL: "https://api.figma.com/v1",
    headers: {
      "X-Figma-Token": accessToken,
    },
  });

  const filesStore = createStore<any, any>({
    namespace: "file",
    getKey: (file) => file.key,
    fetchOne: async (key) => {
      const response = await client.get(`/files/${key}`);
      return response.data;
    },
    fetchMany: async ({ params }) => {
      // Figma doesn't have a simple "list all files" API without a project/team
      return { data: [] };
    },
  });

  return {
    useFile: (key: string, options?: FetchOptions) => {
      return useStoreEntity(filesStore, key, options);
    },
    useFiles: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(filesStore, params, options);
    },
  };
}

export default createFigmaService;
