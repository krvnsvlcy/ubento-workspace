import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";
import * as ReactJsxRuntime from "react/jsx-runtime";
import * as BentoArlo from "@ubento/bento.arlo";
import * as BentoArloCore from "@ubento/bento.arlo-core";
import * as LucideReact from "lucide-react";
import * as BentoCore from "@ubento/bento.core";

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
 * Creates proxy modules for React and ReactDOM with their blob URLs
 */
function createReactProxyModules(): Record<string, string> {
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
  const bentoArloScript = createModuleProxy(BentoArlo, "BentoArlo", true);
  const bentoArloCoreScript = createModuleProxy(BentoArloCore, "BentoArloCore", true);
  const lucideReactScript = createModuleProxy(LucideReact, "LucideReact", true);
  const bentoCoreScript = createModuleProxy(BentoCore, "BentoCore", true);

  const reactModuleUrl = URL.createObjectURL(
    new Blob([reactScript], { type: "application/javascript" }),
  );
  const reactDOMModuleUrl = URL.createObjectURL(
    new Blob([reactDOMScript], { type: "application/javascript" }),
  );
  const reactJsxRuntimeScriptUrl = URL.createObjectURL(
    new Blob([reactJsxRuntimeScript], { type: "application/javascript" }),
  );
  const reactDOMClientScriptUrl = URL.createObjectURL(
    new Blob([reactDOMClientScript], { type: "application/javascript" }),
  );
  const bentoArloScriptUrl = URL.createObjectURL(
    new Blob([bentoArloScript], { type: "application/javascript" }),
  );
  const bentoArloCoreScriptUrl = URL.createObjectURL(
    new Blob([bentoArloCoreScript], { type: "application/javascript" }),
  );
  const lucideReactScriptUrl = URL.createObjectURL(
    new Blob([lucideReactScript], { type: "application/javascript" }),
  );
  const bentoCoreScriptUrl = URL.createObjectURL(
    new Blob([bentoCoreScript], { type: "application/javascript" }),
  );

  return {
    react: reactModuleUrl,
    "react-dom": reactDOMModuleUrl,
    "react/jsx-runtime": reactJsxRuntimeScriptUrl,
    "react-dom/client": reactDOMClientScriptUrl,
    "@ubento/bento.arlo": bentoArloScriptUrl,
    "@ubento/bento.arlo-core": bentoArloCoreScriptUrl,
    "lucide-react": lucideReactScriptUrl,
    "@ubento/bento.core": bentoCoreScriptUrl,
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

// Create proxy modules for React and ReactDOM
export const proxyModules = createReactProxyModules();

// Inject/update import map so dynamic imports and module loaders can see the synthetic modules
updateImportMap(proxyModules);
