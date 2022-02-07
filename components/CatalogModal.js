import { Box, FlexBox, GridBox, Image, Text } from "@animus-ui/components";
import { animus } from "@animus-ui/core";
import { useCallback, useEffect, useState } from "react";
import songs from "../public/songs.json";
import { IconButton } from "./IconButton";
import { Checkmark, Close } from "../icons";
import { Portal } from "./Portal";
import { Button } from "./Button";

const NoSelect = animus
  .styles({ "> *": { userSelect: "none" } })
  .asComponent("div");

const mask = `
-webkit-gradient(
  linear,
  center top,
  center bottom,
  color-stop(0.5, rgba(0, 0, 0, 1)),
  color-stop(1, rgba(0, 0, 0, 0))
)`;

const CatalogGrid = animus
  .styles({
    display: "grid",
    gap: "1rem",
    maxHeight: "45vh",
    p: "2rem",
    pt: "1rem",
    mb: "1rem",
    overflowY: "auto",
    position: "relative",
    width: 1,
    cols: 3,
    WebkitMaskImage: mask,
  })
  .asComponent("div");

const SearchInput = animus
  .styles({
    width: 1,
    height: 64,
    border: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    fontSize: "18px",
    bg: "rgba(255, 255, 255, 0.2)",
    py: "2px",
    pr: "1.5rem",
    pl: "3rem",
    color: "linen",
    borderRadius: "0.75rem",
  })
  .asComponent("input");

const AddSongButton = animus
  .styles({
    border: "none",
    bg: "transparent",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    textAlign: "start",
    position: "relative",
    outline: 0,
    minHeight: "10rem",
  })
  .states({
    selected: {
      borderRadius: "4px",
    },
  })
  .asComponent("button");

export const CatalogModal = ({ isOpen, onSelect, onClose, queue }) => {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState([]);

  const filteredSongs = songs.filter(({ title, artist }) => {
    if (!filter) return true;
    const parsedFilter = filter.toLowerCase().trim();
    return (
      title.toLowerCase().includes(parsedFilter) ||
      artist.toLowerCase().includes(parsedFilter)
    );
  });

  const renderSongs = () => {
    if (filteredSongs.length > 0) {
      return (
        <CatalogGrid>
          {filteredSongs.map((song) => {
            const isSelected = selected.includes(song.id);
            const method = isSelected
              ? () => setSelected((prev) => prev.filter((id) => id !== song.id))
              : () => setSelected((prev) => prev.concat(song.id));

            return (
              <NoSelect>
                <AddSongButton onClick={method} type="button">
                  {isSelected && (
                    <Box
                      position="absolute"
                      right="0.5rem"
                      top="0.5rem"
                      zIndex={2}
                    >
                      <Checkmark
                        bg="old-yellow"
                        color="jet"
                        p="0.5rem"
                        size={32}
                        borderRadius="50%"
                      />
                    </Box>
                  )}
                  <Image
                    src={song.album_image}
                    alt={song.album}
                    width={1}
                    height="auto"
                    border="4px"
                    color="transparent"
                    draggable="false"
                  />

                  <Text
                    as="h2"
                    area="name"
                    fontSize="18px"
                    mt="0.5rem"
                    mb="0.25rem"
                    color="#f2f2f2"
                  >
                    {song.title}
                  </Text>
                  <Text color="#c4c4c4">{song.artist}</Text>
                </AddSongButton>
              </NoSelect>
            );
          })}
        </CatalogGrid>
      );
    }

    return (
      <FlexBox center width={1} height={1} p={32}>
        <Text as="p" fontSize={18}>
          Sorry, we can't find what you are looking for.
        </Text>
      </FlexBox>
    );
  };

  return (
    <Portal isOpen={isOpen} onClose={onClose}>
      <FlexBox
        height={660}
        width={750}
        maxWidth={1}
        maxHeight={1}
        bg="rgba(3, 3, 22, 0.4)"
        maxWidth={750}
        p="1.5rem"
        pt="2rem"
        borderRadius="1.5rem"
      >
        <Box width={1} id="songModal">
          <GridBox
            width={1}
            maxWidth="75rem"
            rows="max:max:1"
            gap="1rem"
            maxHeight={1}
            overflow="hidden"
          >
            <h2>Add songs in queue</h2>
            <FlexBox position="relative" mx={32}>
              <Image
                position="absolute"
                inset="1.25rem"
                right="initial"
                src="https://cdn.glitch.me/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9/search_icon.svg?v=1640474938766"
              />
              <SearchInput
                name="searchBar"
                value={filter.replace(/\./g, "")}
                onChange={(e) =>
                  setFilter(e.target.value.replace(/[\.]/gm, " "))
                }
                placeholder="Search for song titles or artist name"
              />
              {filter.length > 0 && (
                <FlexBox position="absolute" inset="1rem" left="initial">
                  <IconButton
                    icon={Close}
                    size="sm"
                    onClick={() => setFilter("")}
                  />
                </FlexBox>
              )}
            </FlexBox>

            {renderSongs()}
          </GridBox>
          <FlexBox center>
            <Box position="absolute" bottom={-56 / 2}>
              <Button
                rounded
                height={56}
                width={300}
                variant="cta"
                disabled={selected.length === 0}
                onClick={() => {
                  onSelect(selected);
                  setSelected([]);
                  onClose();
                }}
              >
                ADD SONG{selected.length > 1 ? "S" : ""}
              </Button>
            </Box>
          </FlexBox>
        </Box>
      </FlexBox>
    </Portal>
  );
};
