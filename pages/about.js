import { Text, Box, FlexBox, Image } from "@animus-ui/components";

const Divider = () =>  (
  <Box
    as="hr"
    width={.3}
    height={5}
    bg="deep-blue-something"
    borderRadius="10px"
    width="30%"
    mx="auto"
    mb="var(--page-padding)"
  />
);

const About = () => (
  <main className="layout layout__small layout-grid">
    <section className="layout-grid">
      <article>
        <Text
          as="h1"
          color="var(--color-deep-blue-something)"
          fontSize="2.8em"
          textAlign="center"
          fontWeight="var(--weight-heavy)"
          mb="0.67em"
        >
          Karaoke Nite is a social app. Our north star is to create the next-gen{' '}
          <span className="orange">h</span>
          <span className="pink__light">o</span>
          <span className="pink">u</span>
          <span className="pink__dark">s</span>
          <span className="green">e</span>{' '}
          <span className="orange">p</span>
          <span className="yellow__light">a</span>
          <span className="green__light">r</span>
          <span className="teal">t</span>
          <span className="pink">y</span>.
        </Text>

        <Divider />

        <Text
          as="p"
          textAlign="center"
          color="var(--color-frozen-blueberry)"
          fontSize="var(--font-size-md)"
          fontWeight="400"
          mb="1rem"
        >
          At Karaoke Nite, we believe that singing with friends is way more fun
          than humming by yourself in the shower and on a mobile app.
        </Text>
        <Text
          as="p"
          textAlign="center"
          color="var(--color-frozen-blueberry)"
          fontSize="var(--font-size-md)"
          fontWeight="400"
          mb="1rem"
        >
          Whether you are getting silly together because of a bday or
          heartbreak, happy hour or a casual hang, you are gonna have
          a good time.
        </Text>
      </article>

      <FlexBox
        inline wrap
        justifyContent="center"
        gap="10px"
      >
        <Box
          textAlign="center"
          width="25%"
        >
          <Image
            width="150px"
            borderRadius="50%"
            border="3px solid var(--color-midnight)"
            src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Fsonny.png?v=1596248195534"
            alt="@sonnynomnom"
          />
          <a
            className="link"
            href="https://twitter.com/sonnynomnom"
            target="_blank"
          >
            <div className="memberlabel">@sonnynomnom</div>
          </a>
        </Box>
        <Box
          textAlign="center"
          width="25%"
        >
          <Image
            width="150px"
            borderRadius="50%"
            border="3px solid var(--color-midnight)"
            src="https://cdn.glitch.me/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9/52927224.png?v=1640028013545"
            alt="@airrobb"
          />
          <a
            className="link"
            href="https://www.linkedin.com/in/airrobb"
            target="_blank"
          >
            <div className="memberlabel">@airrobb</div>
          </a>
        </Box>
        <Box
          textAlign="center"
          width="25%"
        >
          <Image
            width="150px"
            borderRadius="50%"
            border="3px solid var(--color-midnight)"
            src="https://cdn.glitch.me/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9/27750827_10155405174043723_5026593950977093526_n.jpg?v=1640028048589"
            alt="@guyenster"
          />
          <a
            className="link"
            href="https://www.linkedin.com/in/guyendinh"
            target="_blank"
          >
            <div className="memberlabel">@guyenster</div>
          </a>
        </Box>
      </FlexBox>

      <article>
        <h2 className="page-subtitle">Beta v2.1</h2>

        <p>
          We are a small team of friends based in Brooklyn, building Karaoke
          Nite part-time on nights and weekends. We want to make house parties
          cool again.
        </p>

        <p>
          This is currently a Beta version of the app. We have a ton of features
          and goodies coming soon so stay tuned. In the meantime, please help us
          make the experience better by answering a quick{' '}
          <a
            className="link"
            href="https://karaokenite.typeform.com/to/SaHxnvyT"
            target="_blank"
          >
            feedback survey
          </a>
          . It'd be much appreciated.
        </p>

        <p>
          Karaoke Nite is also open-sourced. If you are a programmer, designer,
          3d modeler, or game artist, you can find the project on{' '}
          <a
            className="link"
            href="https://github.com/karaokenite"
            target="_blank"
          >
            GitHub
          </a>
          .
        </p>
      </article>

      <article>
        <h2 className="page-subtitle">Record Labels & Artists</h2>
        <p>
          If you are a indie record label or band/artist that's interested in
          having your music videos or lyric videos be featured in the app,
          please let us know via{' '}
          <a className="link" href="mailto: sonnynomnom@gmail.com">
            email
          </a>
          . We would love to have you!
        </p>
      </article>
      <article>
        <h2 className="page-subtitle">Legal</h2>

        <p>
          The Beta was launched in 2021 with 50 karaoke soundtracks featured in
          the app. All soundtracks have been lawfully purchased (proof of
          purchase can be requested). If people enjoy the app and want to see it
          continue to grow, we will work with a copyright lawyer to purchase
          more licenses and add music videos to our collection.
        </p>

        <p>
          Privacy Policy can be found{' '}
          <a
            className="link"
            href="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2FPrivacy%20Policy%20v1.pdf?v=1616300368184"
            target="_blank"
          >
            here
          </a>
          .
        </p>
      </article>
    </section>
    <section>
      <blockquote>
        "Just might want to warn your roommate first." Product Hunt
      </blockquote>
    </section>
  </main>
);

export default About;
