import { ModalProvider } from "../contexts/modals";
import { ThemeProvider } from "../contexts/theme";
import { UbentoEngine, UbentoEngineContext } from "../engine/engine";
import { GlobalModals } from "./components/global-modals";
import { SessionProvider } from "./session";
import { Layout } from "./workspace/layout";

export function Ubento({ engine }: { engine: UbentoEngine }) {
  return (
    <UbentoEngineContext value={engine}>
      <SessionProvider>
        <ThemeProvider>
          <ModalProvider>
            <Layout />
            <GlobalModals />
          </ModalProvider>
        </ThemeProvider>
      </SessionProvider>
    </UbentoEngineContext>
  );
}
