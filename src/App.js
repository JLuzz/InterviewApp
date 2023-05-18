import "./App.css";

import { useEffect, useState } from "react";
import NavigationBar from "./pages/NavigationBar";
import axios from "axios";

export const App = () => {
  const baseURL = "http://localhost:7071";
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () =>
    setCurrentImageIndex(Math.min(currentImageIndex + 1, images.length - 1));
  const handlePreviousImage = () =>
    setCurrentImageIndex(Math.max(currentImageIndex - 1, 0));

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
    //TODO: This code should be factored out into multiple files
    <div
      className="App"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <NavigationBar />
      {/* TODO : extract this component */}
      <div
        // TODO: Styles can be defined in a seperate file using mui useStyle
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          width: "85%",
          height: "100%",
        }}
      >
        <button type="button" onClick={handlePreviousImage}>
          Previous Image
        </button>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div> {images.length} total images </div>
            <div> Index: {currentImageIndex} </div>
          </div>
          {images.length > 0 && (
            <img src={images[currentImageIndex].jpg} alt="current-scan" />
          )}
          {images[currentImageIndex]?.createdOn && (
            <div> Scan Timestamp: {images[currentImageIndex].createdOn} </div>
          )}
          {/* TODO: Finish adding image metadata!  */}
          <div> Image Metadata: INCOMPLETE </div>
          <div> Number of Detections: INCOMPLETE </div>
        </div>
        <button type="button" onClick={handleNextImage}>
          Next Image
        </button>
      </div>
    </div>
  );
};
