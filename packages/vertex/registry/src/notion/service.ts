import { Client } from "@notionhq/client";
import {
  createStore,
  FetchOptions,
  useStoreEntities,
  useStoreEntity,
} from "@ubento/fabric";

export function createNotionService({ apiKey }: { apiKey: string }) {
  const notion = new Client({ auth: apiKey });

  const pagesStore = createStore<any, any>({
    namespace: "page",
    getKey: (page) => page.id,
    fetchOne: async (id) => {
      return await notion.pages.retrieve({ page_id: id });
    },
    fetchMany: async ({ params }) => {
      const response = await notion.search({
        filter: { property: "object", value: "page" },
        ...params,
      });
      return {
        data: response.results,
      };
    },
  });

  const databasesStore = createStore<any, any>({
    namespace: "database",
    getKey: (db) => db.id,
    fetchOne: async (id) => {
      return await notion.databases.retrieve({ database_id: id });
    },
    fetchMany: async ({ params }) => {
      const response = await notion.search({
        filter: { property: "object", value: "database" },
        ...params,
      });
      return {
        data: response.results,
      };
    },
  });

  return {
    usePage: (id: string, options?: FetchOptions) => {
      return useStoreEntity(pagesStore, id, options);
    },
    usePages: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(pagesStore, params, options);
    },
    useDatabase: (id: string, options?: FetchOptions) => {
      return useStoreEntity(databasesStore, id, options);
    },
    useDatabases: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(databasesStore, params, options);
    },
  };
}

export default createNotionService;
