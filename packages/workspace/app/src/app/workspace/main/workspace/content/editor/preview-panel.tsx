import { useUbentoEngine } from "@/hooks/app-engine";
import { useValidWorkspaceSpec } from "@/hooks/workspace";
import { createDuplexRpc, createWindowPort, DuplexRpc } from "@ubento/rpc";
import {
  ComponentEngineRuntimeHostRpcInterface,
  ComponentEngineRuntimeRpcInterface,
} from "@ubento/bento.runtime";
import clsx from "clsx";
import { useEffect, useRef } from "react";

interface PreviewPanelProps {
  value?: string;
  className?: string;
}

export function PreviewPanel({ value = "", className }: PreviewPanelProps) {
  const appEngine = useUbentoEngine();
  const workspaceSpec = useValidWorkspaceSpec();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const rpcRef = useRef<DuplexRpc<
    ComponentEngineRuntimeHostRpcInterface,
    ComponentEngineRuntimeRpcInterface
  > | null>(null);

  const handleLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    if (rpcRef.current) {
      rpcRef.current.dispose();
      rpcRef.current = null;
    }

    const port = createWindowPort(window, iframe.contentWindow);
    const rpcInstance = createDuplexRpc<
      ComponentEngineRuntimeHostRpcInterface,
      ComponentEngineRuntimeRpcInterface
    >({
      channel: "component",
      port,
      handlers: {
        connect: () => {
          rpcInstance.egress.init({
            code: value,
            props: {},
          });
          return {
            workspaceSpec,
            registryModuleUrlTemplate: appEngine.registryModuleUrlTemplate,
          };
        },
        ready: () => {
          console.log("[component.host] runtime ready");
        },
        log: ({ type, args }: { type: "log" | "error" | "warn" | "info"; args: any[] }) => {
          const consoleMethod = console[type] as (...args: any[]) => void;
          if (typeof consoleMethod === "function") {
            consoleMethod(`[component.runtime.${type}]`, ...args);
          }
        },
        getModuleRegistryAccessToken: async () => {
          const session = appEngine.getState().session;
          const { token } = await appEngine.ubento.sdk.module.getRegistryToken([
            session.teamId,
          ]);
          return token;
        },
        runServiceOperation: async (args) => {
          const workspace = appEngine.getState().workspace;
          if (!workspace) {
            throw new Error("No active workspace engine");
          }
          return await workspace.runServiceOperation(args);
        },
      },
    });

    rpcRef.current = rpcInstance;
    rpcInstance.run();
  };

  useEffect(() => {
    const rpcInstance = rpcRef.current;
    if (rpcInstance && value) {
      rpcInstance.egress.updateCode({ code: value });
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (rpcRef.current) {
        rpcRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className={clsx("w-full h-full relative bg-surface/5", className)}>
      <iframe
        ref={iframeRef}
        src={appEngine.componentRuntimeUrl}
        onLoad={handleLoad}
        style={{
          height: "100%",
          width: "100%",
          border: "none",
          outline: "none",
        }}
      />
    </div>
  );
}
