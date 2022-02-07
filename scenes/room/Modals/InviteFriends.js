import { Box, FlexBox, GridBox, Text } from "@animus-ui/components";
import Head from "next/head";
import { Button } from "../../../components/Button";
import { Portal } from "../../../components/Portal";
import { animus } from "@animus-ui/core";

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

export const InviteFriends = ({ room, roomUrl, isOpen, onClose }) => {
  return (
    <Portal isOpen={isOpen} onClose={onClose} mode="light">
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
            The room name is <span alt="Room name">{room}</span>
          </Text>
        </Text>
        <GridBox
          border={({ colors }) => `3px solid ${colors.midnight}`}
          borderRadius="8px"
          overflow="hidden"
          cols="1:max"
        >
          <Input type="text" value={roomUrl} onChange={() => {}} />
          <Button
            flexBasis="max-content"
            variant="cta"
            border="none"
            borderLeft="3px solid currentColor"
            borderRadius="0"
            onClick={() => {
              navigator.clipboard.writeText(roomUrl);
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
            data-text={`Come hang in my karaoke room! The room name is ${room}`}
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
  );
};
