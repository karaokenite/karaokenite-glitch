import { Box, ColorMode, FlexBox, GridBox } from "@animus-ui/components";
import { useState } from "react";
import { CatalogModal } from "../scenes/room/Modals/Catalog";
import { Song } from "../scenes/room/Song";
import { Playlist } from "../scenes/room/Playlist";
import { useRoom } from "../hooks/useRoom";

import { Header } from "../scenes/room/Header";
import { Users } from "../scenes/room/Users";
import { ControlBar } from "../scenes/room/ControlBar";
import { RoomLayout } from "../scenes/room/RoomLayout";

const Room = () => {
  const [queue, setQueue] = useState([]);
  const [playListOpen, setPlaylistOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const onRemove = (idx) =>
    setQueue((prev) => prev.filter((songId, songIdx) => songIdx !== idx));

  useRoom();

  return (
    <ColorMode mode="dark">
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
                onRemove={onRemove}
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
        queue={queue}
        onSelect={(songIds) => {
          setQueue((prev) => prev.concat(songIds));
          setPlaylistOpen(true);
        }}
      />
    </ColorMode>
  );
};

export default Room;
