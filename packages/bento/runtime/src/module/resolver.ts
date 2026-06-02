import type { DuplexRpc } from "@ubento/rpc";
import * as LucideReact from "lucide-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";
import * as ReactJsxRuntime from "react/jsx-runtime";
import { useLocation, useNavigation, useParams } from "../hooks/navigation.js";
import { useAction, useInfiniteQuery, useQuery } from "../hooks/service.js";
import type { ModuleRef } from "../spec.js";

// The path that your Service Worker is actively listening for
export const MODULE_BASE_PATH = "/__ubento_modules/";

/**
 * Creates a proxy module that re-exports everything from a window object
 */
export function createModuleProxy(
  module: any,
  proxyName: string,
  defaultExport?: boolean,
): string {
  if (
    typeof window !== "undefined" &&
    !(window as any).__elementa_module_proxies__
  ) {
    (window as any).__elementa_module_proxies__ = {};
  }
  if (typeof window !== "undefined") {
    (window as any).__elementa_module_proxies__[proxyName] = module;
  }

  const keys = Object.keys(module).filter((key) => {
    return key !== "default" && /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(key);
  });

  const exports = keys
    .map((key) => `export const ${key} = ${proxyName}.${key};`)
    .join("\n");

  const defaultExportLine = defaultExport ? `export default ${proxyName};` : "";

  return `
    const ${proxyName} = window.__elementa_module_proxies__.${proxyName};
    ${exports}
    ${defaultExportLine}
  `;
}

/**
 * Creates proxy modules for React, ReactDOM, and Ubento runtime with their blob URLs
 */
export function createProxyModules(): Record<string, string> {
  const reactScript = createModuleProxy(React, "React", true);
  const reactJsxRuntimeScript = createModuleProxy(
    ReactJsxRuntime,
    "ReactJsxRuntime",
    true,
  );
  const reactDOMScript = createModuleProxy(ReactDOM, "ReactDOM", true);
  const reactDOMClientScript = createModuleProxy(
    ReactDOMClient,
    "ReactDOMClient",
    true,
  );
  const lucideReactScript = createModuleProxy(LucideReact, "LucideReact", true);

  const bentoRuntimeScript = createModuleProxy(
    {
      useAction,
      useQuery,
      useInfiniteQuery,
      useParams,
      useLocation,
      useNavigation,
    },
    "Ubento",
    false,
  );

  return {
    react: URL.createObjectURL(
      new Blob([reactScript], { type: "application/javascript" }),
    ),
    "react-dom": URL.createObjectURL(
      new Blob([reactDOMScript], { type: "application/javascript" }),
    ),
    "react/jsx-runtime": URL.createObjectURL(
      new Blob([reactJsxRuntimeScript], { type: "application/javascript" }),
    ),
    "react-dom/client": URL.createObjectURL(
      new Blob([reactDOMClientScript], { type: "application/javascript" }),
    ),
    "lucide-react": URL.createObjectURL(
      new Blob([lucideReactScript], { type: "application/javascript" }),
    ),
    ubento: URL.createObjectURL(
      new Blob([bentoRuntimeScript], { type: "application/javascript" }),
    ),
  };
}

/**
 * Merge or create an import map in the document, injecting/overriding specifiers.
 */
export function updateImportMap(overrides: Record<string, string>) {
  if (typeof document === "undefined") return;

  const existing = document.querySelector('script[type="importmap"]');
  let current: { imports: Record<string, string>; scopes?: any } = {
    imports: {},
  };

  if (existing) {
    try {
      current = JSON.parse(existing.textContent || "{}");
      if (!current.imports) current.imports = {};
    } catch (e) {
      console.warn("Failed to parse existing importmap, resetting:", e);
      current = { imports: {} };
    }
  }

  // Merge/override
  Object.assign(current.imports, overrides);

  // Replace or insert
  const newMap = document.createElement("script");
  newMap.type = "importmap";
  newMap.textContent = JSON.stringify(current, null, 2);

  if (existing) {
    existing.replaceWith(newMap);
  } else {
    document.head.appendChild(newMap);
  }
}

/**
 * Main initialization function to be called by the Ubento Runtime
 * when the workspace spec is loaded.
 */
export function injectWorkspaceImportMap(
  modules: Record<string, ModuleRef> = {},
) {
  // 1. Generate our core host-provided dependencies via Blobs
  const baseProxies = createProxyModules();

  // 2. Generate Service Worker routes with strict namespaces
  const remoteMappings: Record<string, string> = {};

  // Map libraries to the @/modules/ namespace
  Object.entries(modules).forEach(([name, ref]) => {
    const alias = `@/modules/${name}`;
    remoteMappings[alias] = `${MODULE_BASE_PATH}${ref.id}@${ref.versionId}.js`;
  });

  console.log("overrides:", {
    baseProxies,
    remoteMappings,
    libraries: modules,
  });

  // 3. Combine and inject into the DOM
  updateImportMap({
    ...baseProxies,
    ...remoteMappings,
  });
}

export async function runServiceWorker({
  swUrl = "/sw.js",
  registryModuleUrlTemplate,
  rpc,
}: {
  swUrl?: string;
  registryModuleUrlTemplate: string;
  rpc: DuplexRpc<any, any>;
}): Promise<void> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
    console.error("Service Workers are not supported in this browser.");
    return;
  }

  try {
    // 1. Register the Service Worker
    const registration = await navigator.serviceWorker.register(swUrl, {
      scope: "/",
    });

    console.log(
      "Ubento Module Service Worker registered successfully.",
      registration.scope,
    );

    // 2. Listen for direct requests from the active Service Worker
    navigator.serviceWorker.addEventListener("message", async (event) => {
      if (event.data && event.data.type === "REQUEST_TOKEN") {
        const replyPort = event.ports[0];

        if (!replyPort) {
          console.error(
            "Service Worker requested a token but did not provide a MessageChannel port.",
          );
          return;
        }

        try {
          const token = await rpc.egress.getModuleRegistryAccessToken({});

          replyPort.postMessage({
            registryModuleUrlTemplate,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error(
            "Failed to retrieve token from Main Thread via RPC:",
            error,
          );
          replyPort.postMessage({ moduleUrlTemplate: "", headers: {} });
        }
      }
    });
  } catch (error) {
    console.error("Ubento Module Service Worker registration failed:", error);
  }

  await navigator.serviceWorker.ready;
  console.log("Module Service Worker ready!");
}
