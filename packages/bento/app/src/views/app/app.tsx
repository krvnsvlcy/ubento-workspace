import { useAppBySlug } from "@/hooks/app";
import { appDataSchema } from "@ubento/engine";
import { useEffect, useMemo } from "react";
import { AppContent } from "./content";
import { createAppController } from "./controller";
import { AppInteractor } from "./interactor/interactor";
import { useKeyboardShortcuts } from "./keyboard";

export function App({ slug }: { slug: string }) {
  const { data: appData, isLoading, isError } = useAppBySlug({ slug });

  const appController = useMemo(() => {
    return createAppController({
      initialState: {
        loading: false,
        error: false,
        mode: "edit",
      },
    });
  }, [slug]);

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
