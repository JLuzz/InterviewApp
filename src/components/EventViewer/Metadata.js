import { Progress } from "@mantine/core";
import styled from "@emotion/styled";

const ConfidenceBar = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export const Metadata = ({ metadata }) => {
  const { createdOn, noiseFloorMetric, detectionsList, overallConf } = metadata;

  return (
    <>
      {createdOn && (
        <div>{`Scan Timestamp: ${new Date(createdOn).toLocaleString()}`}</div>
      )}
      <div>{`Noise floor metric: ${Math.floor(noiseFloorMetric)}`}</div>
      <div>{` Number of Detections: ${detectionsList.length}`}</div>
      <div>
        <ConfidenceBar>
          <div>Confidence</div>
          <div>{`${
            overallConf > 0 ? Math.floor(overallConf) + "%" : "N/A"
          }`}</div>
        </ConfidenceBar>
        <Progress value={overallConf} />
      </div>
    </>
  );
};
