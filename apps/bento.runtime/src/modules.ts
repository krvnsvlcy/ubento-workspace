/**
 * @fileoverview
 * Exposes core Bento runtime hooks and React bindings to board modules.
 * This includes data-fetching/mutation hooks (useQuery, useAction) as well as
 * board navigation and routing hooks (useParams, useLocation, useNavigation).
 */
import {
  useAction,
  useLocation,
  useNavigation,
  useParams,
  useQuery,
  type ModuleRef,
} from "@ubento/bento.runtime";
import * as LucideReact from "lucide-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";
import * as ReactJsxRuntime from "react/jsx-runtime";

// The path that your Service Worker is actively listening for
const MODULE_BASE_PATH = "/__ubento_modules/";

/**
 * Creates a proxy module that re-exports everything from a window object
 */
function createModuleProxy(
  module: any,
  proxyName: string,
  defaultExport?: boolean,
): string {
  if (!(window as any).__elementa_module_proxies__) {
    (window as any).__elementa_module_proxies__ = {};
  }
  (window as any).__elementa_module_proxies__[proxyName] = module;

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
function createProxyModules(): Record<string, string> {
  // 1. Generate Proxy Strings
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

  // Bundle the runtime hooks into an object for the proxy.
  // The BentoRuntime proxy exposes:
  // - useAction: Mutate service data and trigger service actions.
  // - useQuery: Query/fetch service endpoint data (cached via TanStack Query).
  // - useParams: Hook returning route parameters for the active board.
  // - useLocation: Hook returning the current active BentoLocation (boardId and params).
  // - useNavigation: Hook providing goToBoard(boardId, params) and goHome() routing controls.
  const bentoRuntimeScript = createModuleProxy(
    { useAction, useQuery, useParams, useLocation, useNavigation },
    "BentoRuntime",
    false,
  );

  // 2. Convert to Blob URLs and map to specifiers
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
function updateImportMap(overrides: Record<string, string>) {
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
  components: Record<string, ModuleRef> = {},
  libraries: Record<string, ModuleRef> = {},
) {
  // 1. Generate our core host-provided dependencies via Blobs
  const baseProxies = createProxyModules();

  // 2. Generate Service Worker routes with strict namespaces
  const remoteMappings: Record<string, string> = {};

  // Map components to the @/component/ namespace
  Object.entries(components).forEach(([name, ref]) => {
    const alias = `@/component/${name}`;
    remoteMappings[alias] = `${MODULE_BASE_PATH}${ref.id}@${ref.versionId}.js`;
  });

  // Map libraries to the @/libs/ namespace
  Object.entries(libraries).forEach(([name, ref]) => {
    const alias = `@/libs/${name}`;
    remoteMappings[alias] = `${MODULE_BASE_PATH}${ref.id}@${ref.versionId}.js`;
  });

  console.log("overrides:", {
    baseProxies,
    remoteMappings,
    components,
    libraries,
  });

  // 3. Combine and inject into the DOM
  updateImportMap({
    ...baseProxies,
    ...remoteMappings,
  });
}
