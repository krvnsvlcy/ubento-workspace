import {
  createStore,
  useMutation,
  useQuery,
  useStoreEntities,
  useStoreEntity,
  UseStoreOptions,
} from "@ubento/fabric";
import { ubentoEntities } from "@ubento/primitives";
import { moduleClient, UbentoSDK } from "@ubento/sdk";
import { useEffect, useState } from "react";
import { UbentoApiPage, ubentoToFabricPagedResponse } from "../libs/pagination";

export function createUbentoModuleService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
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
    useReadModuleVersionFile: (
      moduleId: string,
      versionId: string,
      filename: string,
      options?: UseStoreOptions,
    ) => {
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
    saveModuleVersion: async (moduleId: string, content: string) => {
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
      return await ubentoSdk.module.readModuleVersionFile(
        moduleId,
        versionId,
        filename,
      );
    },
  };

  return {
    ...hooks,
    ...imperatives,
  };
}
