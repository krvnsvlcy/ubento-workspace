import { UbentoEngine, UbentoEngineContext } from "../engine/engine";
import { Router } from "./router";
import { SessionProvider } from "./session";

export function Ubento({ engine }: { engine: UbentoEngine }) {
  return (
    <UbentoEngineContext.Provider value={engine}>
      <SessionProvider>
        <Router />
      </SessionProvider>
    </UbentoEngineContext.Provider>
  );
}
