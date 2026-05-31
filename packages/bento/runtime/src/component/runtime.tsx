import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorView, PendingView } from "@ubento/bento.arlo-core";
import React, { useEffect, useState } from "react";
import { transform } from "sucrase";
import { BentoRuntimeProvider } from "../context/runtime";
import { queryClient } from "../query";
import { BentoRuntime } from "../runtime/runtime";
import { BentoBoardView } from "./board";
import { BentoHomeView } from "./home";

export function BentoRuntimeView({ runtime }: { runtime: BentoRuntime }) {
  const location = runtime.useState((s) => s.location);

  let content = <BentoHomeView runtime={runtime} />;
  if (location) {
    content = (
      <BentoBoardView
        key={location.boardId}
        runtime={runtime}
        boardId={location.boardId}
        params={location.params}
      />
    );
  }

  return (
    <BentoRuntimeProvider runtime={runtime}>
      <QueryClientProvider client={queryClient}>{content}</QueryClientProvider>
    </BentoRuntimeProvider>
  );
}

export function ComponentRuntime({
  runtime,
  code,
  props,
}: {
  runtime: BentoRuntime;
  code: string;
  props: any;
}) {
  const [error, setError] = useState<string | null>(null);
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null,
  );

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
    <BentoRuntimeProvider runtime={runtime}>
      <QueryClientProvider client={queryClient}>
        <Component key={code} {...props} />
      </QueryClientProvider>
    </BentoRuntimeProvider>
  );
}
