import { Box } from "@animus-ui/components";
import { useRouter } from "next/router";
import { useState } from "react";

const Index = () => {
  const [values, setValues] = useState({ username: "", room: "" });
  const { push } = useRouter();
  return (
    <main className="layout layout__fluid">
      <Box
        as="section"
        position="relative"
        height={{
          _: "calc(540px - var(--header-height))",
          sm: "calc(720px - var(--header-height))",
          md: "calc(540px - var(--header-height))",
        }}
      >
        <div className="hero-bg"></div>
        <div className="section--content join-container hero--content">
          <div className="join-callout">
            <div className="hero-imageFrame">
              <img
                alt=""
                className="hero-bg-img star1 floating floating--short"
                src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Fstar1.png?v=1591917657267"
              />
              <img
                alt=""
                className="hero-bg-img star2 floating floating--long"
                src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Fstar2.png?v=1591917657953"
              />
              <img
                alt=""
                className="hero-bg-img star4 floating floating--short"
                src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Fstar4.png?v=1596993367347"
              />
              <img
                alt=""
                className="hero-bg-img star3 floating floating--long"
                src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Fstar3.png?v=1591917657757"
              />
              <img
                alt=""
                className="hero-bg-img star5 floating floating--long"
                src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Fstar5.png?v=1591917657427"
              />
              <img
                alt=""
                className="hero-bg-img mic"
                src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Fmicrophone.png?v=1591917657878"
              />
              <img
                className="join-image"
                alt="Karaoke Nite"
                src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Flogo.svg?v=1595981204360"
                id="hero-logo"
              />
            </div>
            <p className="hero-tagline">
              Brand new way to house party with friends!
            </p>
          </div>
          <div className="join-form" id="now">
            <h2 className="page-subtitle text__center">JOIN A ROOM (FREE)</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                push(`/room?${new URLSearchParams(values).toString()}`);
              }}
            >
              <div>
                <input
                  value={values.id}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, id: e.target.value }))
                  }
                  className="input"
                  id="room"
                  name="room"
                  placeholder="Create a room name"
                  type="text"
                  required
                />
              </div>
              <div>
                <input
                  value={values.username}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, username: e.target.value }))
                  }
                  className="input"
                  id="username"
                  name="username"
                  placeholder="Create a username"
                  type="text"
                  required
                />
              </div>
              <input
                className="input button button-bold"
                type="submit"
                value="Enter Room"
              />
            </form>
          </div>
        </div>
      </Box>

      <section id="options" className="options-container">
        <div className="options-diagonal">
          <div className="section--content options-content section__wide">
            <h2 className="page-subtitle text__center options-title">
              Karaoke with your friends...
            </h2>
            <div className="options-grid">
              <div className="options--visual">
                <img
                  alt="Placeholder2"
                  id="browser"
                  src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2FLaptop.svg?v=1591917657224"
                />
                <label
                  for="browser"
                  className="text__center options--description"
                >
                  In the browser
                </label>
              </div>
              <span className="options--or">OR</span>
              <div className="options--visual">
                <img
                  alt="Placeholder3"
                  id="headset"
                  src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Fphone-edit.svg?v=1632205349447"
                />
                <label
                  for="headset"
                  className="text__center options--description"
                >
                  With a phone (Coming Soon)
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="diagonal-bg--mobile diagonal-bg--mobile-bottom"></div>
      </section>

      <section id="steps" className="section--content">
        <div className="video-mask">
          <video autoplay muted loop playsinline>
            <source
              src="https://cdn.glitch.global/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9/optimized720.mp4?v=1642565314659"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <h2
          className="page-subtitle text__center"
          style={{ marginTop: "2rem" }}
        >
          How it works:
        </h2>
        <ol className="steps layout-grid layout-grid__sm">
          <li className="steps-step">
            <div className="steps--visual">
              <img
                id="create-a-room"
                src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2FRoom.svg?v=1591917657658"
              />
            </div>
            <div className="flex flex__centered">
              <p className="steps-description">
                <label className="steps--label yellow" for="create-a-room">
                  Create a room
                </label>
                Make your own private karaoke room (but bring your own drinks
                and snacks!)
              </p>
            </div>
          </li>
          <li className="steps-step">
            <div className="steps--visual">
              <img
                id="invite-friends"
                src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2FFriends.svg?v=1591917657149"
              />
            </div>
            <div className="flex flex__centered">
              <p className="steps-description">
                <label className="steps--label magenta" for="invite-friends">
                  Invite friends
                </label>
                Share the room 🔑 with your friends so they can join the party!
              </p>
            </div>
          </li>
          <li className="steps-step">
            <div className="steps--visual">
              <img
                id="sing-together"
                src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2FSing.svg?v=1591917657376"
              />
            </div>
            <div className="flex flex__centered">
              <p className="steps-description">
                <label className="steps--label pink__dark" for="sing-together">
                  Have a good time
                </label>
                Choose from a collection of hit songs and sing with your friends
                in real-time!
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section id="recap" className="recap light">
        <div className="section--content recap-contents">
          <p className="recap-description text__center">
            Looking for something to do with friends during quarantine?
          </p>
          <p className="recap-description text__center">Have a Karaoke Nite!</p>
          <a className="recap-link button" href="#top">
            Create a Room
          </a>
        </div>
      </section>

      <section id="newsletter" className="newsletter section--content">
        <h2 className="page-subtitle text__center">Keep up with the party!</h2>
        <p className="newsletter--description">
          Join our newsletter to get Karaoke Nite updates from our team.
        </p>

        <form
          className="copyWrapper"
          action="https://karaokenite.us17.list-manage.com/subscribe/post"
          method="POST"
        >
          <input type="hidden" name="u" value="998b28b4763f0038b456eece0" />
          <input type="hidden" name="id" value="649cfa059e" />
          <input
            type="email"
            placeholder="your@email.here"
            name="MERGE0"
            id="myInput"
            required
          />
          <div className="tooltip">
            <button
              className="button button-bold"
              id="copy"
              onClick="myFunction()"
              onMouseOut="outFunc()"
            >
              Subscribe
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Index;
