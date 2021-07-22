import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StateProvider } from "./Files/ContextProvider";
import { initialState, reducer } from "./Files/reducer";
import "./index.css";

let RootDirectory = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  RootDirectory
);
