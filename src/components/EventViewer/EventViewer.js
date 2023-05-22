import { createStyles } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchImages,
  setFilter,
  selectFilteredImages,
} from "../../features/events/events-slice";

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
  const { status } = useSelector((state) => state.events);
  const images = useSelector(selectFilteredImages);
  const dispatch = useDispatch();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = useCallback(
    () =>
      setCurrentImageIndex((currentImageIndex) =>
        Math.min(currentImageIndex + 1, images.length - 1)
      ),
    [images.length]
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
    dispatch(setFilter(checked));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchImages());
    }
  }, [status, dispatch]);

  if (!images.length) {
    return <div>No Images Found</div>;
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
          max={images.length}
        />
        <Viewport images={images} index={currentImageIndex} />
        <Metadata metadata={images[currentImageIndex]} />
      </div>
      <Cameras />
    </div>
  );
};
