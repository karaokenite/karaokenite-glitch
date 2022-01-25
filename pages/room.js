import { Box, ColorMode, FlexBox, GridBox, Text } from "@animus-ui/components";
import { useCallback, useState } from "react";
import { animus } from "@animus-ui/core";
import { useRouter } from "next/router";
import { Portal } from "../components/Portal";
import { CatalogModal } from "../components/CatalogModal";

const Container = animus
  .styles({
    minHeight: "100vh",
    maxHeight: "100vh",
    minWidth: "100vw",
    maxWidth: "100vw",
    size: 1,
    overflow: "hidden",
    background:
      'url("https://cdn.glitch.com/aa3b905c-b152-45c7-9d6f-45c998461107%2Focean.gif?v=1632943857677") no-repeat center fixed',
  })
  .states({
    blur: {
      filter: "blur(25px)",
    },
  })
  .asComponent("div");

const Room = () => {
  const [openModal, setModal] = useState();
  const { query } = useRouter();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  return (
    <ColorMode mode="dark">
      <Container blur={openModal !== undefined}>
        <GridBox minHeight="100vh" cols={1} rows="5rem:1:5rem" gap={16}>
          <div className="info-container">
            <div className="info-section-left">
              <a
                className="navbar-link navbar-link__home"
                href="/"
                target="_blank"
              >
                <h1 className="brand-logo">
                  KARAOKE NITE
                  <span className="brand-betatag">beta</span>
                </h1>
              </a>
            </div>

            <div className="info-section-middle">
              <button id="keyboardButton" onClick={() => setModal("keyboard")}>
                <img
                  id="keyboardButtonIcon"
                  src="https://cdn.glitch.com/aa3b905c-b152-45c7-9d6f-45c998461107%2Fkeyboard_icon.svg?v=1631257748840"
                  title="Keyboard Help"
                />
              </button>
            </div>

            <div className="info-section-right">
              <button
                className="button"
                id="room"
                onClick={() => setModal("invite")}
                title="Room Name"
              >
                Room <span className="hidden__xs">&nbsp;Info</span>
              </button>
              <button
                className="button"
                id="feedback"
                onClick={() => setModal("feedback")}
                title="Feedback"
              >
                <img
                  id="feedbackIcon"
                  src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Ffeedback.svg?v=1596918776029"
                />
              </button>
            </div>
          </div>
          <div className="video-container">
            <div className="group">
              <div className="karaoke-video-mask">
                <video
                  id="karaoke-video"
                  preload="metadata"
                  poster="https://cdn.glitch.com/34fb7d5a-0c88-492e-afe8-58af6c6f4ca6%2Fkaraoke-niteasdf.jpg?v=1632183725189"
                >
                  <source
                    src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Flaunch_video.mp4?v=1616301081342"
                    type="video/mp4"
                  />

                  <a href="http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4">
                    Download MP4
                  </a>
                </video>

                <div className="song-queue">
                  <h3>Playlist</h3>

                  <div className="queue-list"></div>
                </div>
              </div>

              <div className="user-container" id="videoChatRoom">
                <div className="user">
                  <video
                    id="localVideo"
                    className="user-camera user-video"
                    autoplay
                    muted
                  ></video>
                  <div className="user-name" id="userName"></div>
                </div>
              </div>
            </div>
          </div>
          <footer className="controls-container">
            <div className="footer-bg">
              <div id="footer--content">
                <div className="footer-left">
                  <a href="javascript:history.back()">
                    <button
                      className="button button__small hidden__xs"
                      id="leaveRoomButton"
                      title="Leave Room"
                    >
                      Exit
                    </button>
                  </a>
                </div>

                <div className="footer-middle">
                  <div className="btn-group" id="btn-group">
                    <div className="btn-tab">
                      <button id="hideCameraButton" title="Hide Camera">
                        <img
                          id="hideCameraButtonIcon"
                          src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2Ficon_camera_white.svg?v=1614747337937"
                        />
                      </button>
                    </div>

                    <div className="btn-tab">
                      <button
                        id="muteButton"
                        type="button"
                        data-state="mute"
                        title="Mute Mic"
                      >
                        <img
                          id="muteButtonIcon"
                          src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2Ficon_mic_white.svg?v=1614747341515"
                        />
                      </button>
                    </div>

                    <div className="btn-tab">
                      <button
                        id="backButton"
                        type="button"
                        data-state="play"
                        title="Previous"
                      >
                        <img
                          id="backButtonIcon"
                          src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2Ficon_previous_white.svg?v=1614749830096"
                        />
                      </button>
                    </div>

                    <div className="btn-tab">
                      <button
                        id="playpauseButton"
                        className="grow"
                        type="button"
                        data-state="play"
                      >
                        <img
                          id="playpauseButtonIcon"
                          src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2FGroup%2021.svg?v=1618632508004"
                        />
                      </button>
                    </div>

                    <div className="btn-tab">
                      <button
                        id="nextButton"
                        type="button"
                        data-state="play"
                        title="Next"
                      >
                        <img
                          id="nextButtonIcon"
                          src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2Ficon_next_white.svg?v=1614749830096"
                        />
                      </button>
                    </div>

                    <div className="btn-tab">
                      <button
                        id="volumeButton"
                        type="button"
                        data-state="voldown"
                        title="Change Volume"
                      >
                        <img
                          id="volumeButtonIcon"
                          src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2FVolume%20-%20Low.svg?v=1621062867508"
                        />
                      </button>

                      <div id="volumeModal" className="modal">
                        <img
                          id="volumeDownIcon"
                          src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2FVolume%20-%20Low.svg?v=1621062867508"
                        />

                        <input
                          type="range"
                          min="0.0"
                          max="1.0"
                          value="0.5"
                          className="slider"
                          id="volume"
                          step={0.05}
                        />

                        <img
                          id="volumeUpIcon"
                          src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2Ficon_volume_white.svg?v=1614749830096"
                        />

                        <img
                          id="closeIcon"
                          src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Fclose.svg?v=1632640337294"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    style={{ display: "none" }}
                    id="video-controls"
                    className="controls"
                    data-state="hidden"
                  ></div>
                </div>

                <div className="footer-right">
                  <div className="btn-group" id="btn-group2">
                    <button
                      id="playlistButton"
                      type="button"
                      onClick={() => setModal("catalog")}
                      title="Add Song"
                    >
                      <img
                        id="playlistIcon"
                        src="https://cdn.glitch.global/aa3b905c-b152-45c7-9d6f-45c998461107/add-song.svg?v=1641949339851"
                      />
                      <div id="onboard-tooltip">Add Songs</div>
                    </button>
                    <button id="queueButton" type="button" title="Song Queue">
                      <img
                        id="queueIcon"
                        src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2FPlaylist.svg?v=1621070364610"
                      />

                      <div id="onboard-tooltip">Add Songs</div>
                    </button>

                    <button
                      id="heartButton"
                      type="button"
                      data-state="heart"
                      title="Heart Button (Testing)"
                      onclick="heartAnimation()"
                    >
                      <img
                        id="heartIcon"
                        src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2FHeart.svg?v=1621070361140"
                      />

                      <div id="hearts-animations">
                        <div id="heart1">
                          <img
                            src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2FHeart.svg?v=1621070361140"
                            height="35px"
                            width="36px"
                          />
                        </div>
                        <div id="heart2">
                          <img
                            src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2FHeart.svg?v=1621070361140"
                            height="35px"
                            width="36px"
                          />
                        </div>
                        <div id="heart3">
                          <img
                            src="https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2FHeart.svg?v=1621070361140"
                            height="35px"
                            width="36px"
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </GridBox>
      </Container>
      {openModal === "catalog" && <CatalogModal onClose={closeModal} />}
      {openModal === "feedback" && (
        <Portal mode="light" onClose={closeModal}>
          <Box
            bg="background-current"
            p={24}
            py={36}
            borderRadius="2rem"
            width={500}
            textAlign="center"
          >
            <Text as="h3" mb={16}>
              What do you think?
            </Text>
            <Text>
              Karaoke Nite is an ongoing project. We're looking to hear your
              thoughts on how to make it even better!
            </Text>

            <a
              id="giveFeedbackButton"
              className="button button-bold"
              href="https://karaokenite.typeform.com/to/SaHxnvyT"
              target="_blank"
              rel="noopener"
              title="Give Feedback"
            >
              Give Feedback
            </a>
            <br />

            <a
              id="reportBugButton"
              className="button"
              href="https://karaokenite.typeform.com/to/qqQslFgC"
              target="_blank"
              rel="noopener"
              title="Invite friends to the room"
            >
              Report a Bug
            </a>
          </Box>
        </Portal>
      )}

      {openModal === "keyboard" && (
        <Portal onClose={closeModal}>
          <div id="keyboardModal" className="modal">
            Press <kbd>shift</kbd> + <kbd>space</kbd> to change the scenery.
          </div>
        </Portal>
      )}

      {openModal === "invite" && (
        <Portal onClose={closeModal} mode="light">
          <FlexBox
            bg="background-current"
            p={24}
            py={36}
            borderRadius="2rem"
            width={500}
            textAlign="center"
            gap={16}
            column
          >
            <Text as="h3">Invite your friends!</Text>
            <Text as="p" textAlign="center">
              Send the link to a friend to invite them to this karaoke room.
              <Text display="block">
                <Box display="inline" mr="4px">
                  🔑{" "}
                </Box>
                The room name is <span alt="Room name">{query.room}</span>
              </Text>
            </Text>
            <div className="copyWrapper">
              <input type="text" value="https://karaokenite.co" id="myInput" />
              <div className="tooltip">
                <button
                  className="button button-bold"
                  id="copy"
                  onclick="copyFunction()"
                  onmouseout="outFunc()"
                >
                  <span className="tooltiptext" id="myTooltip">
                    Copy to clipboard
                  </span>
                  Copy
                </button>
              </div>
            </div>
            <div className="shareButton">
              <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                className="twitter-share-button"
                data-size="large"
                data-url="https://karaokenite.co"
                data-via="karaoke_nite"
                data-show-count="true"
              >
                Tweet
              </a>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charset="utf-8"
              ></script>
            </div>
          </FlexBox>
        </Portal>
      )}
    </ColorMode>
  );
};

export default Room;
