import styled from "@emotion/styled";

import { DetectionBox } from "./DetectionBox";

const Container = styled("div")({
  position: "relative",
});

export const Viewport = ({ images, index }) => (
  <Container>
    {images[index].detectionsList.map(({ roicoordsList }, i) => (
      <DetectionBox key={i} coordinates={roicoordsList} />
    ))}
    <img src={images[index].jpg} alt="current-scan" />
  </Container>
);
