import { animus } from "@animus-ui/core";

export const IconButtonContainer = animus
  .styles({
    bg: "transparent",
    display: "flex",
    padding: "8px",
    justifyContent: "center",
    alignItems: "center",
    size: 32,
    border: "none",
    cursor: "pointer",
    transition: "100ms linear background-color",
    borderRadius: "25%",
    "&:hover": {
      bg: ({ mode }) =>
        mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
    },
  })
  .variant({
    prop: "sizeVariant",
    variants: {
      sm: {
        width: 20,
        height: 20,
        padding: "6px",
      },
      md: {
        width: 32,
        height: 32,
        padding: "8px",
      },
    },
  })
  .asComponent("button");

export const IconButton = ({ icon: Icon, size, ...props }) => {
  return (
    <IconButtonContainer sizeVariant={size} {...props}>
      <Icon />
    </IconButtonContainer>
  );
};
