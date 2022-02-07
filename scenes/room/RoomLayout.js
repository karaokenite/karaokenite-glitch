const { animus } = require("@animus-ui/core");

export const RoomLayout = animus
  .styles({
    display: "grid",
    minHeight: "100vh",
    maxHeight: "100vh",
    minWidth: "100vw",
    maxWidth: "100vw",
    size: 1,
    background:
      'url("https://cdn.glitch.com/aa3b905c-b152-45c7-9d6f-45c998461107%2Focean.gif?v=1632943857677") no-repeat center fixed',
    backgroundSize: "cover",
    overflow: "hidden",
    cols: 1,
    rows: "5rem:1:5rem",
    gap: 16,
  })

  .asComponent("div");

RoomLayout.Header = animus
  .styles({
    display: "grid",
    cols: "1:2:1",
    px: "2rem",
    justifyContent: "space-between",
  })
  .asComponent("header");

RoomLayout.Main = animus
  .styles({
    display: "grid",
    cols: 1,
    rows: "5:1",
    maxHeight: "calc(100vh - 12rem)",
    position: "relative",
  })
  .asComponent("main");

RoomLayout.Footer = animus
  .styles({
    display: "grid",
    bg: "jet",
    position: "relative",
    alignAll: "center",
    p: { _: 0, sm: "8px" },
    cols: { _: 1, sm: 3 },
  })
  .asComponent("footer");
