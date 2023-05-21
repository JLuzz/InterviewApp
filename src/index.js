import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventViewer, ErrorPage } from "./components";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <EventViewer /> },
      { path: "/dashboard", element: <EventViewer /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colors: {
          brand: [
            "#F6F2F1",
            "#E7D8D4",
            "#DCBFB6",
            "#D7A697",
            "#D88D75",
            "#E0714F",
            "#F05423",
            "#D24F25",
            "#AE4F31",
            "#914D37",
            "#7A493A",
            "#68453A",
            "#5A4038",
          ],
        },
        primaryColor: "brand",
      }}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
