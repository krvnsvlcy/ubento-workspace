import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { ComponentModule, useAppEngineController } from "../../controller";

function ComponentContent({
  componentModule,
  props = {},
}: {
  componentModule: ComponentModule;
  props?: Record<string, any>;
}): React.JSX.Element {
  const snap = useSnapshot(componentModule);
  const Component = snap.value as React.ComponentType<any>;

  return <Component {...props} />;
}

export function Component({
  id,
  props = {},
}: {
  id: string;
  props?: Record<string, any>;
}): React.JSX.Element {
  const controller = useAppEngineController();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [component, setComponent] = useState<ComponentModule | undefined>();

  useEffect(() => {
    controller
      .getComponent(id)
      .then((component) => {
        setComponent(component);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, controller]);

  if (loading) return <PendingView message="Loading page..." />;
  if (error) return <ErrorView message="Failed to load page" />;
  if (!component) return <ErrorView message="Page not found" />;

  return <ComponentContent componentModule={component} props={props} />;
}
