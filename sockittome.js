import { lastIndexOf } from 'lodash';
import { createStore } from 'redux'

module.exports = (io) => {
  const parentNamespace = io.of(/^\w$/);

  parentNamespace.use((socket, next) => {
    next();
  });

  io.use((socket, next) => {
    if (!socket.handshake.query.roomName) {
      next(new Error("Invalid Room"));
    } else {
      next();
    }
  }).on("connect", (socket) => {
    console.log(`Client ${socket.id} is connected.`);
  });
};

var rooms = {};

// // Socket event constants.
// const SE_INIT = "Init",
//   SE_NEW_USER_ADDED = "NewUserAdded",
//   SE_EXISTING_USER_NOTIFY = "ExistingUserNotify",
//   SE_USER_REMOVED = "UserRemoved",
//   SE_DISCONNECT = "disconnect", // Do not change this name because it is a system event.
//   SE_SIGNAL = "Signal",
//   SE_GET_PLAY_INFO = "GetPlayInfo",
//   SE_PLAY = "Play",
//   SE_PAUSE = "Pause",
//   SE_PREV = "Prev",
//   SE_NEXT = "Next",
//   SE_ADD_SONG_TO_PLAYLIST = "AddSongToPlaylist",
//   SE_ADD_SONG_TO_QUEUE = "AddSongToQueue";

// function isEmpty(obj) {
//   for (var prop in obj) {
//     if (obj.hasOwnProperty(prop)) return false;
//   }

//   return true;
// }

// function getKeyCount(obj) {
//   let count = 0;

//   for (let prop in obj) {
//     if (obj.hasOwnProperty(prop)) 
//       count++;
//   }

//   return count;
// }

// function getFirstValue(obj) {
//   for (let prop in obj) {
//     if (obj.hasOwnProperty(prop)) 
//       return obj[prop];
//   }

//   return null;
// }

// module.exports = (io) => {
//   io.of("/admin").on("connect", (socket) => {
//     console.log(`Client ${socket.id} is connected.`);
//     const roomName = "singsing";
//     const userName = "cooldude";
//     // Join to room.

//     socket.join(roomName);
    
//     if (!rooms[roomName]) {
//       rooms[roomName] = {
//         socketUserMap: {},
//         playInfo: {
//           playlist: [],
//           queue: [],
//           currentPlayingIndex: 0,
//           currentPlayingTime: 0,
//           isPlaying: false,
//         },
//       };
//     }

//     console.log(`Client ${socket.id} joined to room ${roomName}`);

//     let firstUser = getFirstValue(rooms[roomName].socketUserMap);

//     // Initiate the connection process as soon as the client connects
//     rooms[roomName].socketUserMap[socket.id] = {
//       socket: socket,
//       userName: userName,
//     };
    
//     // Initialize
//     socket.on(SE_GET_PLAY_INFO, (sender, playInfo) => {
//       rooms[roomName].playInfo.isPlaying = playInfo.isPlaying;
//       rooms[roomName].playInfo.currentPlayingIndex = playInfo.currentPlayingIndex;
//       rooms[roomName].playInfo.currentPlayingTime = playInfo.currentPlayingTime;

//       if (rooms[roomName].socketUserMap[sender])
//         rooms[roomName].socketUserMap[sender].socket.emit(
//           SE_INIT,
//           rooms[roomName].playInfo
//         );
//     });

//     // Get play info.
//     if (firstUser) {
//       firstUser.socket.emit(SE_GET_PLAY_INFO, socket.id);
//     } else {
//       socket.emit(SE_INIT, rooms[roomName].playInfo);
//     }

//     // Asking all other clients to setup the peer connection receiver
//     socket.to(roomName).emit(SE_NEW_USER_ADDED, socket.id, userName);

//     // Send message to client to initiate a connection
//     // The sender has already setup a peer connection receiver
//     socket.on(SE_EXISTING_USER_NOTIFY, (init_socket_id, existingUserName) => {
//       console.log(
//         "EXISTING USER NOTIFY by " + socket.id + " for " + init_socket_id
//       );
//       rooms[roomName].socketUserMap[init_socket_id].socket.emit(
//         SE_EXISTING_USER_NOTIFY,
//         socket.id,
//         existingUserName
//       );
//     });

