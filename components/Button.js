import { animus } from "@animus-ui/core";

export const Button = animus
  .styles({
    border: "2px solid currentColor",
    borderRadius: "12px",
    color: "secondary",
    display: "inline-flex",
    cursor: "pointer",
    fontWeight: 600,
    px: "1rem",
    py: "0.5rem",
    bg: "transparent",
    alignItems: "center",
    "&:hover": {
      bg: ({ mode }) =>
        mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
    },
  })
  .asComponent("button");
