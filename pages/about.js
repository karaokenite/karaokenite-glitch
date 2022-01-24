const About = () => (
  <main class="layout layout__small layout-grid">
    <section class="layout-grid">
      <article>
        <h1 class="page-title">
          Karaoke Nite is a social app. Our north star is to create the next-gen
          <span class="orange">h</span>
          <span class="pink__light">o</span>
          <span class="pink">u</span>
          <span class="pink__dark">s</span>
          <span class="green">e</span>
          <span class="orange">p</span>
          <span class="yellow__light">a</span>
          <span class="green__light">r</span>
          <span class="teal">t</span>
          <span class="pink">y</span>.
        </h1>

        <hr class="fancyLine" />

        <p class="description">
          At Karaoke Nite, we believe that singing with friends is way more fun
          than humming by yourself in the shower and on a mobile app.
        </p>

        <p class="description">
          Whether you are getting silly together because of a birthday or
          heartbreak, happy hour or a casual hang, we are here to help you have
          a good time.
        </p>
      </article>

      <div id="members" class="member-list">
        <div class="member-item">
          <img
            class="member-avatar"
            src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Fsonny.png?v=1596248195534"
            alt="@sonnynomnom<"
          />
          <a
            class="link"
            href="https://twitter.com/sonnynomnom"
            target="_blank"
          >
            <div class="memberlabel">@sonnynomnom</div>
          </a>
        </div>
        <div class="member-item">
          <img
            class="member-avatar"
            src="https://cdn.glitch.me/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9/52927224.png?v=1640028013545"
            alt="@airrobb"
          />
          <a
            class="link"
            href="https://linkedin.com/in/airrobb"
            target="_blank"
          >
            <div class="memberlabel">@airrobb</div>
          </a>
        </div>
        <div class="member-item">
          <img
            class="member-avatar"
            src="https://cdn.glitch.me/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9/27750827_10155405174043723_5026593950977093526_n.jpg?v=1640028048589"
            alt="@guyenster"
          />
          <a class="link" href="https://twitter.com/guyenster" target="_blank">
            <div class="memberlabel">@guyenster</div>
          </a>
        </div>
      </div>

      <article>
        <h2 class="page-subtitle">Beta v2.0</h2>

        <p>
          We are a small team of friends based in Brooklyn, building Karaoke
          Nite part-time on nights and weekends. We want to make house parties
          cool again.
        </p>

        <p>
          This is currently a Beta version of the app. We have a ton of features
          and goodies coming soon so stay tuned. In the meantime, please help us
          make the experience better by answering a quick
          <a
            class="link"
            href="https://karaokenite.typeform.com/to/SaHxnvyT"
            target="_blank"
          >
            feedback survey
          </a>
          . It'd be much appreciated.
        </p>

        <p>
          Karaoke Nite is also open-sourced. If you are a programmer, designer,
          3d modeler, or game artist, you can find the project on
          <a class="link" href="https://github.com/karaokenite" target="_blank">
            GitHub
          </a>
          .
        </p>
      </article>

      <article>
        <h2 class="page-subtitle">Record Labels & Artists</h2>
        <p>
          If you are a indie record label or band/artist that's interested in
          having your music videos or lyric videos be featured in the app,
          please let us know via
          <a class="link" href="mailto: sonnynomnom@gmail.com">
            email
          </a>
          . We would love to have you!
        </p>
      </article>
      <article>
        <h2 class="page-subtitle">Legal</h2>

        <p>
          The Beta was launched in 2021 with 50 karaoke soundtracks featured in
          the app. All soundtracks have been lawfully purchased (proof of
          purchase can be requested). If people enjoy the app and want to see it
          continue to grow, we will work with a copyright lawyer to purchase
          more licenses and add music videos to our collection.
        </p>

        <p>
          Privacy Policy can be found
          <a
            class="link"
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
