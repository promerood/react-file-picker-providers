import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/highlight.js/styles/ocean.css";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
