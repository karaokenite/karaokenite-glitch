import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AnimusProvider, Box, ColorMode } from "@animus-ui/components";
import { AppProvider } from "../components/AppProvider";
import { RecoilRoot } from "recoil";
import { theme } from "../theme";
import { Social } from "../components/Social";

const App = ({ Component, pageProps }) => {
  const { pathname } = useRouter();
  const isRoom = pathname.startsWith("/room");
  const mode = pathname === "/" || isRoom ? "dark" : "light";

  return (
    <RecoilRoot>
      <AnimusProvider theme={theme} useCache={false}>
        <AppProvider>
          <Head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>Karaoke Nite (Beta)</title>
            <Social />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Space+Mono:400,600,700"
              rel="stylesheet"
            />
            <link href="/styles/shared.css" rel="stylesheet" type="text/css" />
            {!pathname.includes("room") ? (
              <link
                href={`/styles/${
                  pathname === "/" ? "index" : pathname.replace("/", "")
                }.css`}
                rel="stylesheet"
                type="text/css"
              />
            ) : null}
          </Head>
          <ColorMode mode={mode} position="relative" overflow="hidden">
            {!isRoom && <Header />}
            <Component {...pageProps} />
            {!isRoom && <Footer />}
          </ColorMode>
        </AppProvider>
      </AnimusProvider>
    </RecoilRoot>
  );
};

export default App;
