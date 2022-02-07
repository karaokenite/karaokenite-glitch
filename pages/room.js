import {
  Box,
  ColorMode,
  FlexBox,
  GridBox,
  Link,
  Text,
} from "@animus-ui/components";
import { useCallback, useMemo, useState } from "react";
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
  Keyboard,
} from "../icons";
import { Button } from "../components/Button";
import { useRoom } from "../hooks/useRoom";
import { Logo } from "../components/Logo";
import Head from "next/head";

const Container = animus
  .styles({
    minHeight: "100vh",
    maxHeight: "100vh",
    minWidth: "100vw",
    maxWidth: "100vw",
    size: 1,
    transition: "filter ease 200ms",
    background:
      'url("https://cdn.glitch.com/aa3b905c-b152-45c7-9d6f-45c998461107%2Focean.gif?v=1632943857677") no-repeat center fixed',
    overflow: "hidden",
  })
  .states({
    blur: {
      filter: "blur(50px)",
    },
  })
  .asComponent("div");

const SongVideo = animus
  .styles({
    display: "block",
    maxHeight: 1,
    width: "auto",
    maxWidth: 1,
    border: 1,
    color: "rgba(255, 255, 255, 0.5)",
    objectFit: "contain",
    position: "absolute",
    top: 0.5,
    left: 0.5,
    transform: "translate(-50%, -50%)",
    borderRadius: "18px",
  })
  .asComponent("video");

const UserVideo = animus
  .styles({
    objectFit: "cover",
    position: "absolute",
    top: 0,
    bg: "jet",
    boxShadow: ({ colors }) => `0 8px 6px -6px ${colors.jet}`,
  })
  .asComponent("video");

const UserCamera = () => {
  return (
    <Box
      borderRadius="1.25rem"
      overflow="hidden"
      maxHeight={1}
      position="relative"
      display="inline-block"
      width={200}
      height={112.5}
    >
      <UserVideo id="localVideo" autoplay muted />
    </Box>
  );
};

const Input = animus
  .styles({
    px: "1.5rem",
    border: "none",
    borderRadius: "8px 0 0 8px",
    fontSize: "20px",
    fontFamily: "var(--font-brand)",
    textAlign: "left",
    m: 0,
    outline: 0,
    width: 1,
  })
  .asComponent("input");

