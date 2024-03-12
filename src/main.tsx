import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Pong } from "./components/Pong";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Pong />
  </React.StrictMode>
);
