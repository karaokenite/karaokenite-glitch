import { animus } from "@animus-ui/core";

export const Button = animus
  .styles({
    border: "3px solid currentColor",
    borderRadius: "12px",
    color: "secondary",
    display: "inline-flex",
    cursor: "pointer",
    fontWeight: 600,
    px: "1rem",
    py: "0.5rem",
    bg: "transparent",
    alignItems: "center",
    justifyContent: "center",
    transition: "200ms linear background-color",
    fontSize: "20px",
    "&:hover": {
      bg: ({ mode }) =>
        mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
    },
  })
  .variant({
    variants: {
      cta: {
        bg: "#f7ff57",
        color: "jet",
        width: "max-content",
        "&:hover": {
          bg: "toxic-avenger",
        },
      },
    },
  })
  .variant({
    prop: "size",
    variants: {
      small: {
        fontSize: "16px",
        borderWidth: "2px",
        borderRadius: "8px",
        px: "0.5rem",
        py: "0.25rem",
      },
    },
  })
  .states({
    rounded: {
      borderRadius: "40px",
    },
  })
  .groups({ layout: true, borders: true })
  .asComponent("button");
