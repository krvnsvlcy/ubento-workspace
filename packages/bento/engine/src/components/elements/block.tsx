import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { useEffect, useState } from "react";
import { useBentoEngine } from "../../engine";
import { BlockData } from "../../models";
import { BaseElement, getBaseStyle } from "./base_element";

export function Block({
  id,
  data,
}: {
  id: string;
  data: BlockData;
}): React.JSX.Element {
  const engine = useBentoEngine();
  const { getModule, resolveModuleValue } = engine;
  const latestVersionId = engine.useState(
    (s) => s.modules[data.moduleId]?.latestVersionId,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [moduleValue, setModuleValue] = useState<any>();

  const versionId = data.moduleVersionId || latestVersionId;

  // resolve module versionId
  useEffect(() => {
    if (!data.moduleVersionId && !latestVersionId) {
      getModule(data.moduleId).catch(() => {
        setError(true);
        setLoading(false);
      });
    }
  }, [data.moduleId, data.moduleVersionId, latestVersionId, getModule]);

  // resolve version value
  useEffect(() => {
    if (!versionId) return;
    resolveModuleValue(data.moduleId, versionId)
      .then((moduleValue: any) => {
        setModuleValue(moduleValue);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [versionId, resolveModuleValue, data.moduleId]);

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
