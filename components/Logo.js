import { Box, Text } from "@animus-ui/components";
import { animus } from "@animus-ui/core";

const Tag = animus
  .styles({
    padding: "0.1rem 0.4rem 0",
    position: "absolute",
    left: "calc(100% + 0.5rem)",
    top: 0.5,
    bg: "pretty-in-pink",
    borderRadius: 0,
    lineHeight: 1.3,
    transform: "translate(0, -65%) rotate(-10deg)",
  })
  .asComponent("span");

export const Logo = () => {
  return (
    <Box isolate width="max-content">
      <Text as="h1" fontSize={20} textTransform="uppercase">
        Karaoke Nite
      </Text>
      <Tag>beta</Tag>
    </Box>
  );
};
