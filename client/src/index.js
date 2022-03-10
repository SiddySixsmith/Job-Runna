import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import reportWebVitals from "./reportWebVitals";
import { Workbox } from "workbox-window";

if ("serviceWorker" in navigator) {
  // Register workbox service worker
  const workboxSW = new Workbox("/src-sw.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
// serviceWorker.register();
