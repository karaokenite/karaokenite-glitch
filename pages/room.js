import { Box, ColorMode, FlexBox, GridBox, Text } from "@animus-ui/components";
import { useCallback, useState } from "react";
import { animus } from "@animus-ui/core";
import { useRouter } from "next/router";
import { Portal } from "../components/Portal";
import { CatalogModal } from "../components/CatalogModal";
import { Playlist } from "../components/Playlist";
import { IconButton } from "../components/IconButton";
import {
  Camera,
  Forward,
  Backward,
  Mic,
  Heart,
  Playlist as PlaylistIcon,
  VolumeHigh,
  AddSongs,
  Play,
  Feedback,
} from "../icons";

const Container = animus
  .styles({
    minHeight: "100vh",
    maxHeight: "100vh",
    minWidth: "100vw",
    maxWidth: "100vw",
    size: 1,
    background:
      'url("https://cdn.glitch.com/aa3b905c-b152-45c7-9d6f-45c998461107%2Focean.gif?v=1632943857677") no-repeat center fixed',
    overflow: "hidden",
  })
  .states({
    blur: {
      filter: "blur(25px)",
    },
  })
  .asComponent("div");

const VolumeSlider = () => {
  return (
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
  );
};

const Room = () => {
  const [openModal, setModal] = useState();
  const [queue, setQueue] = useState([]);
  const { query } = useRouter();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const onRemove = (id) =>
    setQueue((prev) => prev.filter((songId) => id !== songId));
  return (
    <ColorMode mode="dark">
      <Container blur={![undefined, "keyboard"].includes(openModal)}>
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
              <FlexBox
                width={1}
                center
                display={openModal === "keyboard" ? "none" : "flex"}
              >
                <button
                  id="keyboardButton"
                  onClick={() => setModal("keyboard")}
                >
                  <img
                    id="keyboardButtonIcon"
                    src="https://cdn.glitch.com/aa3b905c-b152-45c7-9d6f-45c998461107%2Fkeyboard_icon.svg?v=1631257748840"
                    title="Keyboard Help"
                  />
                </button>
              </FlexBox>
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
              <IconButton
                ml="8px"
                onClick={() => setModal("feedback")}
                icon={Feedback}
                size="lg"
                bordered
              />
            </div>
          </div>
          <GridBox cols={1} rows="5:1" maxHeight="calc(100vh - 12rem)">
            <FlexBox p={32} pl={48} gap={16} center>
              <Box flex={1} size={1} position="relative">
                <video
                  style={{
                    objectFit: "contain",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
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
              </Box>
              <Box flexShrink={1} flexBasis="max-content">
                <Playlist queue={queue} onRemove={onRemove} />
              </Box>
            </FlexBox>
            <FlexBox></FlexBox>
          </GridBox>
          <GridBox
            as="footer"
            p={{ _: 0, sm: "8px" }}
            center
            cols={{ _: 1, sm: 3 }}
          >
            <FlexBox>
              <a href="javascript:history.back()">
                <button
                  className="button button__small hidden__xs"
                  id="leaveRoomButton"
                  title="Leave Room"
                >
                  Exit
                </button>
              </a>
            </FlexBox>
            <FlexBox center>
              <GridBox
                cols="1:1:1:max:1:1:1"
                width={{ _: 1, sm: 400 }}
                gap="8px"
                center
                justifyItems="center"
              >
                <IconButton icon={Camera} size="lg" />
                <IconButton icon={Mic} size="lg" />
                <IconButton icon={Backward} size="lg" />
                <IconButton icon={Play} size="xl" cta />
                <IconButton icon={Forward} size="lg" />
                <IconButton icon={VolumeHigh} size="lg" />
              </GridBox>
            </FlexBox>

            <FlexBox
              justifyContent="flex-end"
              position={{ _: "absolute", sm: "static" }}
              top={-24}
            >
              <GridBox cols={3} center justifyItems="center">
                <IconButton icon={AddSongs} size="lg" />
                <IconButton icon={PlaylistIcon} size="lg" />
                <IconButton icon={Heart} size="lg" />
              </GridBox>
            </FlexBox>
          </GridBox>
        </GridBox>
      </Container>
      {openModal === "catalog" && (
        <CatalogModal
          onClose={closeModal}
          onSelect={(songIds) => setQueue((prev) => prev.concat(songIds))}
        />
      )}
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
        <Portal onClose={closeModal} align="flex-start" hideClose>
          <Box
            alignSelf="flex-start"
            bg="rgba(255, 255, 255, 0.1)"
            color="#fafafa"
            border={1}
            borderColor="#000"
            p={16}
            px={32}
            borderRadius="1rem"
          >
            <div>
              Press <kbd>shift</kbd> + <kbd>space</kbd> to change the scenery.
            </div>
          </Box>
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
