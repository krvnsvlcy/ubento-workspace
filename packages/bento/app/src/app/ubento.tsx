import { UbentoEngine, UbentoEngineContext } from "../engine/engine";
import { ThemeProvider } from "../contexts/theme";
import { ModalProvider } from "../contexts/modals";
import { GlobalModals } from "./components/global-modals";
import { Router } from "./router";
import { SessionProvider } from "./session";

export function Ubento({ engine }: { engine: UbentoEngine }) {
  return (
    <UbentoEngineContext.Provider value={engine}>
      <SessionProvider>
        <ThemeProvider>
          <ModalProvider>
            <Router />
            <GlobalModals />
          </ModalProvider>
        </ThemeProvider>
      </SessionProvider>
    </UbentoEngineContext.Provider>
  );
}
