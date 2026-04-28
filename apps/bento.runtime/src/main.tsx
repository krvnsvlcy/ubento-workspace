import "@ubento/bento-style/dist/uno.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./modules.js";
import { GuestWorkspace } from "./workspace.js";

import "@ubento/bento-style/css/themes.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GuestWorkspace />
  </StrictMode>,
);
