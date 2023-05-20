import { useCallback, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";

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

  // TODO : handle returns with appropriate messages
  if (!images.length) {
    return null;
  }

  if (!filteredImages.length) {
    return;
  }

  return (
    <div className={classes.layout}>
      <button type="button" onClick={handlePreviousImage}>
        Previous Image
      </button>
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
          <div>
            {currentImageIndex + 1} / {filteredImages.length}
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
        {!!filteredImages[currentImageIndex]?.overallConf && (
          <div>
            {`Confidence: ${Math.floor(
              filteredImages[currentImageIndex].overallConf
            )} %`}
          </div>
        )}
      </div>
      <button type="button" onClick={handleNextImage}>
        Next Image
      </button>
    </div>
  );
};
