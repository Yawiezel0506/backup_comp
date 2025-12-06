import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./rtk/store.ts";
import Kidnapped from "./components/kidnapped.tsx";
import OpenMassage from "./warModal/OpenMassage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.Fragment>
      <CssBaseline />
      <Kidnapped/>
      <OpenMassage/>
      <App />
    </React.Fragment>
  </Provider>
);
