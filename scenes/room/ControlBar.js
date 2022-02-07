import { FlexBox, GridBox } from "@animus-ui/components";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import {
  AddSongs,
  Backward,
  Camera,
  Forward,
  Heart,
  Mic,
  Play,
  Playlist,
  VolumeHigh,
} from "../../icons";
import { RoomLayout } from "./RoomLayout";

export const ControlBar = ({ togglePlaylist, toggleCatalog }) => {
  const { back } = useRouter();
  return (
    <RoomLayout.Footer>
      <FlexBox alignItem="center" display={{ _: "none", sm: "flex" }}>
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
            onClick={() => toggleCatalog()}
          />
          <IconButton
            icon={Playlist}
            size="lg"
            onClick={() => togglePlaylist()}
          />
          <IconButton icon={Heart} size="lg" />
        </GridBox>
      </FlexBox>
    </RoomLayout.Footer>
  );
};
