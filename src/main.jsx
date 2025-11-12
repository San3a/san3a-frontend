import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from "./App.jsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import "./i18n/index.js";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </ThemeProvider>
);
