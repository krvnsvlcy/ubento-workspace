import { useBentoHost } from "@/contexts/host";
import { getPage, useAppBySlug } from "@/hooks/app";
import { queryKeys } from "@/hooks/keys";
import { useUbento } from "@/hooks/ubento";
import { useQueryClient } from "@tanstack/react-query";
import { appDataSchema, pageDataSchema } from "@ubento/engine";
import { useEffect, useMemo } from "react";
import { AppContent } from "./content";
import { createAppController } from "./controller";
import { AppInteractor } from "./interactor/interactor";
import { useKeyboardShortcuts } from "./keyboard";

export function App({ slug }: { slug: string }) {
  const host = useBentoHost();
  const queryClient = useQueryClient();
  const { data: appData, isLoading, isError } = useAppBySlug({ slug });
  const ubento = useUbento();

  const appController = useMemo(() => {
    return createAppController({
      initialState: {
        loading: false,
        error: false,
        mode: "edit",
      },
      handlers: {
        getPage: async (pageId) => {
          const data = await getPage({ ubento, queryClient, pageId });
          if (!data) throw new Error("Page not found");
          const pageData = pageDataSchema.parse(data.data || {});
          return pageData;
        },
        getModule: async (moduleId) => {
          const res = await queryClient.fetchQuery({
            queryKey: queryKeys.module({ moduleId }),
            queryFn: async () => {
              return await ubento.module.getModule(moduleId);
            },
          });
          return {
            latestVersionId: res.latest_version_id,
          };
        },
      },
      moduleUrlTemplate: host.moduleUrlTemplate,
    });
  }, [slug, ubento, host.moduleUrlTemplate]);

  useEffect(() => {
    return () => appController.dispose();
  }, [appController]);

  useKeyboardShortcuts({ state: appController.state });

  useEffect(() => {
    appController.state.loading = isLoading;
    appController.state.error = isError;
    if (appData) {
      try {
        const data = appDataSchema.parse(appData.data || {});
        appController.load(data);
      } catch (err) {
        appController.load({});
      }
    }
  }, [appData, isLoading, isError]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <AppInteractor app={appData} state={appController.state} />
      <AppContent app={appData} controller={appController} />
    </div>
  );
}
