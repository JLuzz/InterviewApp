import { MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";

import { EventViewer, NavigationBar } from "./components";

const Page = styled("div")({
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
});

export const App = () => {
  const [images, setImages] = useState([]);

  const baseURL = "http://localhost:7071";

  //TODO: API functions (more to be added) should be in their own file!
  const getEvents = () => {
    axios
      .get(`${baseURL}/events`)
      .then(function (response) {
        setImages(response.data.scanResults);
        console.log(response);
      })
      .catch(function (error) {
        //TODO: this should display an error in the UI!
        console.log(error);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
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
      <Page>
        <NavigationBar />
        <EventViewer images={images} />
      </Page>
    </MantineProvider>
  );
};
