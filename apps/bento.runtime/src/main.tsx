import "@ubento/bento.style/css/themes.css";
import "@ubento/bento.style/dist/uno.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./modules.js";
import { rpc } from "./rpc.js";
import { GuestWorkspace } from "./workspace.js";

rpc.run();

let connected = false;
while (!connected) {
  rpc.egress.connect({}).then(() => {
    connected = true;
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <GuestWorkspace />
      </StrictMode>,
    );
    rpc.egress.ready({});
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
