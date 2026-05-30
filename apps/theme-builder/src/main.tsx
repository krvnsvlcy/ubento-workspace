import "@ubento/bento.style/dist/uno.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@ubento/bento.style/css/fonts.css";
import "@ubento/bento.style/css/themes.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
