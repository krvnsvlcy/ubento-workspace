import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalRenderer } from "../components/modal/renderer";
import { UbentoEngine, UbentoEngineContext } from "../engine/app/engine";
import { SessionProvider } from "./session";
import { Layout } from "./workspace/layout";

const queryClient = new QueryClient();

export function Ubento({ engine }: { engine: UbentoEngine }) {
  return (
    <UbentoEngineContext value={engine}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Layout />
          <ModalRenderer />
        </SessionProvider>
      </QueryClientProvider>
    </UbentoEngineContext>
  );
}
