import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initDevTool } from "@ubento/zustand-devtool";
import { ThemeProvider } from "../contexts/theme";
import { UbentoEngine, UbentoEngineContext } from "../engine/app/engine";
import { ModalRenderer } from "./components/modal-renderer";
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
            <Layout />
            <ModalRenderer />
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </UbentoEngineContext>
  );
}
