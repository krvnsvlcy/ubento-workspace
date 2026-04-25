import "@ubento/bento-style/css/themes.css";
import "@ubento/bento-style/dist/uno.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GuestApp } from "./app";
import "./modules";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GuestApp />
  </StrictMode>,
);
