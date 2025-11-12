import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import "./i18n/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={3000} />
      <App />
    </Provider>
  </StrictMode>
);
