import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const App = ({ Component, pageProps }) => {
  const { asPath } = useRouter();
  const isRoom = asPath.startsWith("/room");

  return (
    <>
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
      <div className={asPath === "/" ? "dark" : ""}>
        {!isRoom && <Header />}
        <Component {...pageProps} />
        {!isRoom && <Footer />}
      </div>
    </>
  );
};

export default App;
