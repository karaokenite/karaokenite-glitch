import Head from "next/head";
import { useState } from "react";
import { animus, Box, Text } from "@animus-ui/components";

const Collapsible = animus
  .styles({
    p: 18,
    width: '{1}',
    backgroundColor: "var(--color-dirty-linen)",
    color: "var(--color-industry)",
    border: "none",
    textAlign: "left",
    outline: "none",
    fontSize: 'var(--font-size-md)',
    fontFamily: 'var(--font-brand)',
    fontWeight: 'var(--weight-title)',
    borderRadius: '10px',
    '&:hover': {
      cursor: "pointer",
      backgroundColor: "var(--color-old-laundry)"
    },
    '&:after': {
      content: '"+"',
      color: "var(--color-linen)",
      fontWeight: "var(--weight-heavy)",
      float: "right",
      ml: "5"
    }
  })
  .states({
    active: {
      '&:after': {
        content: '"-"',
      }
    },
  })
  .groups({
    space: true,
  })
  .asComponent("button");

const FAQ = () => {
  const [openAreas, setOpenAreas] = useState({});
  return (
    <main className="layout layout__small layout-grid layout-grid__sm">
      <h1 className="page-subtitle">💬 Frequently Asked Questions</h1>
      <section className="layout-grid layout-grid__sm collapse">
        <div className="collapse-area">
          <Collapsible
            as="button" active={!!openAreas.mic}
            onClick={() => setOpenAreas((prev) => ({ ...prev, mic: !prev?.mic }))}
          >
            Do I need a microphone for Karaoke Nite?
          </Collapsible>

          <Box
            p='1rem'
            display='none'
            overflow='hidden'
            bg="cloud-nine"
            style={{ display: openAreas.mic ? "block" : "none" }}
          >
            <p>
              While you don't need a handheld microphone for Karaoke Nite, it
              certainly makes the experience better!
            </p>

            <p>Here are some microphones that we recommend:</p>

            <ul className="list">
              <li>
                $49.99{' '}
                <a
                  className="link"
                  href="https://www.amazon.com/Singing-Machine-Bluetooth-Microphone-CPK545/dp/B07SLFVGSC/"
                  target="_blank"
                >
                  Carpool Karaoke Mic
                </a>
              </li>
              <li>
                $16.99{' '}
                <a
                  className="link"
                  href="https://www.amazon.com/Handheld-Microphone-Nintendo-Singing-Compatible/dp/B08K6WXR29"
                  target="_blank"
                >
                  USB Handheld Microphone
                </a>
              </li>
            </ul>
            <p>
              P.S. We are working on a new and innovative way to sing without
              using a professional microphone (*cough QR code and mobile), keep
              on the look out for a feature update!
            </p>
          </Box>
        </div>
        <div className="collapse-area">
          <Collapsible
            as="button" active={!!openAreas.pc}
            onClick={() => setOpenAreas((prev) => ({ ...prev, pc: !prev?.pc }))}
          >
            How do I connect my microphone to the PC?
          </Collapsible>
          <Box
            p='1rem'
            display='none'
            overflow='hidden'
            bg="cloud-nine"
            style={{ display: openAreas.pc ? "block" : "none" }}
          >
            <p>You can do this in three simple steps:</p>
            <ol className="list">
              <li>Charge the microphone unit or make sure there's battery.</li>
              <li>
                Plug the other end of the cable into computer USB port or AUX
                port.
              </li>
              <li>
                Go to audio settings on your computer and set as input device.
              </li>
            </ol>

            <p>
              <b>Please note:</b>
            </p>

            <p>
              Due to Covid-19, we discourage all users from sharing microphones
              with friends & hope everyone adopt a good microphone hygiene
              routine!
            </p>
          </Box>
        </div>
        <div className="collapse-area">
          <Collapsible
            as="button" active={!!openAreas.speakers}
            onClick={() => setOpenAreas((prev) => ({ ...prev, speakers: !prev?.speakers }))}
          >
            How do I hear myself through the speakers?
          </Collapsible>

          <Box
            p='1rem'
            display='none'
            overflow='hidden'
            bg="cloud-nine"
            style={{ display: openAreas.speakers ? "block" : "none" }}
          >
            <p>Windows users:</p>
            <ol className="list">
              <li>Click on "Spearkers" in the taskbar.</li>
              <li>
                Click on "Sound" and make sure your microphone is set as the
                default.
              </li>
              <li>Click on "Recording".</li>
              <li>Check the "Listen to this device" box.</li>
            </ol>

            <p>Mac users:</p>
            <ol className="list">
              <li>Open QuickTime Player.</li>
              <li>Click "File" ➡ "New Audio Recording".</li>
              <li>
                Move the volume bar higher and higher until you can hear
                yourself.
              </li>
            </ol>
          </Box>
        </div>
        <div className="collapse-area">
          <Collapsible
            as="button" active={!!openAreas.updates}
            onClick={() => setOpenAreas((prev) => ({ ...prev, updates: !prev?.updates }))}
          >
            What are the new updates?
          </Collapsible>
          
          <Box
            p='1rem'
            display='none'
            overflow='hidden'
            bg="cloud-nine"
            style={{ display: openAreas.updates ? "block" : "none" }}
          >
            <h3>
              v2.2 is currently in production! Scoped to launch in winter 2022.
            </h3>

            <Text 
              as="h4"
              fontSize="16px"
              my="1em">
                Release Build v2.1
            </Text>
            <ul className="list list__dense">
              <li>🔎 New search bar.</li>
              <li>👋 New onboarding modal.</li>
              <li>💕 New heart button (experiment).</li>
              <li>🔊 New volume slider.</li>
              <li>👩🏻‍🎨 New favicon.</li>
            </ul>

            <Text 
              as="h4"
              fontSize="16px"
              my="1em">
                Release Build v2.0
            </Text>
            <ul className="list list__dense">
              <li>📹 Video cams to see your friends' faces.</li>
              <li>🎵 New songs to choose from.</li>
              <li>📱 Mobile-friendly home page.</li>
              <li>🍿 Welcome video for onboarding.</li>
              <li>🐛 Bug fixes and more.</li>
            </ul>

            <Text 
              as="h4"
              fontSize="16px"
              my="1em">
                Release Build v1.3
            </Text>
            <ul className="list list__dense">
              <li>🆕 Added a /faq page.</li>
              <li>🏗 Updated /about page.</li>
              <li>🏗 Cleaned up the codebase in preparation of v2.</li>
              <li>💸 Created the pre-seed pitch deck.</li>
            </ul>

            <Text 
              as="h4"
              fontSize="16px"
              my="1em">
                Release Build v1.2
            </Text>
            <ul className="list list__dense">
              <li>🆕 Added a Privacy Policy. Thanks, Min-Kyu!</li>
              <li>🆕 Added demo video.</li>
              <li>🆕 Added release notes.</li>
              <li>🆕 Added blog posts.</li>
              <li>🏗 Removed Patreon links.</li>
              <li>🐛 Fixed the "Let's Get It On" autoplay bug.</li>
            </ul>

            <Text 
              as="h4"
              fontSize="16px"
              my="1em">
                Release Build v1.1
            </Text>
            <ul className="list list__dense">
              <li>
                🆕 Added floating animation to the stars on the landing page.
              </li>
              <li>🆕 Added hover effects to anchor links.</li>
              <li>🆕 Added a /blog page.</li>
              <li>🐛 Fixed social channel links bug in the footer.</li>
            </ul>
          </Box>
        </div>
      </section>
      <section>
        <p>
          Let us know if you have other questions{' '}
          <a className="link" href="mailto: sonnynomnom@gmail.com">
            here
          </a>
          .
        </p>
      </section>
      <Head>
        <script
          className="shoutout-script"
          src="https://embed.shoutout.so/embed.js"
          defer
        ></script>
      </Head>
      <div className="shoutout-embed" data-wall="karaoke_nite"></div>
    </main>
  );
};

export default FAQ;
