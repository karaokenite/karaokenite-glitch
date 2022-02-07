import { compatTheme } from "@animus-ui/core";
import { createTheme } from "@animus-ui/theming";

export const theme = createTheme(compatTheme)
  .addColors({
    linen: "#ffffff",
    "cloud-nine": "#f1f1f1",
    sail: "#f7f7f7",
    "dirty-linen": "#eeeeee",
    alabaster: "#dad8de",
    "old-laundry": "#cccccc",
    smoke: "#555555",
    industry: "#444444",
    machine: "#333333",
    jet: "#000000",
    "frozen-blueberry": "#8193b2",
    slate: "#5e6c76",
    seafloor: "#070548",
    "deep-blue-something": "#0c0a57",
    midnight: "#050422",
    peach: "#ffb48e",
    tang: "#ff8647",
    "pink-well": "#df73ff",
    magentleman: "#c202fb",
    valentines: "#ff93ad",
    "pretty-in-pink": "#fe3466",
    "red-hots": "#b61f44",
    "toxic-avenger": "#d6ffa6",
    slurm: "#93d4a8",
    freon: "#5cdc89",
    "moray-teal": "#51e8e4",
    "neon-demon": "#efff9e",
    bananarama: "#f4ca2c",
    "old-yellow": "#c8ef00",
    "even-older-yellow": "#9cb931",
    "opaque-white": "rgba(255, 255, 255, 0.3)",
    "opaque-black": "rgba(0, 0, 0, 0.1)",
  })
  .addColorModes("light", {
    light: {
      text: {
        _: "midnight",
      },
      background: {
        _: "linen",
        current: "linen",
      },
      primary: {
        _: "peach",
      },
      secondary: {
        _: "midnight",
      },
      tertiary: {
        _: "opaque-black",
      },
      scrollbar: "alabaster",
    },
    dark: {
      text: {
        _: "linen",
      },
      background: {
        _: "midnight",
        current: "midnight",
      },
      primary: {
        _: "peach",
      },
      secondary: {
        _: "linen",
      },
      tertiary: {
        _: "opaque-black",
      },
      scrollbar: "opaque-black",
    },
  })
  .build();
