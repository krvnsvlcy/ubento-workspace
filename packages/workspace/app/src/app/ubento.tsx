import { ContextMenuRenderer } from "@/components/context-menu/renderer";
import { ModalRenderer } from "@/components/modal/renderer";
import { UbentoEngineContext } from "@/contexts/app_engine";
import { UbentoEngine } from "@/engine/app/engine";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
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
          <ContextMenuRenderer />
          <Toaster
            position="top-right"
            style={
              {
                "--normal-bg": "var(--color-background)",
                "--normal-text": "var(--color-content)",
                "--normal-border": "var(--color-border)",
                "--border-radius": "1em",
              } as any
            }
          />
        </SessionProvider>
      </QueryClientProvider>
    </UbentoEngineContext>
  );
}
