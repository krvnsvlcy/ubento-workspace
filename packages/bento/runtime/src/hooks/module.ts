import { useEffect, useState } from "react";
import { useModuleManager } from "../context/runtime";
import { ModuleState } from "../module/manager";

export function useModule(id: string, versionId: string): ModuleState {
  const manager = useModuleManager();

  // Initialize with the current synchronous state (often 'idle')
  const [moduleState, setModuleState] = useState<ModuleState>(() =>
    manager.getModule(id, versionId),
  );

  useEffect(() => {
    let isMounted = true;

    // 1. Tell the manager a component needs this module
    manager.refModule(id, versionId);

    // 2. Sync state immediately in case it was already loaded by another component
    const currentState = manager.getModule(id, versionId);
    setModuleState({ ...currentState }); // Spread to ensure React detects object identity change

    // 3. Initiate the load (this is a no-op if already loaded)
    manager.loadModule(id, versionId).then((finalState) => {
      if (isMounted) {
        // Spread the state into a new object. The ModuleManager mutates the
        // original state object, but React's useState requires a new reference
        // to trigger a re-render.
        setModuleState({ ...finalState });
      }
    });

    // 4. Cleanup: Tell the manager this component no longer needs the module
    return () => {
      isMounted = false;
      manager.unrefModule(id, versionId);
    };
  }, [manager, id, versionId]);

  return moduleState;
}
