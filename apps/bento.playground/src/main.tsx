import "@ubento/bento-style/css/themes.css";
import "@ubento/bento-style/dist/uno.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Playground } from "./playground.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
