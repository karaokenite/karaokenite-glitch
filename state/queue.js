import { atom, useRecoilState } from "recoil";

export const queue = atom({
  key: "queue",
  default: [],
});

export const useQueue = () => {
  const [songs, setQueue] = useRecoilState(queue);

  return {
    queue: songs,
    setQueue,
    addSong: (songs) => setQueue((prev) => prev.concat(songs)),
    removeSong: (index) =>
      setQueue((prev) => prev.filter((_, idx) => idx !== index)),
  };
};
