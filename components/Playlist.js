import { AnimatePresence, motion } from "framer-motion";
import { Box, FlexBox, GridBox, Text } from "@animus-ui/components";
import { animus } from "@animus-ui/core";
import songs from "../public/songs.json";
import { keyBy } from "lodash";
import { IconButton } from "./IconButton";
import { Close } from "../icons";

const songMap = keyBy(songs, (song) => song.id);

const motionVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { delay: 0.2 },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: { duration: "200ms", height: { delay: 0.2 } },
  },
};

const BaseContainer = motion(Box);

export const FadeInSlideOut = ({ children }) => (
  <BaseContainer
    variants={motionVariants}
    initial="exit"
    animate="visible"
    exit="exit"
  >
    {children}
  </BaseContainer>
);

const PlaylistContainer = animus
  .styles({
    backdropFilter: "blur(20px)",
    borderRadius: "1.5rem",
    height: 400,
    p: 24,
    border: " 2px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(0, 0, 0, 0.1)",
    width: 300,
    display: "flex",
    gap: 16,
    flexDirection: "column",
  })
  .asComponent("div");

const SongName = animus
  .styles({
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: 1,
    overflow: "hidden",
  })
  .asComponent("div");

export const Playlist = ({ isOpen, queue, onRemove }) => {
  return (
    <Box position={{ _: "absolute", md: "static" }} top={24} right={0}>
      <motion.div
        style={{ overflow: "hidden" }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { width: 0 },
          open: { width: 350 },
        }}
      >
        <PlaylistContainer>
          <Text as="h6">Playlist</Text>
          <Box position="relative" className="queue-list">
            <AnimatePresence>
              {queue.map((id, idx) => {
                const { album_image, length, title, artist } = songMap[id];
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FlexBox alignItems="center" gap={20} mb={20}>
                      <motion.div
                        initial="paused"
                        animate={idx === 0 ? "playing" : "paused"}
                        variants={{
                          playing: {
                            rotate: 360,
                            transition: {
                              ease: "linear",
                              duration: 5,
                              delay: 0.2,
                              repeat: Infinity,
                            },
                          },
                          paused: { rotate: 0 },
                        }}
                      >
                        <FlexBox
                          center
                          borderRadius="50%"
                          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                          size={35}
                          minWidth={35}
                          overflow="hidden"
                          backgroundImage={`url(${album_image})`}
                          backgroundSize="cover"
                        >
                          <Box
                            size={8}
                            background="rgba(0, 0, 0, 0.75)"
                            borderRadius="50%"
                          />
                        </FlexBox>
                      </motion.div>
                      <Box width={1}>
                        <GridBox
                          cols="1:max-content"
                          rows={2}
                          width={1}
                          alignItems="center"
                        >
                          <Text fontSize={16} fontWeight={700}>
                            <SongName>{title}</SongName>
                          </Text>
                          <Text fontSize={12} color="old-laundry">
                            {length}
                          </Text>
                          <Text fontSize={12} color="old-laundry">
                            {artist}
                          </Text>
                          <IconButton
                            icon={Close}
                            size="sm"
                            onClick={() => onRemove(idx)}
                          />
                        </GridBox>
                        {idx + 1 !== queue.length && (
                          <Box
                            position="relative"
                            top={8}
                            height="1px"
                            width={1}
                            bg="linen"
                          />
                        )}
                      </Box>
                    </FlexBox>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Box>
        </PlaylistContainer>
      </motion.div>
    </Box>
  );
};
