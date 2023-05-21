import styled from "@emotion/styled";

const Box = styled("div")({
  position: "absolute",
  border: "1px solid red",
});

const generateCss = (coordinates) => {
  const [x1, y1, x2, y2, x3, y3, x4, y4] = coordinates;

  const top = Math.min(y1, y2, y3, y4) + "px";
  const left = Math.min(x1, x2, x3, x4) + "px";
  const width = Math.abs(x3 - x1) + "px";
  const height = Math.abs(y3 - y1) + "px";

  return {
    top: top,
    left: left,
    width: width,
    height: height,
  };
};

export const DetectionBox = ({ coordinates }) => (
  <Box style={generateCss(coordinates)} />
);
