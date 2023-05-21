import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";

import { NavigationBar } from "./components";

const Page = styled("div")({
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
});

export const App = () => {
  return (
    <Page>
      <NavigationBar />
      <Outlet />
    </Page>
  );
};
