import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { FilterProvider } from "./context/FilterContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <FilterProvider>
      <App />
    </FilterProvider>
  </React.StrictMode>
);
