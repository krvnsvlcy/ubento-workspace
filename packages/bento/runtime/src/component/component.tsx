// components/Component.tsx
import { ErrorBoundary } from "@ubento/bento.arlo-core";
import React from "react";
import { useModule } from "../hooks/module";
import type { ModuleRef } from "../spec";

export interface ComponentProps {
  module: ModuleRef;
  fallback?: React.ReactNode;
  errorFallback?: (error: any) => React.ReactNode;
  componentProps?: Record<string, any>;
}

/**
 * 1. The Inner Component
 * Handles the volatile logic: executing the hook, reading the remote state,
 * and invoking the potentially unstable remote component.
 */
function InnerComponent({
  module,
  fallback = <div className="ubento-loader">Loading module...</div>,
  errorFallback,
  componentProps = {},
}: ComponentProps) {
  const state = useModule(module.id, module.versionId);

  // Handle expected asynchronous loading states
  if (state.status === "idle" || state.status === "loading") {
    return <>{fallback}</>;
  }

  // Handle expected network/fetch errors gracefully
  if (state.status === "error") {
    if (errorFallback) return <>{errorFallback(state.error)}</>;

    return (
      <div
        className="ubento-error"
        style={{ color: "red", border: "1px solid red", padding: "1rem" }}
      >
        <strong>Network or Fetch Error: {module.id}</strong>
        <pre style={{ fontSize: "0.8em" }}>
          {state.error?.message || "Unknown error"}
        </pre>
      </div>
    );
  }

  const RemoteComponent = state.value?.default;

  if (!RemoteComponent) {
    // Because we are wrapped in an ErrorBoundary, we can just throw!
    throw new Error(
      `Module loaded successfully, but no default React component was exported from ${module.id}.`,
    );
  }

  // Render the remote code (if this crashes, the outer boundary catches it)
  return <RemoteComponent {...componentProps} />;
}

/**
 * 2. The Outer Component (The Shell)
 * Strictly responsible for mounting the protective boundary around the logic.
 */
export function Component(props: ComponentProps) {
  return (
    <ErrorBoundary>
      <InnerComponent {...props} />
    </ErrorBoundary>
  );
}
