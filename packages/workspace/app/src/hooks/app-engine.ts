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

export function useAppLocation() {
  const engine = useUbentoEngine();
  return engine.useState((s) => s.location);
}

export function useActiveWorkspaceId() {
  const location = useAppLocation();
  const workspaceId =
    location.view === "workspace" ? location.params.workspaceId : null;

  return workspaceId;
}
