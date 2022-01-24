import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AnimusProvider, Box } from "@animus-ui/components";
import { createTheme } from "@animus-ui/theming";
import { compatTheme } from "@animus-ui/core";
import { AppProvider } from "../components/AppProvider";

const theme = createTheme(compatTheme)
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

const App = ({ Component, pageProps }) => {
  const { asPath } = useRouter();
  const isRoom = asPath.startsWith("/room");

  return (
    <AnimusProvider
      theme={theme}
      useCache={false}
      mode={asPath === "/" ? "dark" : "light"}
    >
      <AppProvider>
        <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <title>Karaoke Nite (Beta)</title>

          <meta property="og:url" content="https://www.karaokenite.co" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Karaoke Nite (Beta)" />
          <meta
            property="og:description"
            content="Karaoke with friends on the web. Brand new quarantine pastime. Currently in Beta!"
          />
          <meta
            property="og:image"
            content="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Ftwitter.png?v=1596924787474"
          />

          <meta
            name="description"
            content="Karaoke with friends on the web. Brand new quarantine pastime. Currently in Beta!"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@karaoke_nite" />
          <meta name="twitter:title" content="Karaoke Nite (Beta)" />
          <meta
            name="twitter:description"
            content="Karaoke with friends on the web. Brand new quarantine pastime. Currently in Beta!"
          />
          <meta
            name="twitter:image"
            content="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Flogo.png?v=1597293918060"
          />
          <meta
            name="twitter:image:alt"
            content="Karaoke with friends on the web."
          />
          <link
            rel="icon"
            href="https://cdn.glitch.global/aa3b905c-b152-45c7-9d6f-45c998461107/4.%20Favicon%20Box%20-%20Music.svg?v=1641407145047"
          />

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          />

          <link
            href="https://fonts.googleapis.com/css?family=Space+Mono:400,700"
            rel="stylesheet"
          />
          <link href="/styles/vendor.css" rel="stylesheet" type="text/css" />
          <link href="/styles/shared.css" rel="stylesheet" type="text/css" />
          <link
            href={`/styles/${
              asPath === "/" ? "index" : asPath.replace("/", "")
            }.css`}
            rel="stylesheet"
            type="text/css"
          />
        </Head>
        <Box bg="background">
          {!isRoom && <Header />}
          <Component {...pageProps} />
          {!isRoom && <Footer />}
        </Box>
      </AppProvider>
    </AnimusProvider>
  );
};

export default App;
