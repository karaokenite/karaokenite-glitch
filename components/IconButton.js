import { animus } from "@animus-ui/core";

export const IconButton = animus
  .styles({
    bg: "transparent",
    display: "flex",
    padding: "8px",
    justifyContent: "center",
    alignItems: "center",
    size: 32,
    border: "none",
    cursor: "pointer",
    transition: "100ms ease-in-out background-color",
    borderRadius: "25%",
    "&:hover": {
      bg: ({ mode }) =>
        mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
    },
  })
  .asComponent("button");
