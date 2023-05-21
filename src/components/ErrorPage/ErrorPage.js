import {
  Button,
  createStyles,
  Container,
  Group,
  Title,
  rem,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Illustration } from "./Illustration";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  button: {
    backgroundColor: theme.primaryColor,
  },

  inner: {
    position: "relative",
  },

  image: {
    ...theme.fn.cover(),
    opacity: 0.75,
  },

  content: {
    paddingTop: rem(220),
    position: "relative",
    zIndex: 1,

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },
}));

export const ErrorPage = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
        </div>
      </div>
      <Group position="center">
        <Link to="/">
          <Button size="md" className={classes.button}>
            Take me back to home page
          </Button>
        </Link>
      </Group>
    </Container>
  );
};
