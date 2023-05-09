import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./context/myContext";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
