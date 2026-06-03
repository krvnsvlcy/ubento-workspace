import {
  ComponentRuntime,
  createBentoRuntime,
  createProxyModules,
  injectWorkspaceImportMap,
  ModuleManager,
  runServiceWorker,
  updateImportMap,
} from "@ubento/bento.runtime";
import "@ubento/bento.style/dist/uno.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useStore } from "zustand";
import { rpc } from "./rpc.js";
import { useComponentStore } from "./state.js";

import "@ubento/bento.style/css/fonts.css";
import "@ubento/bento.style/css/themes.css";

// Initialize base proxies immediately
updateImportMap(createProxyModules());

rpc.run();

rpc.setHandlers({
  init: ({ code, props }) => {
    useComponentStore.getState().updateCode(code);
    useComponentStore.getState().updateProps(props);
    rpc.egress.ready({});
  },
  updateCode: ({ code }) => {
    useComponentStore.getState().updateCode(code);
  },
  updateProps: ({ props }) => {
    useComponentStore.getState().updateProps(props);
  },
  setTheme: ({ isDark }) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
});

const ComponentRuntimeWrapper = ({ runtime }: { runtime: any }) => {
  const { code, props } = useStore(useComponentStore);
  return <ComponentRuntime runtime={runtime} code={code} props={props} />;
};

let connected = false;
while (!connected) {
  try {
    console.log("[component.runtime] connecting...");
    const { workspaceSpec, registryModuleUrlTemplate, theme } =
      await rpc.egress.connect({}, { timeout: 1000 });
    connected = true;
    console.log("[component.runtime] connected");

    if (theme?.isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    injectWorkspaceImportMap({
      modules: workspaceSpec.modules,
      packages: workspaceSpec.packages,
    });

    if (registryModuleUrlTemplate) {
      await runServiceWorker({
        rpc,
        registryModuleUrlTemplate,
      });
    }

    const moduleManager = new ModuleManager(
      (id, versionId) => import(`/__ubento_modules/${id}@${versionId}.js`),
    );

    const bentoRuntime = createBentoRuntime({
      rpc: rpc as any,
      initialState: {
        workspace: {
          id: "",
          title: "",
          spec: (workspaceSpec
            ? { isValid: true, data: workspaceSpec }
            : { isValid: false, data: undefined, issues: [] }) as any,
        },
        user: { name: "", email: "" },
        theme: theme ? { css: "", isDark: theme.isDark } : undefined,
      },
      moduleManager,
    });

    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <ComponentRuntimeWrapper runtime={bentoRuntime} />
      </StrictMode>,
    );
  } catch (err) {
    console.error("[component.runtime] failed to connect", err);
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
