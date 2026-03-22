import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

// Add manifest link for PWA
if (typeof document !== "undefined") {
  const link = document.createElement("link");
  link.rel = "manifest";
  link.href = "/manifest.json";
  document.head.appendChild(link);

  // Add theme color meta tag
  const themeColor = document.createElement("meta");
  themeColor.name = "theme-color";
  themeColor.content = "#b45309";
  document.head.appendChild(themeColor);

  // Add viewport for PWA
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute(
      "content",
      "width=device-width, initial-scale=1, viewport-fit=cover"
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
