import { useEffect, useState } from "react";
import {
  createStore,
  useMutation,
  useStoreEntities,
  useStoreEntity,
  UseStoreOptions,
} from "@ubento/fabric";
import { ubentoEntities } from "@ubento/primitives";
import { moduleClient, UbentoSDK } from "@ubento/sdk";
import { UbentoApiPage, ubentoToFabricPagedResponse } from "../libs/pagination";

export function createUbentoModuleService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  // --- Stores ---

  const moduleStore = createStore<
    moduleClient.Module,
    { team_id?: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.module.name,
    getKey: (mod) => mod.id,
    fetchOne: async (key) => {
      return await ubentoSdk.module.getModule(key);
    },
    fetchMany: async ({ params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.module.listModules({
          team_id: params?.team_id,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((mod) => {
          if (params?.team_id && mod.team_id !== params.team_id) return false;
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
        await ubentoSdk.module.listModuleVersions(params.module_id),
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
    useModuleBySlug: (
      { slug }: { slug: string },
      options?: { enabled?: boolean },
    ) => {
      const [loading, setLoading] = useState(false);
      const [data, setData] = useState<moduleClient.Module | null>(null);

      useEffect(() => {
        if (options?.enabled === false || !slug) return;

        const load = async () => {
          setLoading(true);
          try {
            const mod = await ubentoSdk.module.getModuleBySlug(slug);
            moduleStore.push(mod);
            setData(mod);
          } finally {
            setLoading(false);
          }
        };

        load();
      }, [slug, options?.enabled]);

      return { data, loading };
    },
    useModules: (
      params?: { team_id?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(moduleStore, params, options);
    },
    useCreateModule: () => {
      return useMutation({
        mutationFn: async (data: {
          name: string;
          slug?: string;
          team_id: string;
          source: string;
          scope: "public" | "team";
        }) => {
          return await ubentoSdk.module.createModule(data);
        },
        onSuccess: (mod) => {
          moduleStore.push(mod);
        },
      });
    },
    useUpdateModule: (moduleId: string) => {
      return useMutation({
        mutationFn: async (data: { name?: string; slug?: string }) => {
          return await ubentoSdk.module.updateModule(moduleId, data);
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
      params: { module_id: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(moduleVersionStore, params, options);
    },
    usePublishModuleVersion: (moduleId: string) => {
      return useMutation({
        mutationFn: async () => {
          return await ubentoSdk.module.publishModuleVersion(moduleId);
        },
        onSuccess: (v) => {
          moduleVersionStore.push(v);
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
    useModuleVersionSource: (moduleId: string, versionId: string) => {
      const [loading, setLoading] = useState(false);
      const [data, setData] = useState<string | null>(null);

      useEffect(() => {
        if (!moduleId || !versionId) return;

        const load = async () => {
          setLoading(true);
          try {
            const source = await ubentoSdk.module.getModuleVersionSource(
              moduleId,
              versionId,
            );
            setData(source);
          } finally {
            setLoading(false);
          }
        };

        load();
      }, [moduleId, versionId]);

      return { data, loading };
    },
  };

  // --- Imperatives ---

  const imperatives = {
    getModule: async (moduleId: string) => {
      const mod = await ubentoSdk.module.getModule(moduleId);
      moduleStore.push(mod);
      return mod;
    },
    getModuleBySlug: async (slug: string) => {
      const mod = await ubentoSdk.module.getModuleBySlug(slug);
      moduleStore.push(mod);
      return mod;
    },
    getModules: async (params: { team_id?: string } = {}) => {
      const res = await ubentoSdk.module.listModules(params);
      moduleStore.pushMany(res.data);
      return res;
    },
    deleteModule: async (moduleId: string) => {
      const res = await ubentoSdk.module.deleteModule(moduleId);
      moduleStore.remove(moduleId);
      return res;
    },
    listModuleVersions: async (moduleId: string) => {
      const res = await ubentoSdk.module.listModuleVersions(moduleId);
      moduleVersionStore.pushMany(res.data);
      return res;
    },
    createModule: async (data: {
      name: string;
      slug?: string;
      team_id: string;
      source: string;
      scope: "public" | "team";
    }) => {
      const mod = await ubentoSdk.module.createModule(data);
      moduleStore.push(mod);
      return mod;
    },
    getModuleVersionArtifact: async (moduleId: string, versionId: string) => {
      return await ubentoSdk.module.getModuleVersionArtifact(
        moduleId,
        versionId,
      );
    },
    getModuleVersionSource: async (moduleId: string, versionId: string) => {
      return await ubentoSdk.module.getModuleVersionSource(
        moduleId,
        versionId,
      );
    },
    publishModuleVersion: async (moduleId: string) => {
      const v = await ubentoSdk.module.publishModuleVersion(moduleId);
      moduleVersionStore.push(v);
      return v;
    },
  };

  return {
    ...hooks,
    ...imperatives,
  };
}

