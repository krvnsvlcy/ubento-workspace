import "@ubento/bento-style/dist/uno.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./modules.js";
import { GuestWorkspace } from "./workspace.js";

import "@ubento/bento-style/css/themes.css";
import { engineFlags } from "@ubento/engine";

engineFlags.DEV_MODE = !!import.meta.env.DEV_MODE;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GuestWorkspace />
  </StrictMode>,
);