const Room = () => {
  const [openModal, setModal] = useState();
  const [queue, setQueue] = useState([]);
  const { pathname, query, back } = useRouter();
  const [playListOpen, setPlaylistOpen] = useState(false);
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.host}${pathname}?room=${query.room}`;
  }, [query, pathname]);

  useRoom();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const onRemove = (idx) =>
    setQueue((prev) => prev.filter((songId, songIdx) => songIdx !== idx));
  return (
    <ColorMode mode="dark">
      <Container blur={![undefined, "keyboard"].includes(openModal)}>
        <GridBox minHeight="100vh" cols={1} rows="5rem:1:5rem" gap={16}>
          <GridBox
            cols="1:2:1"
            rows={1}
            px="2rem"
            justifyContent="space-between"
          >
            <GridBox gap={4} alignItems="center">
              <Link href="/">
                <Logo />
              </Link>
            </GridBox>

            <GridBox gap={4} alignItems="center">
              <FlexBox
                width={1}
                center
                display={openModal === "keyboard" ? "none" : "flex"}
              >
                <IconButton
                  size="xl"
                  id="keyboardButton"
                  onClick={() => setModal("keyboard")}
                  icon={Keyboard}
                />
              </FlexBox>
            </GridBox>

            <GridBox gap="0.25rem" column center justifyContent="flex-end">
              <Button onClick={() => setModal("invite")}>
                Room
                <Text display={{ _: "none", md: "inline-block" }}>
                  &nbsp;Info
                </Text>
              </Button>
              <IconButton
                ml="8px"
                onClick={() => setModal("feedback")}
                icon={Feedback}
                size="lg"
                bordered
              />
            </GridBox>
          </GridBox>
          <GridBox
            cols={1}
            rows="5:1"
            maxHeight="calc(100vh - 12rem)"
            position="relative"
          >
            <FlexBox p={32} pl={48} gap={16} center>
              <Box flex={1} size={1} position="relative">
                <SongVideo
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
                </SongVideo>
              </Box>
              <Box flexShrink={1} flexBasis="max-content">
                <Playlist
                  isOpen={playListOpen}
                  queue={queue}
                  onRemove={onRemove}
                />
              </Box>
            </FlexBox>
            <FlexBox
              justifyContent="center"
              gap="1rem"
              overflowX="auto"
              maxWidth={1}
            >
              {new Array(5).fill("x").map((x, i) => (
                <UserCamera key={i} />
              ))}
            </FlexBox>
          </GridBox>
          <GridBox
            as="footer"
            bg="jet"
            position="relative"
            p={{ _: 0, sm: "8px" }}
            center
            cols={{ _: 1, sm: 3 }}
          >
            <FlexBox alignItem="center">
              <Button onClick={() => back()} size="small">
                Exit
              </Button>
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
              top={-48}
              right={0}
            >
              <GridBox cols={3} center justifyItems="center">
                <IconButton
                  icon={AddSongs}
                  size="lg"
                  onClick={() => setModal("catalog")}
                />
                <IconButton
                  icon={PlaylistIcon}
                  size="lg"
                  onClick={() => {
                    setPlaylistOpen((prev) => !prev);
                  }}
                />
                <IconButton icon={Heart} size="lg" />
              </GridBox>
            </FlexBox>
          </GridBox>
        </GridBox>
      </Container>
      <CatalogModal
        isOpen={openModal === "catalog"}
        onClose={closeModal}
        queue={queue}
        onSelect={(songIds) => {
          setQueue((prev) => prev.concat(songIds));
          setPlaylistOpen(true);
        }}
      />
      <Portal
        mode="light"
        onClose={closeModal}
        isOpen={openModal === "feedback"}
      >
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

          <FlexBox center gap="1rem" mt="1rem">
            <Button
              variant="cta"
              onClick={() =>
                window.open("https://karaokenite.typeform.com/to/SaHxnvyT")
              }
              title="Give Feedback"
            >
              Give Feedback
            </Button>
            <Button
              onClick={() =>
                window.open("https://karaokenite.typeform.com/to/qqQslFgC")
              }
            >
              Report a Bug
            </Button>
          </FlexBox>
        </Box>
      </Portal>
      <Portal
        isOpen={openModal === "keyboard"}
        onClose={closeModal}
        align="flex-start"
        hideClose
      >
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
            Press <kbd>shift</kbd> + <kbd>b</kbd> to change the scenery.
          </div>
        </Box>
      </Portal>

      <Portal isOpen={openModal === "invite"} onClose={closeModal} mode="light">
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
          <GridBox
            border={({ colors }) => `3px solid ${colors.midnight}`}
            borderRadius="8px"
            overflow="hidden"
            cols="1:max"
          >
            <Input type="text" value={shareUrl} onChange={() => {}} />
            <Button
              flexBasis="max-content"
              variant="cta"
              border="none"
              borderLeft="3px solid currentColor"
              borderRadius="0"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
              }}
            >
              Copy
            </Button>
          </GridBox>
          <FlexBox m="auto" center maxWidth={400} height={28}>
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              className="twitter-share-button"
              data-size="large"
              data-url="https://karaokenite.co"
              data-via="karaoke_nite"
              data-text={`Come hang in my karaoke room! The room name is ${query.room}`}
              data-show-count="true"
            />
            <Head>
              <script
                src="https://platform.twitter.com/widgets.js"
                charset="utf-8"
              ></script>
            </Head>
          </FlexBox>
        </FlexBox>
      </Portal>
    </ColorMode>
  );
};

export default Room;
