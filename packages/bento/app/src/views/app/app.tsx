import { useAppBySlug } from "@/hooks/app";
import { useEffect, useMemo, useRef } from "react";
import { AppContent } from "./content";
import { createAppController } from "./controller";
import { AppInteractor } from "./interactor/interactor";
import { createAppInteractorState } from "./interactor/state";

export function App({ slug }: { slug: string }) {
  const { data: appData } = useAppBySlug({ slug });

  const interactorState = useMemo(() => {
    return createAppInteractorState({
      mode: "edit",
      selection: [],
    });
  }, [slug]);

  const lastShiftPress = useRef<number>(0);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        const now = Date.now();
        if (now - lastShiftPress.current < 300) {
          interactorState.mode = interactorState.mode === "edit" ? "live" : "edit";
          lastShiftPress.current = 0;
        } else {
          lastShiftPress.current = now;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [interactorState]);

  const appController = useMemo(() => {
    return createAppController({
      initialState: {
        loading: true,
        error: false,
      },
    });
  }, [slug]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <AppInteractor app={appData} state={interactorState} />
      <AppContent app={appData} controller={appController} />
    </div>
  );
}
