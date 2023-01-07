import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import { AuthProvider } from "./hooks/useAuth";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <AuthProvider>
      <React.StrictMode>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </React.StrictMode>
    </AuthProvider>
  </StyledEngineProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
