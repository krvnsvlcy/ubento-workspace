import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UbentoSDK } from "@ubento/sdk";
import { queryKeys } from "./libs/keys";

export function createUbentoModuleService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  return {
    useModule: (moduleId: string) => {
      return useQuery({
        queryKey: queryKeys.module({ moduleId }),
        queryFn: async () => {
          return await ubentoSdk.module.getModule(moduleId);
        },
        enabled: !!moduleId,
      });
    },

    useModules: (filters: { team_id?: string } = {}) => {
      return useQuery({
        queryKey: queryKeys.modules(filters),
        queryFn: async () => {
          return await ubentoSdk.module.listModules(filters);
        },
      });
    },

    useCreateModule: () => {
      const queryClient = useQueryClient();
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
        onSuccess: (_, { team_id }) => {
          queryClient.invalidateQueries({
            queryKey: queryKeys.modules({ team_id }),
          });
        },
      });
    },

    useUpdateModule: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async ({
          moduleId,
          data,
        }: {
          moduleId: string;
          data: { name?: string; slug?: string };
        }) => {
          return await ubentoSdk.module.updateModule(moduleId, data);
        },
        onSuccess: (_, { moduleId }) => {
          queryClient.invalidateQueries({ queryKey: queryKeys.modules() });
          queryClient.invalidateQueries({
            queryKey: queryKeys.module({ moduleId }),
          });
        },
      });
    },

    useDeleteModule: () => {
      const queryClient = useQueryClient();

      return useMutation({
        mutationFn: async (moduleId: string) => {
          return await ubentoSdk.module.deleteModule(moduleId);
        },
        onMutate: async (deletedModuleId: string) => {
          await queryClient.cancelQueries({ queryKey: queryKeys.modules() });
          const previousModules = queryClient.getQueryData(queryKeys.modules());
          queryClient.setQueryData(queryKeys.modules(), (old: any) => {
            if (!old) return old;
            return old.filter((mod: any) => mod.id !== deletedModuleId);
          });

          return { previousModules };
        },
        onError: (err, deletedModuleId, context) => {
          if (context?.previousModules) {
            queryClient.setQueryData(
              queryKeys.modules(),
              context.previousModules,
            );
          }
        },
        onSettled: (data, error, deletedModuleId) => {
          queryClient.invalidateQueries({ queryKey: queryKeys.modules() });
          queryClient.invalidateQueries({
            queryKey: queryKeys.module({ moduleId: deletedModuleId }),
          });
        },
      });
    },
  };
}
