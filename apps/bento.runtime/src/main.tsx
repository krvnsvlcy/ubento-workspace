import "@ubento/bento.style/dist/uno.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./modules.js";
import { GuestWorkspace } from "./workspace.js";

import { createBentoEngine, engineFlags } from "@ubento/bento.engine";
import "@ubento/bento.style/css/themes.css";
import { rpc } from "./rpc.js";

engineFlags.DEV_MODE = !!import.meta.env.DEV_MODE;

rpc.setHandlers({
  init: ({ state, publicModuleUrlTemplate }) => {
    const engine = createBentoEngine({ rpc, publicModuleUrlTemplate, state });

    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <GuestWorkspace engine={engine} />
      </StrictMode>,
    );

    rpc.egress.ready({});
  },
});

rpc.run();
rpc.egress.connect({});
