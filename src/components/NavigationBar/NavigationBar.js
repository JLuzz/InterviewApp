import styled from "@emotion/styled";

import KuvaLogo from "./KuvaLogo.png";

const Nav = styled("div")({
  height: "100%",
  width: "15%",
  backgroundColor: "#222222",
});
const Image = styled("img")({ width: "95%" });
const Text = styled("span")({ marginTop: "30%", color: "white" });

export const NavigationBar = () => {
  return (
    <Nav>
      <Image src={KuvaLogo} alt="kuva-logo" />
      <Text> Home </Text>
    </Nav>
  );
};
