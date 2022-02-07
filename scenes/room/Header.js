import { FlexBox, GridBox, Link, Text } from "@animus-ui/components";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import { Logo } from "../../components/Logo";
import { Feedback, Keyboard } from "../../icons";
import { GiveFeedback } from "./Modals/GiveFeedback";
import { InviteFriends } from "./Modals/InviteFriends";
import { KeyboardShortcuts } from "./Modals/KeyboardShortcuts";
import { RoomLayout } from "./RoomLayout";

export const Header = () => {
  const [showTips, setShowTips] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { pathname, query } = useRouter();

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.host}${pathname}?room=${query.room}`;
  }, [query, pathname]);

  return (
    <RoomLayout.Header>
      <GridBox gap={4} alignItems="center">
        <Link href="/">
          <Logo />
        </Link>
      </GridBox>

      <GridBox gap={4} alignItems="center">
        <FlexBox width={1} center display={showTips ? "none" : "flex"}>
          <IconButton
            size="xl"
            onClick={() => setShowTips(true)}
            icon={Keyboard}
          />
          {showTips && (
            <KeyboardShortcuts isOpen onClose={() => setShowTips(false)} />
          )}
        </FlexBox>
      </GridBox>

      <GridBox gap="0.25rem" column center justifyContent="flex-end">
        <Button onClick={() => setShowInvite(true)}>
          Room
          <Text display={{ _: "none", md: "inline-block" }}>&nbsp;Info</Text>
        </Button>
        <InviteFriends
          isOpen
          room={query.room}
          roomUrl={shareUrl}
          onClose={() => setShowInvite(false)}
          isOpen={showInvite}
        />
        <IconButton
          ml="8px"
          onClick={() => setShowFeedback(true)}
          icon={Feedback}
          size="lg"
          bordered
        />
        <GiveFeedback
          onClose={() => setShowFeedback(false)}
          isOpen={showFeedback}
        />
      </GridBox>
    </RoomLayout.Header>
  );
};
