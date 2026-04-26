import { useBentoHost } from "@/contexts/host";
import { getPage, useAppBySlug } from "@/hooks/app";
import { queryKeys } from "@/hooks/keys";
import { useUbento } from "@/hooks/ubento";
import { useQueryClient } from "@tanstack/react-query";
import { appDataSchema, PageData, pageDataSchema } from "@ubento/engine";
import { useEffect, useMemo } from "react";
import { AppContent } from "./content";
import { createAppController } from "./controller";
import { AppInteractor } from "./interactor/interactor";
import { useKeyboardShortcuts } from "./keyboard";

export function App({ slug, pageId }: { slug: string; pageId?: string }) {
  const host = useBentoHost();
  const queryClient = useQueryClient();
  const { data: appData, isLoading, isError } = useAppBySlug({ slug });
  const ubento = useUbento();

  const appController = useMemo(() => {
    const controller = createAppController({
      initialState: {
        loading: false,
        error: false,
        mode: "edit",
      },
      handlers: {
        getPage: async (pageId) => {
          const res = await getPage({ ubento, queryClient, pageId });
          if (!res) throw new Error("Page not found");
          const pageData = pageDataSchema.parse({
            id: res.id,
            name: res.name,
            ...(res.data as any),
          });
          return pageData;
        },
        listPages: async () => {
          const pages = await queryClient.fetchQuery({
            queryKey: ["pages", { app_id: controller.app?.id }],
            queryFn: () => ubento.app.listPages({ app_id: controller.app!.id }),
          });
          return pages.map((p) =>
            pageDataSchema.parse({
              id: p.id,
              name: p.name,
              ...(p.data as any),
            }),
          );
        },
        createPage: async (name) => {
          const data: Omit<PageData, "id" | "name"> = {
            rootId: "root",
            elements: {
              root: {
                type: "container",
                content: [],
                style: {
                  width: 100,
                  height: 100,
                  background: "#3939dcff",
                  cornerRadius: 20,
                },
              },
            },
          };
          const res = await ubento.app.createPage({
            app_id: controller.app!.id,
            name: name || "New Page",
            data,
          });
          queryClient.invalidateQueries({
            queryKey: ["pages", { app_id: controller.app!.id }],
          });
          const pageData = pageDataSchema.parse({
            id: res.id,
            name: res.name,
            ...(res.data as any),
          });
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
        onGoTo: (pageId, params) => {
          host.goToLocation({
            view: "app",
            params: { slug, pageId, ...params },
          });
        },
      },
      moduleUrlTemplate: host.moduleUrlTemplate,
    });

    return controller;
  }, [slug, ubento, host.moduleUrlTemplate]);

  useEffect(() => {
    return () => appController.dispose();
  }, [appController]);

  useKeyboardShortcuts({ state: appController.state });

  useEffect(() => {
    if (pageId) {
      appController.goTo(pageId);
    }
  }, [pageId, appController]);

  useEffect(() => {
    appController.state.loading = isLoading;
    appController.state.error = isError;
    if (appData) {
      try {
        const data = appDataSchema.parse({
          id: appData.id,
          ...(appData.data || {}),
        });
        appController.load(data);
      } catch (err) {
        appController.load({ id: appData.id });
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
