import { BentoRuntimeView, createBentoRuntime } from "@ubento/bento.runtime";
import "@ubento/bento.style/css/themes.css";
import "@ubento/bento.style/dist/uno.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./modules.js";
import { rpc } from "./rpc.js";

rpc.run();

let connected = false;
while (!connected) {
  const { initialState } = await rpc.egress.connect({});
  connected = true;
  const runtime = createBentoRuntime({
    rpc,
    initialState,
  });
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BentoRuntimeView runtime={runtime} />
    </StrictMode>,
  );
  rpc.egress.ready({});
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
