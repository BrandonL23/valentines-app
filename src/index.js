import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ValentinesPage from "./ValentinesPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <ValentinesPage />
  // </React.StrictMode>
  <ValentinesPage /> // Removed <React.StrictMode>
);
