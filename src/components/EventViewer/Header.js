import { ActionIcon, createStyles, Checkbox } from "@mantine/core";
import { IconCaretLeft, IconCaretRight } from "@tabler/icons-react";
import { useEffect } from "react";

const useStyles = createStyles(() => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  headerItem: {
    display: "flex",
    gap: 5,
  },
  indexLabel: {
    minWidth: 50,
  },
}));

export const Header = ({
  index,
  toggle,
  handleToggle,
  next,
  previous,
  max,
  min,
}) => {
  const { classes } = useStyles();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        previous();
      } else if (event.key === "ArrowRight") {
        next();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [next, previous]);

  return (
    <div className={classes.header}>
      <div className={classes.headerItem}>
        <Checkbox
          id="detectionToggle"
          checked={toggle}
          onChange={handleToggle}
          size="sm"
        />
        <label htmlFor="detectionToggle">Show Detections Only</label>
      </div>
      <div>
        <div className={classes.headerItem}>
          <ActionIcon
            size={20}
            variant="transparent"
            onClick={previous}
            disabled={index === min}
            onMouseDown={(event) => event.preventDefault()}
          >
            <IconCaretLeft size="1rem" stroke={2} />
          </ActionIcon>
          <div className={classes.indexLabel}>
            {index + 1} / {max}
          </div>
          <ActionIcon
            size={20}
            variant="transparent"
            onClick={next}
            disabled={index === max - 1}
            onMouseDown={(event) => event.preventDefault()}
          >
            <IconCaretRight size="1rem" stroke={2} />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};
