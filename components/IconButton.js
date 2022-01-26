import { animus } from "@animus-ui/core";

export const IconButtonContainer = animus
  .styles({
    color: "text",
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
        size: 20,
        padding: "6px",
      },
      md: {
        size: 32,
        padding: "8px",
      },
      lg: {
        size: 48,
        padding: "12px",
      },
      xl: {
        size: 56,
        padding: "14px",
      },
    },
  })
  .states({
    bordered: { color: "text", border: "2px solid currentColor" },
    cta: {
      bg: "old-yellow",
      borderRadius: "50%",
      color: "background",
      transition: "transform ease-in 200ms",
      "&:hover": { bg: "old-yellow", transform: "scale(1.1)" },
    },
  })
  .asComponent("button");

export const IconButton = ({ icon: Icon, size, ...props }) => {
  return (
    <IconButtonContainer sizeVariant={size} {...props}>
      <Icon size={1} color="inherit" />
    </IconButtonContainer>
  );
};
