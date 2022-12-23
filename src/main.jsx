import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { App } from "./App";
import "./sass/index.scss";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
