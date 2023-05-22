import { Box, Button, Center, Group } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:7071";

export const Cameras = () => {
  const [cameras, setCameras] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${baseURL}/camera`);
        setCameras(res.data);
        setSelected(res.data[0].deviceId);
      } catch (e) {
        toast.error("Error retrieving cameras", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    })();
  }, []);

  if (!cameras.length) return null;

  return (
    <div>
      <h2>Cameras</h2>
      <Group position="center" my="xl">
        {cameras.map((camera) => (
          <Button
            key={camera.deviceId}
            variant={selected === camera.deviceId ? "filled" : "outline"}
            onClick={() => setSelected(camera.deviceId)}
          >
            <Center>
              <IconCamera size="24px" stroke={2} />
              <Box
                sx={() => ({
                  marginLeft: 2,
                })}
              >
                {camera.tags.name}
              </Box>
            </Center>
          </Button>
        ))}
      </Group>
    </div>
  );
};
