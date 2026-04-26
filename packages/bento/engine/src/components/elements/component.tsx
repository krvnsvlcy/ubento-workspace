import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { useEffect, useState } from "react";
import { useEngineController } from "../../controller";
import { ModuleData } from "../../models";

export function Component({
  moduleId,
  moduleVersionId,
  props = {},
}: {
  moduleId: string;
  moduleVersionId?: string;
  props?: Record<string, any>;
}): React.JSX.Element {
  const controller = useEngineController();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [moduleValue, setModuleValue] = useState<any>();
  const [versionId, setVersionId] = useState<string | undefined>(
    moduleVersionId,
  );

  // resolve module versionId
  useEffect(() => {
    if (!moduleVersionId) {
      let cleanup: (() => void) | undefined;
      controller
        .getState()
        .getModule(moduleId)
        .then((module: ModuleData) => {
          setVersionId(module.latestVersionId);
          cleanup = controller.subscribe((curr, prev) => {
            if (
              curr.modules[moduleId]?.latestVersionId !==
              prev.modules[moduleId]?.latestVersionId
            ) {
              setVersionId(curr.modules[moduleId]?.latestVersionId);
            }
          });
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });

      return () => {
        cleanup?.();
      };
    }
  }, [moduleId, controller, moduleVersionId]);

  // resolve version value
  useEffect(() => {
    if (!versionId) return;
    controller
      .getState()
      .resolveModuleValue(moduleId, versionId)
      .then((moduleValue: any) => {
        setModuleValue(moduleValue.value);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [versionId, controller, moduleId]);

  if (loading) return <PendingView message="Loading component..." />;
  if (error) return <ErrorView message="Failed to load component" />;
  if (!moduleValue) return <ErrorView message="Component not found" />;

  const Component = moduleValue.default;
  if (!Component)
    return <ErrorView message="No default export found in component module" />;

  return <Component {...props} />;
}
