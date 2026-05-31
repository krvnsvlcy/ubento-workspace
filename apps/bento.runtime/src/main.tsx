import {
  BentoRuntimeView,
  createBentoRuntime,
  injectWorkspaceImportMap,
  ModuleManager,
  runServiceWorker,
} from "@ubento/bento.runtime";
import "@ubento/bento.style/dist/uno.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { rpc } from "./rpc.js";

import "@ubento/bento.style/css/fonts.css";
import "@ubento/bento.style/css/themes.css";

rpc.run();

const moduleManager = new ModuleManager(
  (id, versionId) => import(`/__ubento_modules/${id}@${versionId}.js`),
);

let connected = false;
while (!connected) {
  try {
    console.log("[bento.runtime] connecting...");
    const { initialState, registryModuleUrlTemplate } =
      await rpc.egress.connect({}, { timeout: 1000 });
    connected = true;
    console.log("[bento.runtime] connected");

    const spec = initialState.workspace.spec.isValid
      ? initialState.workspace.spec.data
      : undefined;

    injectWorkspaceImportMap(spec?.components, spec?.modules);
    await runServiceWorker({
      rpc,
      registryModuleUrlTemplate,
    });
    const runtime = createBentoRuntime({
      rpc,
      initialState,
      moduleManager,
    });

    window.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      rpc.egress.onContextMenu({
        position: {
          x: event.clientX,
          y: event.clientY,
        },
      });
    });

    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <BentoRuntimeView runtime={runtime} />
      </StrictMode>,
    );
    rpc.egress.ready({});
  } catch (err) {
    console.error("[bento.runtime] failed to connect", err);
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
