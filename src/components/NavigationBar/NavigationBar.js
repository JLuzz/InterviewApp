import KuvaLogo from "./KuvaLogo.png";

export const NavigationBar = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "15%",
        backgroundColor: "#222222",
      }}
    >
      <img style={{ width: "95%" }} src={KuvaLogo} alt="kuva-logo" />
      <span style={{ marginTop: "30%", color: "white" }}> Home </span>
    </div>
  );
};
