import "@ubento/bento.style/css/themes.css";
import "@ubento/bento.style/dist/uno.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./modules.js";
import { ComponentRuntime } from "./runtime.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ComponentRuntime />
  </StrictMode>,
);
