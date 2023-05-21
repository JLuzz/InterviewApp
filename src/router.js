import { createBrowserRouter } from "react-router-dom";

import { App } from "./App";
import { EventViewer, ErrorPage } from "./components";

export const router = createBrowserRouter([
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
