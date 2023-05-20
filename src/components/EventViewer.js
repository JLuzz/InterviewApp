import { createUseStyles } from "react-jss";
import { useCallback, useEffect, useState } from "react";
import { Progress } from "@mantine/core";

const useStyles = createUseStyles({
  layout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: "24px",
    width: "85%",
    height: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  indexTracker: {
    display: "flex",
    gap: 5,
  },
});

export const EventViewer = ({ images }) => {
  const classes = useStyles();
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
        <div className={classes.header}>
          <div>
            <input
              type="checkbox"
              id="detectionToggle"
              checked={detectionOnly}
              onChange={handleDetectionToggle}
            />
            <label htmlFor="detectionToggle">Show Detections Only</label>
          </div>
          <div className={classes.indexTracker}>
            <div>
              {currentImageIndex + 1} / {filteredImages.length}
            </div>
            <div>
              <button onClick={handlePreviousImage}>&lt;</button>
              <button onClick={handleNextImage}>&gt;</button>
            </div>
          </div>
        </div>
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
