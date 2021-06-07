import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
);
