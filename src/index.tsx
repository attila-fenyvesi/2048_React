import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.Fragment>
    <HashRouter>
      <App />
    </HashRouter>
  </React.Fragment>,
  document.getElementById("root")
);
