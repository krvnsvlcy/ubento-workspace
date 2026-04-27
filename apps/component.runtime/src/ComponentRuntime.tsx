import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { useEffect, useState } from "react";
import { transform } from "sucrase";
import { useStore } from "zustand";
import { rpc } from "./rpc.js";
import { useComponentStore } from "./state.js";

export function ComponentRuntime() {
  const { code, props, updateCode, updateProps } = useStore(useComponentStore);
  const [error, setError] = useState<string | null>(null);
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null,
  );

  useEffect(() => {
    rpc.setHandlers({
      init: ({ code, props }) => {
        updateCode(code);
        updateProps(props);
        rpc.egress.ready({});
      },
      updateCode: ({ code }) => {
        updateCode(code);
      },
      updateProps: ({ props }) => {
        updateProps(props);
      },
    });

    rpc.egress.connect({});
  }, []);

  useEffect(() => {
    if (!code) return;

    let url: string | null = null;

    const compileAndLoad = async () => {
      try {
        setError(null);
        const { code: compiledCode } = transform(code, {
          transforms: ["typescript", "jsx"],
          jsxRuntime: "automatic",
          production: true,
        });

        const blob = new Blob([compiledCode], {
          type: "application/javascript",
        });
        url = URL.createObjectURL(blob);

        // Use dynamic import with the object URL
        const mod = await import(/* @vite-ignore */ url);
        const DefaultExport = mod.default || mod;

        if (typeof DefaultExport !== "function") {
          throw new Error(
            "The component code must export a default React component.",
          );
        }

        setComponent(() => DefaultExport);
      } catch (err: any) {
        console.error("[component.runtime] compilation error:", err);
        setError(err.message);
      } finally {
        if (url) {
          const currentUrl = url;
          setTimeout(() => URL.revokeObjectURL(currentUrl), 10000);
        }
      }
    };

    compileAndLoad();
  }, [code]);

  if (error) {
    return <ErrorView message={`Compilation Error: ${error}`} />;
  }

  if (!Component) {
    return <PendingView message="Waiting for component code..." />;
  }

  return (
    <div className="component-preview-container p-4">
      <Component {...props} />
    </div>
  );
}
