import { Box, ColorMode, FlexBox } from "@animus-ui/components";
import { useState } from "react";
import { CatalogModal } from "../scenes/room/Modals/Catalog";
import { Song } from "../scenes/room/Song";
import { Playlist } from "../scenes/room/Playlist";

import { Header } from "../scenes/room/Header";
import { Users } from "../scenes/room/Users";
import { ControlBar } from "../scenes/room/ControlBar";
import { RoomLayout } from "../scenes/room/RoomLayout";
import { useQueue } from "../state/queue";

const Room = () => {
  const { queue, addSong, removeSong } = useQueue();
  const [playListOpen, setPlaylistOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <>
      <RoomLayout>
        <Header />
        <RoomLayout.Main>
          <FlexBox p={32} pl={48} gap={16} center>
            <Box flex={1} size={1} position="relative">
              <Song />
            </Box>
            <Box flexShrink={1} flexBasis="max-content">
              <Playlist
                isOpen={playListOpen}
                queue={queue}
                onRemove={removeSong}
              />
            </Box>
          </FlexBox>
          <FlexBox
            justifyContent="center"
            gap="1rem"
            overflowX="auto"
            maxWidth={1}
            alignItems="flex-start"
          >
            <Users />
          </FlexBox>
        </RoomLayout.Main>
        <ControlBar
          toggleCatalog={() => setCatalogOpen((prev) => !prev)}
          togglePlaylist={() => setPlaylistOpen((prev) => !prev)}
        />
      </RoomLayout>
      <CatalogModal
        isOpen={catalogOpen}
        onClose={() => setCatalogOpen(false)}
        onSelect={(songIds) => {
          addSong(songIds);
          setPlaylistOpen(true);
        }}
      />
    </>
  );
};

export default Room;
