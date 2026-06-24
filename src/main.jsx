import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GlobalInputSanitizer from "./Components/elements/GlobalInputSanitizer.jsx";
import AuthProvider from "./Components/context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <GlobalInputSanitizer />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
