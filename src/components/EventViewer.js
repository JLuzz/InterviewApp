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
  }, [handleNextImage, handlePreviousImage, images.length]);

  if (!images.length) {
    return null;
  }

  return (
    <div className={classes.layout}>
      <button type="button" onClick={handlePreviousImage}>
        Previous Image
      </button>
      <div>
        <div className={classes.header}>
          <div> {images.length} total images </div>
          <div> Current Image: {currentImageIndex + 1} </div>
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
  );
};
