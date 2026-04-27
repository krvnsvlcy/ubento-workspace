import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { useUbento } from "./ubento";

export function useModule(moduleId: string) {
  const ubento = useUbento();
  return useQuery({
    queryKey: queryKeys.module({ moduleId }),
    queryFn: async () => {
      return await ubento.module.getModule(moduleId);
    },
    enabled: !!moduleId,
  });
}

export function useModules(filters: { team_id?: string } = {}) {
  const ubento = useUbento();
  return useQuery({
    queryKey: queryKeys.modules(filters),
    queryFn: async () => {
      return await ubento.module.listModules(filters);
    },
  });
}
