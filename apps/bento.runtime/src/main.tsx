import { LayoutContext } from "@ubento/bento.arlo";
import { BentoRuntimeView, createBentoRuntime } from "@ubento/bento.runtime";
import "@ubento/bento.style/css/themes.css";
import "@ubento/bento.style/dist/uno.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { environment } from "./environment.js";
import "./modules.js";
import { rpc } from "./rpc.js";

rpc.run();

let connected = false;
while (!connected) {
  try {
    console.log("[bento.runtime] connecting...");
    const { initialState } = await rpc.egress.connect({}, { timeout: 1000 });
    console.log("[bento.runtime] connected", initialState);
    connected = true;
    const runtime = createBentoRuntime({
      rpc,
      initialState,
    });
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <LayoutContext value={"column"}>
          <BentoRuntimeView runtime={runtime} environment={environment} />
        </LayoutContext>
      </StrictMode>,
    );
    rpc.egress.ready({});
  } catch (err) {
    console.error("[bento.runtime] failed to connect", err);
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
