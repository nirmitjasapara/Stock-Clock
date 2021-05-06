import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CustomProvider } from "./contexts/CustomContext";
import App from "./components/App/App";

ReactDOM.render(
  <BrowserRouter>
    <CustomProvider>
      <App />
    </CustomProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
