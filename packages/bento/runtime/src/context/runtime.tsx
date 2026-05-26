import { createContext, ReactNode, useContext } from "react";
import { BentoRuntime } from "../runtime/runtime";

const BentoRuntimeContext = createContext<BentoRuntime | null>(null);

export function BentoRuntimeProvider({
  runtime,
  children,
}: {
  runtime: BentoRuntime;
  children: ReactNode;
}) {
  return <BentoRuntimeContext value={runtime}>{children}</BentoRuntimeContext>;
}

// Internal helper for the hook to guarantee context exists
export function useBentoRuntime(): BentoRuntime {
  const runtime = useContext(BentoRuntimeContext);
  if (!runtime) {
    throw new Error(
      "useBentoRuntime must be used within a BentoRuntimeProvider",
    );
  }
  return runtime;
}

export function useModuleManager() {
  const runtime = useBentoRuntime();
  return runtime.moduleManager;
}
