import { useEffect, useState } from "react";
import axios from "axios";

import { EventViewer, NavigationBar } from "./components";

import "./App.css";

export const App = () => {
  const baseURL = "http://localhost:7071";
  const [images, setImages] = useState([]);

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
    <div
      className="App"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <NavigationBar />
      <EventViewer images={images} />
    </div>
  );
};
