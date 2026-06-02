import { QueryClient } from "@tanstack/react-query";
import {
  createStore,
  useMutation,
  useQuery,
  useStoreEntities,
  useStoreEntity,
  UseStoreOptions,
} from "@ubento/fabric";
import { ubentoEntities } from "@ubento/services.primitives";
import { moduleClient, UbentoSDK } from "@ubento/services.sdk";
import { useEffect, useState } from "react";
import { UbentoApiPage, ubentoToFabricPagedResponse } from "../libs/pagination";

export function createUbentoModuleService({
  ubentoSdk,
  queryClient,
}: {
  ubentoSdk: UbentoSDK;
  queryClient: QueryClient;
}) {
  // --- Stores ---

  const moduleStore = createStore<
    moduleClient.Module,
    { team_id?: string; type?: string; scope?: "public" | "private" },
    UbentoApiPage
  >({
    namespace: ubentoEntities.module.name,
    getKey: (mod) => mod.id,
    fetchOne: async (key) => {
      return await ubentoSdk.module.getModule(key);
    },
    fetchMany: async ({ params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.module.listModules(params),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((mod) => {
          if (params?.team_id && mod.team_id !== params.team_id) return false;
          if (params?.type && mod.type !== params.type) return false;
          if (params?.scope && mod.scope !== params.scope) return false;
          return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  });

  const moduleCollectionStore = createStore<
    moduleClient.ModuleCollection,
    { team_id?: string; scope?: "public" | "private" },
    UbentoApiPage
  >({
    namespace: ubentoEntities.moduleCollection.name,
    getKey: (c) => c.id,
    fetchOne: async (key) => {
      return await ubentoSdk.module.getModuleCollection(key);
    },
    fetchMany: async ({ params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.module.listModuleCollections(params as any),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((c) => {
          if (params?.team_id && c.team_id !== params.team_id) return false;
          if (params?.scope && c.scope !== params.scope) return false;
          return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  });

  const moduleVersionStore = createStore<
    moduleClient.ModuleVersion,
    { module_id: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.moduleVersion.name,
    getKey: (v) => v.id,
    fetchOne: async () => {
      throw new Error(
        "Single module version fetch requires moduleId and versionId",
      );
    },
    fetchMany: async ({ params }) => {
      if (!params?.module_id) {
        throw new Error("module_id is required to list module versions");
      }
      return ubentoToFabricPagedResponse(
        await ubentoSdk.module.listModuleVersions(
          params.module_id,
          params as any,
        ),
      );
    },
    project: (entities, params) => {
      return [...entities].filter((v) => {
        if (params?.module_id && v.module_id !== params.module_id) return false;
        return true;
      });
    },
  });

  // --- Hooks ---

  const hooks = {
    // Modules
    useModule: (moduleId: string, options?: UseStoreOptions) => {
      return useStoreEntity(moduleStore, moduleId, options);
    },
    useModules: (
      params?: {
        team_id?: string;
        type?: string;
        scope?: "public" | "private";
        limit?: number;
        cursor?: string;
      },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(moduleStore, params, options);
    },
    useSearchModules: (
      params: {
        query?: string;
        types?: string[];
        scope?: "public" | "private";
        page?: number;
        limit?: number;
      },
      options?: UseStoreOptions,
    ) => {
      return useQuery({
        queryKey: ["moduleSearch", params],
        queryFn: async () => {
          return await ubentoSdk.module.searchModules(params);
        },
        ...options,
      });
    },
    useCreateModule: () => {
      return useMutation({
        mutationFn: async (data: {
          name: string;
          team_id: string;
          source: string;
          scope: "public" | "private";
          type: string;
          summary?: string;
        }) => {
          return await ubentoSdk.module.createModule(data);
        },
        onSuccess: (mod) => {
          moduleStore.push(mod);
        },
      });
    },
    useDeleteModule: () => {
      return useMutation({
        mutationFn: async (moduleId: string) => {
          return await ubentoSdk.module.deleteModule(moduleId);
        },
        onSuccess: (_, moduleId) => {
          moduleStore.remove(moduleId);
        },
      });
    },

    // Versions
    useModuleVersions: (
      params: { module_id: string; limit?: number; cursor?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(moduleVersionStore, params, options);
    },
    useSaveModuleVersion: (moduleId: string) => {
      return useMutation({
        mutationFn: async (content: string) => {
          return await ubentoSdk.module.saveModuleVersion(moduleId, content);
        },
        onSuccess: (mod) => {
          moduleStore.push(mod);
        },
      });
    },
    usePublishModule: (moduleId: string) => {
      return useMutation({
        mutationFn: async () => {
          return await ubentoSdk.module.publishModule(moduleId);
        },
        onSuccess: (mod) => {
          moduleStore.push(mod);
        },
      });
    },
    useModuleVersion: (moduleId: string, versionId: string) => {
      const [loading, setLoading] = useState(false);
      const [data, setData] = useState<moduleClient.ModuleVersion | null>(null);

      useEffect(() => {
        if (!moduleId || !versionId) return;

        const load = async () => {
          setLoading(true);
          try {
            const v = await ubentoSdk.module.getModuleVersion(
              moduleId,
              versionId,
            );
            moduleVersionStore.push(v);
            setData(v);
          } finally {
            setLoading(false);
          }
        };

        load();
      }, [moduleId, versionId]);

      return { data, loading };
    },
    useModuleVersionFileContent: ({
      moduleId,
      versionId,
      filename,
      options,
    }: {
      moduleId: string;
      versionId: string;
      filename: string;
      options?: UseStoreOptions;
    }) => {
      return useQuery({
        queryKey: ["moduleVersionFile", moduleId, versionId, filename],
        queryFn: async () => {
          return await ubentoSdk.module.readModuleVersionFile(
            moduleId,
            versionId,
            filename,
          );
        },
        enabled: !!moduleId && !!versionId && !!filename,
        ...options,
      });
    },
    // Collections
    useModuleCollection: (collectionId: string, options?: UseStoreOptions) => {
      return useStoreEntity(moduleCollectionStore, collectionId, options);
    },
    useModuleCollections: (
      params?: {
        team_id?: string;
        scope?: "public" | "private";
        limit?: number;
        cursor?: string;
      },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(moduleCollectionStore, params, options);
    },
    useCreateModuleCollection: () => {
      return useMutation({
        mutationFn: async (data: {
          team_id: string;
          name: string;
          summary?: string;
          scope?: "public" | "private";
          module_ids?: string[];
        }) => {
          return await ubentoSdk.module.createModuleCollection(data);
        },
        onSuccess: (collection) => {
          moduleCollectionStore.push(collection);
        },
      });
    },
    useUpdateModuleCollection: () => {
      return useMutation({
        mutationFn: async ({
          collectionId,
          data,
        }: {
          collectionId: string;
          data: {
            name?: string;
            summary?: string | null;
            scope?: "public" | "private";
            module_ids?: string[];
          };
        }) => {
          return await ubentoSdk.module.updateModuleCollection(
            collectionId,
            data,
          );
        },
        onSuccess: (collection) => {
          moduleCollectionStore.push(collection);
        },
      });
    },
    useDeleteModuleCollection: () => {
      return useMutation({
        mutationFn: async (collectionId: string) => {
          return await ubentoSdk.module.deleteModuleCollection(collectionId);
        },
        onSuccess: (_, collectionId) => {
          moduleCollectionStore.remove(collectionId);
        },
      });
    },
    useUploadCollectionCoverImage: () => {
      return useMutation({
        mutationFn: async ({
          collectionId,
          file,
        }: {
          collectionId: string;
          file: File | Blob;
        }) => {
          return await ubentoSdk.module.uploadCollectionCoverImage(
            collectionId,
            file,
          );
        },
        onSuccess: (collection) => {
          moduleCollectionStore.push(collection);
        },
      });
    },
  };

  // --- Imperatives ---

  const imperatives = {
    getModule: async (moduleId: string) => {
      return await ubentoSdk.module.getModule(moduleId);
    },
    searchModules: async (params: {
      query?: string;
      types?: string[];
      scope?: "public" | "private";
      page?: number;
      limit?: number;
    }) => {
      return await ubentoSdk.module.searchModules(params);
    },
    getModules: async (
      params: {
        team_id?: string;
        type?: string;
        scope?: "public" | "private";
        limit?: number;
        cursor?: string;
      } = {},
    ) => {
      const res = await ubentoSdk.module.listModules(params);
      moduleStore.pushMany(res.data);
      return res;
    },
    deleteModule: async (moduleId: string) => {
      const res = await ubentoSdk.module.deleteModule(moduleId);
      moduleStore.remove(moduleId);
      return res;
    },
    getModuleVersion: async (moduleId: string, versionId: string) => {
      const res = await ubentoSdk.module.getModuleVersion(moduleId, versionId);
      moduleVersionStore.push(res);
      return res;
    },
    listModuleVersions: async (
      moduleId: string,
      query: { limit?: number; cursor?: string } = {},
    ) => {
      const res = await ubentoSdk.module.listModuleVersions(moduleId, query);
      moduleVersionStore.pushMany(res.data);
      return res;
    },
    createModule: async (data: {
      name: string;
      team_id: string;
      source: string;
      scope: "public" | "private";
      type: string;
      summary?: string;
    }) => {
      const mod = await ubentoSdk.module.createModule(data);
      moduleStore.push(mod);
      return mod;
    },
    updateModuleVersion: async (moduleId: string, content: string) => {
      const mod = await ubentoSdk.module.saveModuleVersion(moduleId, content);
      moduleStore.push(mod);
      return mod;
    },
    publishModule: async (moduleId: string) => {
      const mod = await ubentoSdk.module.publishModule(moduleId);
      moduleStore.push(mod);
      return mod;
    },
    readModuleVersionFile: async (
      moduleId: string,
      versionId: string,
      filename: string,
    ) => {
      return queryClient.fetchQuery({
        queryKey: ["moduleVersionFile", moduleId, versionId, filename],
        queryFn: async () => {
          return await ubentoSdk.module.readModuleVersionFile(
            moduleId,
            versionId,
            filename,
          );
        },
      });
    },
    // Collections
    getModuleCollection: async (collectionId: string) => {
      const collection =
        await ubentoSdk.module.getModuleCollection(collectionId);
      moduleCollectionStore.push(collection);
      return collection;
    },
    getModuleCollections: async (
      params: {
        team_id?: string;
        scope?: "public" | "private";
        limit?: number;
        cursor?: string;
      } = {},
    ) => {
      const res = await ubentoSdk.module.listModuleCollections(params);
      moduleCollectionStore.pushMany(res.data);
      return res;
    },
    createModuleCollection: async (data: {
      team_id: string;
      name: string;
      summary?: string;
      scope?: "public" | "private";
      module_ids?: string[];
    }) => {
      const collection = await ubentoSdk.module.createModuleCollection(data);
      moduleCollectionStore.push(collection);
      return collection;
    },
    updateModuleCollection: async (
      collectionId: string,
      data: {
        name?: string;
        summary?: string | null;
        scope?: "public" | "private";
        module_ids?: string[];
      },
    ) => {
      const collection = await ubentoSdk.module.updateModuleCollection(
        collectionId,
        data,
      );
      moduleCollectionStore.push(collection);
      return collection;
    },
    deleteModuleCollection: async (collectionId: string) => {
      const res = await ubentoSdk.module.deleteModuleCollection(collectionId);
      moduleCollectionStore.remove(collectionId);
      return res;
    },
    uploadCollectionCoverImage: async (
      collectionId: string,
      file: File | Blob,
    ) => {
      const collection = await ubentoSdk.module.uploadCollectionCoverImage(
        collectionId,
        file,
      );
      moduleCollectionStore.push(collection);
      return collection;
    },
  };

  return {
    ...hooks,
    ...imperatives,
  };
}
