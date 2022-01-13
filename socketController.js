// Old code: peers = {};
var rooms = {};

// Socket event constants.
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


function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }

  return true;
}

function getKeyCount(obj) {
  let count = 0;

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop))
      count ++;
  }

  return count;
}

function getFirstValue(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop))
      return obj[prop];
  }

  return null;
}

module.exports = (io) => {
  io.use((socket, next) => {
    if (!socket.handshake.query.roomName) {
      next(new Error('Invalid Room'));
    } else {
      next();
    }
  }).on('connect', (socket) => {
    console.log(`Client ${socket.id} is connected.`);

    // Join to room.
    let roomName = socket.handshake.query.roomName,
        userName = socket.handshake.query.userName;
    socket.join(roomName);

    if (!rooms[roomName]) {
      rooms[roomName] = {
        socketUserMap: {},
        playInfo: {
          playlist: [],
          queue: [],
          currentPlayingIndex: 0,
          currentPlayingTime: 0,
          isPlaying: false
        }
      };
    }

    console.log(`Client ${socket.id} joined to room ${roomName}`);

    let firstUser = getFirstValue(rooms[roomName].socketUserMap);

    // Initiate the connection process as soon as the client connects
    // Old code: peers[socket.id] = socket;
    rooms[roomName].socketUserMap[socket.id] = {
      socket: socket,
      userName: userName
    };

    // Initialize
    socket.on(SE_GET_PLAY_INFO, (sender, playInfo) => {
      rooms[roomName].playInfo.isPlaying = playInfo.isPlaying;
      rooms[roomName].playInfo.currentPlayingIndex = playInfo.currentPlayingIndex;
      rooms[roomName].playInfo.currentPlayingTime = playInfo.currentPlayingTime;

      if (rooms[roomName].socketUserMap[sender])
        rooms[roomName].socketUserMap[sender].socket.emit(SE_INIT, rooms[roomName].playInfo);
    });

    // Get play info.
    if (firstUser) {
      firstUser.socket.emit(SE_GET_PLAY_INFO, socket.id);
    } else {
      socket.emit(SE_INIT, rooms[roomName].playInfo);
    }

    // Asking all other clients to setup the peer connection receiver
    socket.to(roomName).emit(SE_NEW_USER_ADDED, socket.id, userName);
    // Old code:
    // for (let id in peers) {
    //   if (id === socket.id) continue;
    //   console.log('sending init receive to ' + socket.id);
    //   peers[id].emit('initReceive', socket.id);
    // }

    // Send message to client to initiate a connection
    // The sender has already setup a peer connection receiver
    socket.on(SE_EXISTING_USER_NOTIFY, (init_socket_id, existingUserName) => {
      console.log('EXISTING USER NOTIFY by ' + socket.id + ' for ' + init_socket_id);
      rooms[roomName].socketUserMap[init_socket_id].socket.emit(SE_EXISTING_USER_NOTIFY, socket.id, existingUserName);
    });

    // Relay a peerconnection signal to a specific socket
    socket.on(SE_SIGNAL, (data) => {
      // console.log('sending signal from ' + socket.id + ' to ', data);
      console.log(
        `Client ${socket.id} in room ${roomName} emitted 'Signal' event.`
      );

      // Old code: if (!peers[data.socket_id]) return;
      if (!rooms[roomName].socketUserMap[data.socket_id]) {
        return;
      }

      // Old code:
      // peers[data.socket_id].emit('signal', {
      //   socket_id: socket.id,
      //   signal: data.signal,
      // });

      rooms[roomName].socketUserMap[data.socket_id].socket.emit(SE_SIGNAL, {
        socket_id: socket.id,
        signal: data.signal,
      });
    });

    // Username
    // socket.on('send-username', function (userName) {
    //   // rooms[roomName][data.socket_id].username = username;
    //   // users.push(socket.nickname);
    //   // console.log('We are at the username' + username);
    //   socket.to(roomName).emit('receive-username', userName);
    // });

    // Remove the disconnected peer connection from all other connected clients
    socket.on(SE_DISCONNECT, () => {
      console.log('socket disconnected ' + socket.id);
      socket.to(roomName).emit(SE_USER_REMOVED, socket.id);
      // Old code: socket.broadcast.emit('removePeer', socket.id);
      // Old code: delete peers[socket.id];
      delete rooms[roomName].socketUserMap[socket.id];

      // Delete room if there's no socket.
      if (isEmpty(rooms[roomName].socketUserMap)) {
        delete rooms[roomName];
        console.log(`Room ${roomName} was deleted because no one is in it.`);
      }
    });

    // Triggered when a user presses the play button
    socket.on(SE_PLAY, function () {
      // socket.broadcast.emit("play", roomName);
      // Old code:
      // for (let id in peers) {
      //   if (id === socket.id) continue;
      //   console.log('sending init receive to ' + socket.id);
      //   peers[id].emit('play');
      // }
      console.log(
        `Client ${socket.id} in room ${roomName} emitted 'Play' event.`
      );

      rooms[roomName].playInfo.isPlaying = true;

      socket.to(roomName).emit(SE_PLAY);
    });

    // Triggered when a user presses the pause button
    socket.on(SE_PAUSE, function () {
      // socket.broadcast.emit("pause", roomName);
      // Old code:
      // for (let id in peers) {
      //   if (id === socket.id) continue;
      //   console.log('sending init receive to ' + socket.id);
      //   peers[id].emit('pause');
      // }
      console.log(
        `Client ${socket.id} in room ${roomName} emitted 'Pause' event.`
      );

      rooms[roomName].playInfo.isPlaying = false;

      socket.to(roomName).emit(SE_PAUSE);
    });

    // When user press the volumen + button and the volumn - button, we don't emit anything.
    // This is because we only want the volumn buttons to work for the users themselves.
    // And not all the people in the room.

    // Triggered when a user presses the "next" button
    socket.on(SE_NEXT, function () {
      // socket.broadcast.emit("next", roomName);
      // Old code:
      // for (let id in peers) {
      //   if (id === socket.id) continue;
      //   console.log('sending init receive to ' + socket.id);
      //   peers[id].emit('next');
      // }
      console.log(
        `Client ${socket.id} in room ${roomName} emitted 'Next' event.`
      );

      rooms[roomName].playInfo.currentPlayingIndex ++;
      if (rooms[roomName].playInfo.currentPlayingIndex > rooms[roomName].playInfo.playlist.length - 1)
        rooms[roomName].playInfo.currentPlayingIndex = rooms[roomName].playInfo.playlist.length - 1;

      socket.to(roomName).emit(SE_NEXT);
    });

    // Triggered when a user presses the "previous" button
    socket.on(SE_PREV, function () {
      // socket.broadcast.emit("prev", roomName);
      // Old code:
      // for (let id in peers) {
      //   if (id === socket.id) continue;
      //   console.log('sending init receive to ' + socket.id);
      //   peers[id].emit('prev');
      // }
      console.log(
        `Client ${socket.id} in room ${roomName} emitted 'Prev' event.`
      );

      rooms[roomName].playInfo.currentPlayingIndex --;
      if (rooms[roomName].playInfo.currentPlayingIndex < 0)
        rooms[roomName].playInfo.currentPlayingIndex = 0;

      socket.to(roomName).emit(SE_PREV);
    });

    // Triggered when a user presses the "Choose Song" button
    socket.on(SE_ADD_SONG_TO_PLAYLIST, function (songUrl) {
      console.log(
        `Client ${socket.id} in room ${roomName} emitted 'addSongToPlaylist' event with ${songUrl}`
      );

      rooms[roomName].playInfo.playlist.push(songUrl);

      socket.to(roomName).emit(SE_ADD_SONG_TO_PLAYLIST, songUrl);
    });

     // Triggered when a user presses the "Choose Song" button
     socket.on(SE_ADD_SONG_TO_QUEUE, function (queueSong) {
      console.log(
        `Client ${socket.id} in room ${roomName} emitted 'addSongToQueue' event with ${queueSong["title"]}`
      );

      rooms[roomName].playInfo.queue.push(queueSong);

      socket.to(roomName).emit(SE_ADD_SONG_TO_QUEUE, queueSong);
    });

  });
};
