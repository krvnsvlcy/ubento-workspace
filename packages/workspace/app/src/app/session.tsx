import { BentoSessionContext } from "@/contexts/session";
import { useUbentoEngine } from "../engine/app/engine";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);

  return <BentoSessionContext value={session}>{children}</BentoSessionContext>;
}
