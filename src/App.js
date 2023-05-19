import { styled } from "react-jss";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <Page>
      <NavigationBar />
      <EventViewer images={images} />
    </Page>
  );
};
