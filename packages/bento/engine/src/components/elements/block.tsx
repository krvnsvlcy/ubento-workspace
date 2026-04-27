import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { useEffect, useState } from "react";
import { useEngineController } from "../../controller";
import { BlockData, ModuleData } from "../../models";
import { BaseElement, getBaseStyle } from "./base_element";

export function Block({
  id,
  data,
}: {
  id: string;
  data: BlockData;
}): React.JSX.Element {
  const controller = useEngineController();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [moduleValue, setModuleValue] = useState<any>();
  const [versionId, setVersionId] = useState<string | undefined>(
    data.moduleVersionId,
  );

  // resolve module versionId
  useEffect(() => {
    if (!data.moduleVersionId) {
      let cleanup: (() => void) | undefined;
      controller
        .getState()
        .getModule(data.moduleId)
        .then((module: ModuleData) => {
          setVersionId(module.latestVersionId);
          cleanup = controller.subscribe((curr, prev) => {
            if (
              curr.modules[data.moduleId]?.latestVersionId !==
              prev.modules[data.moduleId]?.latestVersionId
            ) {
              setVersionId(curr.modules[data.moduleId]?.latestVersionId);
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
  }, [data.moduleId, controller, data.moduleVersionId]);

  // resolve version value
  useEffect(() => {
    if (!versionId) return;
    controller
      .getState()
      .resolveModuleValue(data.moduleId, versionId)
      .then((moduleValue: any) => {
        setModuleValue(moduleValue);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [versionId, controller, data.moduleId]);

  if (loading) return <PendingView message="Loading component..." />;
  if (error) return <ErrorView message="Failed to load component" />;
  if (!moduleValue) return <ErrorView message="Component not found" />;

  const Component = moduleValue.default;
  if (!Component)
    return <ErrorView message="No default export found in component module" />;

  return (
    <BaseElement id={id} data={data} style={getBaseStyle(data.style || {})}>
      <Component {...data.props} />
    </BaseElement>
  );
}
