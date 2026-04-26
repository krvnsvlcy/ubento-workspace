import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { useEffect, useState } from "react";
import { subscribe } from "valtio";
import { useEngineController } from "../../controller";

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
      let mounted = true;
      let cleanup: (() => void) | undefined;
      controller
        .getModule(moduleId)
        .then((module) => {
          if (mounted) {
            cleanup = subscribe(module, (_) => {
              setVersionId(module.latestVersionId);
            });
          }
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });

      return () => {
        mounted = false;
        cleanup?.();
      };
    }
  }, [moduleId, controller]);

  // resolve version value
  useEffect(() => {
    if (!versionId) return;
    controller
      .resolveModuleValue(moduleId, versionId)
      .then((moduleValue) => {
        setModuleValue(moduleValue.value);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [versionId, controller]);

  if (loading) return <PendingView message="Loading component..." />;
  if (error) return <ErrorView message="Failed to load component" />;
  if (!moduleValue) return <ErrorView message="Component not found" />;

  const Component = moduleValue.default;
  if (!Component)
    return <ErrorView message="No default export found in component module" />;

  return <Component {...props} />;
}
