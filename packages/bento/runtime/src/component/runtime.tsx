import { QueryClientProvider } from "@tanstack/react-query";
import { Code, Heading, PendingView, Text } from "@ubento/bento.arlo-core";
import React, { useEffect, useState } from "react";
import { transform } from "sucrase";
import { BentoRuntimeProvider } from "../context/runtime";
import { BentoRuntime } from "../runtime/runtime";
import { updateUnoStyle } from "../unocss";
import { BentoBoardView } from "./board";
import { ErrorBoundary } from "./error-boundary";
import { BentoFallbackView } from "./fallback";

export function BentoRuntimeView({ runtime }: { runtime: BentoRuntime }) {
  const location = runtime.useState((s) => s.location);
  const workspaceSpec = runtime.useState((s) => s.workspace.spec);
  const home = workspaceSpec.isValid ? workspaceSpec.data.home : null;

  let content = <BentoFallbackView runtime={runtime} />;
  if (location) {
    content = (
      <BentoBoardView
        key={location.boardId}
        runtime={runtime}
        boardId={location.boardId}
        params={location.params}
      />
    );
  } else if (home) {
    content = (
      <BentoBoardView key={home} runtime={runtime} boardId={home} params={{}} />
    );
  }

  return (
    <BentoRuntimeProvider runtime={runtime}>
      <QueryClientProvider client={runtime.queryClient}>
        {content}
      </QueryClientProvider>
    </BentoRuntimeProvider>
  );
}

export function ComponentRuntime({
  runtime,
  code,
}: {
  runtime: BentoRuntime;
  code: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [missingPreview, setMissingPreview] = useState<boolean>(false);
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null,
  );

  useEffect(() => {
    if (!code) return;

    let url: string | null = null;

    const compileAndLoad = async () => {
      try {
        // Reset states on new compilation
        setError(null);
        setMissingPreview(false);
        setComponent(null);

        const { code: compiledCode } = transform(code, {
          transforms: ["typescript", "jsx"],
          jsxRuntime: "automatic",
          production: true,
        });

        // Extract classes and update/inject global styles
        await updateUnoStyle(code);

        const blob = new Blob([compiledCode], {
          type: "application/javascript",
        });
        url = URL.createObjectURL(blob);

        // Use dynamic import with the object URL
        const mod = await import(/* @vite-ignore */ url);

        // Strictly require the named 'Preview' export. Zero fallbacks.
        const PreviewComponent = mod.Preview;

        if (!PreviewComponent) {
          setMissingPreview(true);
          return;
        }

        setComponent(() => PreviewComponent);
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
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background p-8 text-center gap-4">
        <Heading level="h3" className="font-bold">
          Compilation Error
        </Heading>
        <Text shade="subtle" className="max-w-md">
          There was an error compiling your component.
        </Text>
        <Code className="text-left w-full max-w-md p-4 mt-2 font-mono">
          {error}
        </Code>
      </div>
    );
  }

  if (missingPreview) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background p-8 text-center gap-4">
        <Heading level="h3" className="font-bold">
          No Preview Found
        </Heading>
        <Text shade="subtle" className="max-w-md">
          To preview this module, export a named <code>Preview</code> component.
        </Text>
        <Code className="text-left w-full max-w-md p-4 mt-2 font-mono">
          {`export const Preview = () => {
  return (
    <div>
      Hello from the module!
    </div>
  );
};`}
        </Code>
      </div>
    );
  }

  if (!Component) {
    return <PendingView message="Waiting for component code..." />;
  }

  return (
    <ErrorBoundary>
      <BentoRuntimeProvider runtime={runtime}>
        <QueryClientProvider client={runtime.queryClient}>
          <Component key={code} />
        </QueryClientProvider>
      </BentoRuntimeProvider>
    </ErrorBoundary>
  );
}
