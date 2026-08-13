import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Root } from "./Root";

if (import.meta.env.DEV) {
  import("react-grab");
}

const container = document.getElementById("root")!;

const app = (
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
);

// Production HTML arrives prerendered, so it gets hydrated rather than
// replaced; `vite dev` serves the empty shell and mounts normally.
if (container.firstChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
