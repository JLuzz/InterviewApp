import { Avatar, Text, Button, Paper } from "@mantine/core";
import styled from "@emotion/styled";

const Container = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
});

export const UserCard = ({
  avatar = "https://jeremyluzzi.io/static/media/jeremy-luzzi.a5cd3b79d26701bc6884.png",
  name = "Jeremy",
  email = "jeremyluzzidev@gmail.com",
  job = "Software Engineer",
}) => {
  return (
    <Container>
      <Paper
        radius="md"
        withBorder
        p="lg"
        shadow="xl"
        sx={(theme) => ({
          backgroundColor: theme.colors.dark[7],
          color: theme.colors.dark[1],
        })}
      >
        <Avatar src={avatar} size={120} radius={120} mx="auto" />
        <Text ta="center" fz="lg" weight={500} mt="md">
          {name}
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          {email} • {job}
        </Text>

        <Button fullWidth mt="md">
          Buy Coffee
        </Button>
      </Paper>
    </Container>
  );
};
