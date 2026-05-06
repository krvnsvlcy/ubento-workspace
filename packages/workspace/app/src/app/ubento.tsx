import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initDevTool } from "@ubento/zustand-devtool";
import { ModalProvider } from "../contexts/modals";
import { ThemeProvider } from "../contexts/theme";
import { UbentoEngine, UbentoEngineContext } from "../engine/engine";
import { GlobalModals } from "./components/global-modals";
import { SessionProvider } from "./session";
import { Layout } from "./workspace/layout";

const queryClient = new QueryClient();
initDevTool({ position: "bottom-left" });

export function Ubento({ engine }: { engine: UbentoEngine }) {
  return (
    <UbentoEngineContext value={engine}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeProvider>
            <ModalProvider>
              <Layout />
              <GlobalModals />
            </ModalProvider>
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </UbentoEngineContext>
  );
}
