import { Box, FlexBox, Image, Text } from "@animus-ui/components";
import { useState } from "react";
import songs from "../public/songs.json";
import { IconButton } from "./IconButton";
import { Close } from "../icons";
import { Portal } from "./Portal";

export const CatalogModal = ({ onSelect, onClose }) => {
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
        <div className="catalog-grid" onscroll="dismissAddedNotice()">
          {filteredSongs.map((song) => {
            const isSelected = selected.includes(song.id);
            const method = isSelected
              ? () => setSelected((prev) => prev.filter((id) => id !== song.id))
              : () => setSelected((prev) => prev.concat(song.id));

            return (
              <button
                onClick={method}
                class={`catalog-item jukebox ${
                  isSelected ? "jukebox-selected" : ""
                }`}
                type="button"
              >
                <Image
                  src={song.album_image}
                  alt={song.album}
                  width={600}
                  height={400}
                />

                <div class="title">{song.title}</div>
                <div class="artist">{song.artist}</div>
              </button>
            );
          })}
        </div>
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
    <Portal onClose={onClose}>
      <FlexBox height={660} width={750} maxWidth={1} maxHeight={1}>
        <Box width={1} id="songModal" className="catalog modal modal__large">
          <div className="modal-content">
            <h2>Add songs in queue</h2>
            <FlexBox position="relative" mx={32}>
              <Image
                position="absolute"
                inset="1.25rem"
                right="initial"
                src="https://cdn.glitch.me/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9/search_icon.svg?v=1640474938766"
              />
              <input
                name="searchBar"
                id="searchBar"
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
                    size="md"
                    onClick={() => setFilter("")}
                  />
                </FlexBox>
              )}
            </FlexBox>

            {renderSongs()}

            <div id="added-notice">
              <button
                className="added-notice-contents"
                onclick="dismissAddedNotice()"
              >
                You just added <span id="added-notice-song"></span> to the song
                queue!
              </button>
            </div>
            <button
              className="modal-button"
              id="choose-song"
              disabled={selected.length === 0}
              onClick={() => {
                onSelect(selected);
                onClose();
              }}
            >
              ADD SONG{selected.length > 1 ? "S" : ""}
            </button>
          </div>
        </Box>
      </FlexBox>
    </Portal>
  );
};