//     // Relay a peerconnection signal to a specific socket
//     socket.on(SE_SIGNAL, (data) => {
//       // console.log('sending signal from ' + socket.id + ' to ', data);
//       console.log(
//         `Client ${socket.id} in room ${roomName} emitted 'Signal' event.`
//       );

//       if (!rooms[roomName].socketUserMap[data.socket_id]) {
//         return;
//       }

//       rooms[roomName].socketUserMap[data.socket_id].socket.emit(SE_SIGNAL, {
//         socket_id: socket.id,
//         signal: data.signal,
//       });
//     });

//     // Remove the disconnected peer connection from all other connected clients
//     socket.on(SE_DISCONNECT, () => {
//       console.log("socket disconnected " + socket.id);
//       socket.to(roomName).emit(SE_USER_REMOVED, socket.id);
//       delete rooms[roomName].socketUserMap[socket.id];

//       // Delete room if there's no socket.
//       if (isEmpty(rooms[roomName].socketUserMap)) {
//         delete rooms[roomName];
//         console.log(`Room ${roomName} was deleted because no one is in it.`);
//       }
//     });

//     // Triggered when a user presses the play button
//     socket.on(SE_PLAY, function () {
//       console.log(
//         `Client ${socket.id} in room ${roomName} emitted 'Play' event.`
//       );

//       rooms[roomName].playInfo.isPlaying = true;

//       socket.to(roomName).emit(SE_PLAY);
//     });

//     // Triggered when a user presses the pause button
//     socket.on(SE_PAUSE, function () {
//       console.log(
//         `Client ${socket.id} in room ${roomName} emitted 'Pause' event.`
//       );

//       rooms[roomName].playInfo.isPlaying = false;

//       socket.to(roomName).emit(SE_PAUSE);
//     });

//     // Triggered when a user presses the "next" button
//     socket.on(SE_NEXT, function () {
//       console.log(
//         `Client ${socket.id} in room ${roomName} emitted 'Next' event.`
//       );

//       rooms[roomName].playInfo.currentPlayingIndex++;
//       if (
//         rooms[roomName].playInfo.currentPlayingIndex >
//         rooms[roomName].playInfo.playlist.length - 1
//       )
//         rooms[roomName].playInfo.currentPlayingIndex =
//           rooms[roomName].playInfo.playlist.length - 1;

//       socket.to(roomName).emit(SE_NEXT);
//     });

//     // Triggered when a user presses the "previous" button
//     socket.on(SE_PREV, function () {
//       console.log(
//         `Client ${socket.id} in room ${roomName} emitted 'Prev' event.`
//       );

//       rooms[roomName].playInfo.currentPlayingIndex--;
//       if (rooms[roomName].playInfo.currentPlayingIndex < 0)
//         rooms[roomName].playInfo.currentPlayingIndex = 0;

//       socket.to(roomName).emit(SE_PREV);
//     });

//     // Triggered when a user presses the "Choose Song" button
//     socket.on(SE_ADD_SONG_TO_PLAYLIST, function (songUrl) {
//       console.log(
//         `Client ${socket.id} in room ${roomName} emitted 'addSongToPlaylist' event with ${songUrl}`
//       );

//       rooms[roomName].playInfo.playlist.push(songUrl);

//       socket.to(roomName).emit(SE_ADD_SONG_TO_PLAYLIST, songUrl);
//     });

//     // Triggered when a user presses the "Choose Song" button
//     socket.on(SE_ADD_SONG_TO_QUEUE, function (queueSong) {
//       console.log(
//         `Client ${socket.id} in room ${roomName} emitted 'addSongToQueue' event with ${queueSong["title"]}`
//       );

//       rooms[roomName].playInfo.queue.push(queueSong);

//       socket.to(roomName).emit(SE_ADD_SONG_TO_QUEUE, queueSong);
//     });
//   });
// };


// Redux Reducers

const CREATE_ROOM = "createRoom";
const SONG_ADDED = "songAdded";
const PLAY_PRESSED = "playPressed";
const PAUSE_PRESSED = "pausePressed";
const PREV_PRESSED = "prevPressed";
const NEXT_PRESSED = "nextPressed";

let nextRoomId = 0;
let songIndex = 0;

