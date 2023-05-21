import { createStyles, Navbar, Group, getStylesRef } from "@mantine/core";
import {
  IconBellRinging,
  IconDashboard,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import styled from "@emotion/styled";

import KuvaLogo from "./KuvaLogo.png";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.dark[7],
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `2px solid ${theme.colors.dark[4]}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `2px solid ${theme.colors.dark[4]}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colors.dark[1],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colors.dark[6],
      color: theme.white,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.white,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.colors.dark[2],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "dark",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "dark", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "dark", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const Image = styled("img")({ width: "95%" });

export const NavigationBar = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Dashboard");

  return (
    <Navbar height="100%" width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Image src={KuvaLogo} alt="kuva-logo" />
        </Group>
        <a
          className={cx(classes.link, {
            [classes.linkActive]: "Dashboard" === active,
          })}
          href={""}
          key={"Dashboard"}
          onClick={(event) => {
            event.preventDefault();
            setActive("Dashboard");
          }}
        >
          <IconDashboard className={classes.linkIcon} stroke={1.5} />
          <span>{"Dashboard"}</span>
        </a>
        <a
          className={cx(classes.link, {
            [classes.linkActive]: "Notifications" === active,
          })}
          href={""}
          key={"Notifications"}
          onClick={(event) => {
            event.preventDefault();
            setActive("Notifications");
          }}
        >
          <IconBellRinging className={classes.linkIcon} stroke={1.5} />
          <span>{"Notifications"}</span>
        </a>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconUser className={classes.linkIcon} stroke={1.5} />
          <span>Account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>Settings</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};
