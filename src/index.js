import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";

import { router } from "./router";
import { store } from "./store";
import { theme } from "./theme";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