export default function playlistReducer(state = {}, action) {
  switch (action.type) {
    case "CREATE_ROOM": {
      const roomId = ++nextRoomId;
      return {
        ...state,
        [roomId]: {
          roomId,
          socketUserMap: action.payload.user,
          playlist: ["https://cdn.glitch.me/aa3b905c-b152-45c7-9d6f-45c998461107%2Fkaraoke_nite_welcome_video_hd.mp4"],
          queue: ["https://cdn.glitch.me/aa3b905c-b152-45c7-9d6f-45c998461107%2Fkaraoke_nite_welcome_video_hd.mp4"],
          currentPlayingIndex: 0,
          currentPlayingTime: 0,
          isPlaying: false,
        }
      }
    }
    case "SONG_ADDED": {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          playlist: [...state[action.payload.id].playlist, action.payload.song],
          queue: [...state[action.payload.id].queue, action.payload.song] 
        }
      }
    }
    case "PLAY_PRESSED": {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          isPlaying: true
        }
      }
    }
    case "PAUSE_PRESSED": {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          isPlaying: false
        }
      }
    }
    case "PREV_PRESSED": {
      const roomId = action.payload.id;
      const room = state[roomId];
      return {
        ...state,
        [roomId]: {
          ...room,
          currentPlayingIndex: room.currentPlayingIndex - 1 ?? 0, // Don't go below 0
        }
      }
    }
    case "NEXT_PRESSED": {
      const roomId = action.payload.id;
      const room = state[roomId];
      return {
        ...state,
        [roomId]: {
          ...room,
          currentPlayingIndex: room.currentPlayingIndex + 1,
        }
      }
    }
    default:
      return state;
  }
};

// const registryReducer = (state, action) => {
//   switch (action.type) {
//     case "CREATE_ROOM": {
//       return {
//         ...rooms,
//         [roomName]: 'blah'
//       };
//     }
//     case "DELETE_ROOM": {
//       return {};
//     }
//     default:
//       return state
//   }
// };

// const roomReducer = (state, action) => {
//   switch (action.type) {
//     case "USER_JOINED": {
//       return {};
//     }
//     default:
//       return state
//   }
// };

const store = createStore(playlistReducer)
// export default store;

console.log(store)


// Redux Actions

export const createRoom = user => ({
  type: "CREATE_ROOM",
  payload: {
    user
  }
})

export const songAdded = (id, song) => ({
  type: "SONG_ADDED",
  payload: {
    id,
    song
  }
})

const playPressed = id => ({
  type: "PLAY_PRESSED",
  payload: {
    id
  }
});

const pausePressed = id => ({
  type: "PAUSE_PRESSED",
  payload: {
    id
  }
});

const prevPressed = id => ({
  type: "PREV_PRESSED",
  payload: {
    id
  }
});

const nextPressed = id => ({
  type: "NEXT_PRESSED",
  payload: {
    id
  }
});


const unsubscribe = store.subscribe(() => {
  console.log("Store changed!", store.getState());
})

// Console Test

console.log("create room:")
store.dispatch({
  type: "CREATE_ROOM",
  payload: {
    user: "sonny123"
  }
})

console.log("song added:")
store.dispatch({
  type: "SONG_ADDED",
  payload: {
    id: 1,
    song: "https://my-site.example-cdn.com/blah.mp3"
  }
});

console.log("play pressed:")
store.dispatch({
  type: 'PLAY_PRESSED',
  payload: {
    id: 1,
  }
})

console.log("pause pressed:")
store.dispatch({ 
  type: 'PAUSE_PRESSED',
  payload: {
    id: 1,
  }
})

console.log("next pressed:")
store.dispatch({ 
  type: 'NEXT_PRESSED',
  payload: {
    id: 1,
  }
})

console.log("prev pressed:")
store.dispatch({ 
  type: 'PREV_PRESSED',
  payload: {
    id: 1,
  }
})

console.log("test #2")

store.dispatch({
  type: "CREATE_ROOM",
  payload: {
    user: "aaron123"
  }
})


store.dispatch({ 
  type: 'NEXT_PRESSED',
  payload: {
    id: 2,
  }
})

store.dispatch({ 
  type: 'PREV_PRESSED',
  payload: {
    id: 2,
  }
})