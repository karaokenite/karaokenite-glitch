import { animus } from "@animus-ui/core";
import { useRef } from "react";

const SongVideo = animus
  .styles({
    display: "block",
    maxHeight: 1,
    width: "auto",
    maxWidth: 1,
    border: 1,
    color: "rgba(255, 255, 255, 0.5)",
    objectFit: "contain",
    position: "absolute",
    top: 0.5,
    left: 0.5,
    transform: "translate(-50%, -50%)",
    borderRadius: "18px",
  })
  .asComponent("video");

export const Song = () => {
  const songRef = useRef();

  return (
    <SongVideo
      ref={songRef}
      id="karaoke-video"
      preload="metadata"
      poster="https://cdn.glitch.com/34fb7d5a-0c88-492e-afe8-58af6c6f4ca6%2Fkaraoke-niteasdf.jpg?v=1632183725189"
      muted
      autoPlay="autoplay"
    >
      <source
        src="https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Flaunch_video.mp4?v=1616301081342"
        type="video/mp4"
      />
      <a href="http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4">
        Download MP4
      </a>
    </SongVideo>
  );
};
