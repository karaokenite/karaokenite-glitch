import Head from "next/head";
import { useState } from "react";

const FAQ = () => {
  const [openAreas, setOpenAreas] = useState({});
  return (
    <main class="layout layout__small layout-grid layout-grid__sm">
      <h1 class="page-subtitle">💬 Frequently Asked Questions</h1>
      <section class="layout-grid layout-grid__sm collapse">
        <div class="collapse-area">
          <button
            type="button"
            class="collapse-button collapsible"
            onClick={() =>
              setOpenAreas((prev) => ({ ...prev, mic: !prev?.mic }))
            }
          >
            Do I need a microphone for Karaoke Nite?
          </button>

          <div
            class="collapse-content content"
            style={{ display: openAreas.mic ? "block" : "none" }}
          >
            <p>
              While you don't need a handheld microphone for Karaoke Nite, it
              certainly makes the experience better!
            </p>

            <p>Here are some microphones that we recommend:</p>

            <ul class="list">
              <li>
                $49.99
                <a
                  class="link"
                  href="https://www.amazon.com/Singing-Machine-Bluetooth-Microphone-CPK545/dp/B07SLFVGSC/"
                  target="_blank"
                >
                  Carpool Karaoke Mic
                </a>
              </li>
              <li>
                $16.99
                <a
                  class="link"
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
          </div>
        </div>
        <div class="collapse-area">
          <button
            type="button"
            class="collapse-button collapsible"
            onClick={() => setOpenAreas((prev) => ({ ...prev, pc: !prev?.pc }))}
          >
            How do I connect my microphone to the PC?
          </button>
          <div
            class="collapse-content content"
            style={{ display: openAreas.pc ? "block" : "none" }}
          >
            <p>You can do this in three simple steps:</p>
            <ol class="list">
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
          </div>
        </div>
        <div class="collapse-area">
          <button
            type="button"
            class="collapse-button collapsible"
            onClick={() =>
              setOpenAreas((prev) => ({ ...prev, speakers: !prev?.speakers }))
            }
          >
            How do I hear myself through the speakers?
          </button>

          <div
            class="collapse-content content"
            style={{ display: openAreas.speakers ? "block" : "none" }}
          >
            <p>Windows users:</p>
            <ol class="list">
              <li>Click on "Spearkers" in the taskbar.</li>
              <li>
                Click on "Sound" and make sure your microphone is set as the
                default.
              </li>
              <li>Click on "Recording".</li>
              <li>Check the "Listen to this device" box.</li>
            </ol>

            <p>Mac users:</p>
            <ol class="list">
              <li>Open QuickTime Player.</li>
              <li>Click "File" ➡ "New Audio Recording".</li>
              <li>
                Move the volume bar higher and higher until you can hear
                yourself.
              </li>
            </ol>
          </div>
        </div>
        <div class="collapse-area">
          <button
            type="button"
            class="collapsible collapse-button"
            onClick={() =>
              setOpenAreas((prev) => ({ ...prev, updates: !prev?.updates }))
            }
          >
            What are the new updates?
          </button>

          <div
            class="content collapse-content"
            style={{ display: openAreas.updates ? "block" : "none" }}
          >
            <h3>
              v2.2 is currently in production! Scoped to launch in winter 2022.
            </h3>

            <h4>Release Build v2.1</h4>

            <ul class="list list__dense">
              <li>🔎 New search bar.</li>
              <li>👋 New onboarding modal.</li>
              <li>💕 New heart button (experiment).</li>
              <li>🔊 New volume slider.</li>
              <li>👩🏻‍🎨 New favicon.</li>
            </ul>

            <h4>Release Build v2.0</h4>
            <ul class="list list__dense">
              <li>📹 Video cams to see your friends' faces.</li>
              <li>🎵 New songs to choose from.</li>
              <li>📱 Mobile-friendly home page.</li>
              <li>🍿 Welcome video for onboarding.</li>
              <li>🐛 Bug fixes and more.</li>
            </ul>

            <h4>Release Build v1.3</h4>
            <ul class="list list__dense">
              <li>🆕 Added a /faq page.</li>
              <li>🏗 Updated /about page.</li>
              <li>🏗 Cleaned up the codebase in preparation of v2.</li>
              <li>💸 Created the pre-seed pitch deck.</li>
            </ul>

            <h4>Release Build v1.2</h4>
            <ul class="list list__dense">
              <li>🆕 Added a Privacy Policy. Thanks, Min-Kyu!</li>
              <li>🆕 Added demo video.</li>
              <li>🆕 Added release notes.</li>
              <li>🆕 Added blog posts.</li>
              <li>🏗 Removed Patreon links.</li>
              <li>🐛 Fixed the "Let's Get It On" autoplay bug.</li>
            </ul>

            <h4>Release Build v1.1</h4>
            <ul class="list list__dense">
              <li>
                🆕 Added floating animation to the stars on the landing page.
              </li>
              <li>🆕 Added hover effects to anchor links.</li>
              <li>🆕 Added a /blog page.</li>
              <li>🐛 Fixed social channel links bug in the footer.</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <p>
          Let us know if you have other questions{" "}
          <a class="link" href="mailto: sonnynomnom@gmail.com">
            here
          </a>
          .
        </p>
      </section>
      <Head>
        <script
          class="shoutout-script"
          src="https://embed.shoutout.so/embed.js"
          defer
        ></script>
      </Head>
      <div class="shoutout-embed" data-wall="karaoke_nite"></div>
    </main>
  );
};

export default FAQ;
