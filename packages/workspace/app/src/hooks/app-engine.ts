import { UbentoEngineContext } from "@/contexts/app_engine";
import { useContext } from "react";

export function useUbentoEngine() {
  const engine = useContext(UbentoEngineContext);
  if (!engine) {
    throw new Error("useUbentoEngine must be used within UbentoEngineProvider");
  }
  return engine;
}

export function useUbento() {
  const engine = useUbentoEngine();
  return engine.ubento;
}
