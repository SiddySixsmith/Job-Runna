import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceworker";

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
serviceWorker.register();
