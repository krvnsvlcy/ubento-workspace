import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@ubento/bento.arlo-core";
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
          <Toaster
            position="top-right"
            style={
              {
                "--normal-bg": "var(--color-background)",
                "--normal-text": "var(--color-neutral-content)",
                "--normal-border": "var(--color-neutral-border)",
                "--border-radius": "1em",
              } as any
            }
          />
        </SessionProvider>
      </QueryClientProvider>
    </UbentoEngineContext>
  );
}
