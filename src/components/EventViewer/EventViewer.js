import { createStyles } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchImages } from "../../features/events/events-slice";

import { Cameras } from "./Cameras";
import { Header } from "./Header";
import { Metadata } from "./Metadata";
import { Viewport } from "./Viewport";

const useStyles = createStyles(() => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "85%",
    height: "100%",
  },
}));

export const EventViewer = () => {
  const { classes } = useStyles();
  const { images, status } = useSelector(({ events }) => events);
  const dispatch = useDispatch();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState(images);

  const handleNextImage = useCallback(
    () =>
      setCurrentImageIndex((currentImageIndex) =>
        Math.min(currentImageIndex + 1, filteredImages.length - 1)
      ),
    [filteredImages.length]
  );
  const handlePreviousImage = useCallback(
    () =>
      setCurrentImageIndex((currentImageIndex) =>
        Math.max(currentImageIndex - 1, 0)
      ),
    []
  );

  const handleDetectionToggle = (checked) => {
    setCurrentImageIndex(0);

    if (checked) {
      setFilteredImages(
        images.filter((image) => image.detectionsList.length > 0)
      );
      return;
    }

    setFilteredImages(images);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchImages());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setCurrentImageIndex(0);
    setFilteredImages(images);
  }, [images]);

  if (!images.length) {
    return <div>No Images Found</div>;
  }

  if (!filteredImages.length) {
    return <div>No Gas Detections Found</div>;
  }

  return (
    <div className={classes.layout}>
      <div>
        <Header
          handleToggle={handleDetectionToggle}
          next={handleNextImage}
          previous={handlePreviousImage}
          index={currentImageIndex}
          min={0}
          max={filteredImages.length}
        />
        <Viewport images={filteredImages} index={currentImageIndex} />
        <Metadata metadata={filteredImages[currentImageIndex]} />
      </div>
      <Cameras />
    </div>
  );
};
