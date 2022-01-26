import { useRouter } from "next/router";
import { io } from "socket.io-client";
import { useRef, useEffect } from "react";

const SE_INIT = "Init",
  SE_NEW_USER_ADDED = "NewUserAdded",
  SE_EXISTING_USER_NOTIFY = "ExistingUserNotify",
  SE_USER_REMOVED = "UserRemoved",
  SE_DISCONNECT = "disconnect", // Do not change this name because it is a system event.
  SE_SIGNAL = "Signal",
  SE_PLAY = "Play",
  SE_PAUSE = "Pause",
  SE_PREV = "Prev",
  SE_NEXT = "Next",
  SE_ADD_SONG_TO_PLAYLIST = "AddSongToPlaylist",
  SE_ADD_SONG_TO_QUEUE = "AddSongToQueue",
  SE_GET_PLAY_INFO = "GetPlayInfo";

export const useRoom = () => {
  const { query } = useRouter();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("/", {
      query: {
        roomName: query.room,
        userName: query.username,
      },
    });

    socket.current.on(SE_INIT, (playInfo) => {
      console.log("INIT");
    });
  }, []);
};
