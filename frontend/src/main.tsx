import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import { ActionProvider } from "./context/ActionContext";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <AuthProvider>
      <ModalProvider>
        <ActionProvider>
          <App />
        </ActionProvider>
      </ModalProvider>
    </AuthProvider>
  </React.StrictMode>
);