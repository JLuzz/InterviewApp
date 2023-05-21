import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "@emotion/styled";

import { NavigationBar } from "./components";

import "react-toastify/dist/ReactToastify.min.css";

const Page = styled("div")({
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
});

export const App = () => {
  return (
    <Page>
      <ToastContainer />
      <NavigationBar />
      <Outlet />
    </Page>
  );
};
