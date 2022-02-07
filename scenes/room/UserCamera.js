import { Box } from "@animus-ui/components";

const { animus } = require("@animus-ui/core");

const UserVideo = animus
  .styles({
    objectFit: "cover",
    position: "absolute",
    top: 0,
    bg: "jet",
    width: 1,
    boxShadow: ({ colors }) => `0 8px 6px -6px ${colors.jet}`,
  })
  .asComponent("video");

export const UserCamera = () => {
  return (
    <Box
      borderRadius="1.25rem"
      overflow="hidden"
      maxHeight={1}
      position="relative"
      display="inline-block"
      flexBasis={200}
      height={(200 * 9) / 16}
    >
      <UserVideo
        id="localVideo"
        autoplay
        muted
        autoPlay="autoplay"
        src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Flaunch_video.mp4?v=1616301081342"
      />
    </Box>
  );
};
