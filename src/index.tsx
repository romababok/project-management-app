import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "antd/dist/antd.min.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  // TODO: React.Strict mode does double rendering and causes doubling of request for task creating
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
