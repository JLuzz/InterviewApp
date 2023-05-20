import { createStyles, Progress } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

import { Header } from "./Header";

const useStyles = createStyles(() => ({
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "85%",
    height: "100%",
  },
  confidenceBar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const EventViewer = ({ images }) => {
  const { classes } = useStyles();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [detectionOnly, setDetectionOnly] = useState(false);
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

  const handleDetectionToggle = (event) => {
    setDetectionOnly(event.target.checked);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handlePreviousImage();
      } else if (event.key === "ArrowRight") {
        handleNextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextImage, handlePreviousImage]);

  useEffect(() => {
    setCurrentImageIndex(0);

    if (detectionOnly) {
      setFilteredImages(
        images.filter((image) => image.detectionsList.length > 0)
      );
      return;
    }

    setFilteredImages(images);
  }, [images, detectionOnly]);

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
          toggle={detectionOnly}
          handleToggle={handleDetectionToggle}
          next={handleNextImage}
          previous={handlePreviousImage}
          index={currentImageIndex}
          min={0}
          max={filteredImages.length}
        />
        {filteredImages.length > 0 && (
          <img src={filteredImages[currentImageIndex].jpg} alt="current-scan" />
        )}
        {filteredImages[currentImageIndex]?.createdOn && (
          <div>
            {`Scan Timestamp: ${new Date(
              filteredImages[currentImageIndex].createdOn
            ).toLocaleString()}`}
          </div>
        )}
        <div>
          {`Noise floor metric: ${Math.floor(
            filteredImages[currentImageIndex].noiseFloorMetric
          )}`}
        </div>
        <div>
          {` Number of Detections: ${filteredImages[currentImageIndex].detectionsList.length}`}
        </div>
        <div>
          <div className={classes.confidenceBar}>
            <div>Confidence</div>
            <div>{`${
              filteredImages[currentImageIndex].overallConf > 0
                ? Math.floor(filteredImages[currentImageIndex].overallConf) +
                  "%"
                : "N/A"
            }`}</div>
          </div>
          <Progress value={filteredImages[currentImageIndex].overallConf} />
        </div>
      </div>
    </div>
  );
};
