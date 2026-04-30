import { ModalProvider } from "../contexts/modals";
import { ThemeProvider } from "../contexts/theme";
import { UbentoEngine, UbentoEngineContext } from "../engine/engine";
import { GlobalModals } from "./components/global-modals";
import { Router } from "./router";
import { SessionProvider } from "./session";

export function Ubento({ engine }: { engine: UbentoEngine }) {
  return (
    <UbentoEngineContext value={engine}>
      <SessionProvider>
        <ThemeProvider>
          <ModalProvider>
            <Router />
            <GlobalModals />
          </ModalProvider>
        </ThemeProvider>
      </SessionProvider>
    </UbentoEngineContext>
  );
}
