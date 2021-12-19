// main.js is for index.html
// main2.js is is for room.html

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
  SE_GET_PLAY_INFO = "GetPlayInfo";

// Socket.io socket
var socket;

// The stream object used to send media
let localStream = null;

// All peer connections
let peers = {};

// Redirect if not https
if (
  location.protocol !== 'https:' &&
  location.hostname !== 'localhost' &&
  !location.port
) {
  location.href =
    'https:' + window.location.href.substring(window.location.protocol.length);
}

// ==================== CONFIGURATION ====================

// RTCPeerConnection configuration

const configuration = {
  iceServers: [
    // { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.l.google.com:19302' },
    {
      url: 'turn:192.158.29.39:3478?transport=udp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808',
    },
  ],
};

// UserMedia constraints

let constraints = {
  audio: true,
  video: {
    width: {
      max: 300,
    },
    height: {
      max: 300,
    },
  },
};

constraints.video.facingMode = {
  ideal: 'user',
};

// Enabling the camera at startup

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    console.log('Received local stream');
    init2();

    localVideo.srcObject = stream;
    localStream = stream;

    // init();
    for (let key in peers) {
      if (!peers.hasOwnProperty(key)) continue;
      if (peers[key].streams.length < 1) peers[key].addStream(stream);
    }
  })
  .catch((e) => alert(`getusermedia error ${e.name}`));

init();

// Initialize the socket connections

function init() {
  // Get room name
  let params = new URLSearchParams(window.location.search),
    roomName = (params.get('room') || '').trim().replace(' ', '-'),
    userName = (params.get('username') || "").trim().replace(' ', '-');

  // console.log('userName is', userName);

  if (!roomName) {
    alert('Please enter the room name.');
    return;
  }

  socket = io('/', {
    query: {
      roomName: roomName,
      userName: userName,
    },
  });

  socket.on(SE_INIT, (playInfo) => {
    console.log('INIT');

    playlist.push(...playInfo.playlist);
    video_count = playInfo.currentPlayingIndex;

    var video = document.querySelector('#karaoke-video');
    var videoSync = document.querySelector('karaoke-video source');

    video.pause();
    videoSync.setAttribute('src', playlist[video_count]);
    videoSync.setAttribute('currentTime', 0);
    video.load();
    video.currentTime = playInfo.currentPlayingTime;

    if (playInfo.isPlaying) {
      // For preventing this error: Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.
      video.muted = true;
      video.play();
      // if (playPromise) {
      //   playPromise.then(() => {
      //     // video.muted = false;
      //   }).catch((e) => {});
      // }
    }
  });

  socket.on(SE_NEW_USER_ADDED, (socket_id, newUserName) => {
    console.log('NEW USER ADDED ' + socket_id);
    addPeer(socket_id, newUserName, false);

    socket.emit(SE_EXISTING_USER_NOTIFY, socket_id, userName);
  });

  socket.on(SE_EXISTING_USER_NOTIFY, (socket_id, existingUserName) => {
    console.log('EXISTING USER NOTIFY ' + socket_id);
    addPeer(socket_id, existingUserName, true);
  });

  socket.on(SE_USER_REMOVED, (socket_id) => {
    console.log('USER REMOVED ' + socket_id);
    removePeer(socket_id);
  });

  socket.on(SE_DISCONNECT, () => {
    console.log('GOT DISCONNECTED');
    for (let socket_id in peers) {
      removePeer(socket_id);
    }
  });

  socket.on(SE_SIGNAL, (data) => {
    peers[data.socket_id].signal(data.signal);
  });

  socket.on(SE_ADD_SONG_TO_PLAYLIST, (songUrl) => {
    playlist.push(songUrl);
  });

  // Username:
  // socket.emit('send-username', userName);
}

// Remove a peer with given socket_id.
// Removes the video element and deletes the connection
// @param {String} socket_id

function removePeer(socket_id) {
  let videoEl = document.getElementById(socket_id);
  if (videoEl) {
    const tracks = videoEl.srcObject.getTracks();

    tracks.forEach(function (track) {
      track.stop();
    });

    videoEl.srcObject = null;
    videoEl.parentNode.parentNode.removeChild(videoEl.parentNode);
  }
  if (peers[socket_id]) peers[socket_id].destroy();
  delete peers[socket_id];
}

// Creates a new peer connection and sets the event listeners
// @param {String} socket_id
//                 ID of the peer
// @param {Boolean} am_initiator
//                  Set to true if the peer initiates the connection process.
//                  Set to false if the peer receives the connection.

function addPeer(socket_id, userName, am_initiator) {
  peers[socket_id] = new SimplePeer({
    initiator: am_initiator,
    stream: localStream,
    config: configuration,
  });

  peers[socket_id].on('signal', (data) => {
    socket.emit(SE_SIGNAL, {
      signal: data,
      socket_id: socket_id,
    });
  });

  peers[socket_id].on('stream', (stream) => {
    let newVid = document.createElement("video");
    newVid.srcObject = stream;
    newVid.id = socket_id;
    newVid.playsinline = false;
    newVid.autoplay = true;
    // newVid.id = 'video';
    // newVid.className = 'video-camera'
    // newVid.className = 'peer-video'
    newVid.classList.add('user-camera', 'peer-video');
    newVid.onclick = () => openPictureMode(newVid);
    newVid.ontouchstart = (e) => openPictureMode(newVid);

    let user = document.createElement('div');
    user.className = 'user';
    user.appendChild(newVid);
    videoChatRoom.appendChild(user);

    // Original:

    // let user = document.createElement('div');
    // user.className = 'user';
    // user.appendChild(newVid);
    // videoChatRoom.appendChild(user);

    // Recreate:
    // videos.appendChild(newVid);

    // Username:
    let elemUserName = document.createElement('div');
    elemUserName.className = 'user-name';
    elemUserName.innerHTML = userName;
    // username.innerHTML = userName;
    user.appendChild(elemUserName);
  });
}

// Opens an element in Picture-in-Picture mode
// @param {HTMLVideoElement} el video element to put in pip mode

function openPictureMode(el) {
  console.log('opening pip');
  el.requestPictureInPicture();
}

// Switches the camera between user and environment.
// It will just enable the camera. 2 cameras not supported.

function switchMedia() {
  if (constraints.video.facingMode.ideal === 'user') {
    constraints.video.facingMode.ideal = "environment";
  } else {
    constraints.video.facingMode.ideal = "user";
  }

  const tracks = localStream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });

  localVideo.srcObject = null;

  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    for (let socket_id in peers) {
      for (let index in peers[socket_id].streams[0].getTracks()) {
        for (let index2 in stream.getTracks()) {
          if (
            peers[socket_id].streams[0].getTracks()[index].kind ===
            stream.getTracks()[index2].kind
          ) {
            peers[socket_id].replaceTrack(
              peers[socket_id].streams[0].getTracks()[index],
              stream.getTracks()[index2],
              peers[socket_id].streams[0]
            );
            break;
          }
        }
      }
    }

    localStream = stream;
    localVideo.srcObject = stream;
  });
}

// Disables and removes the local stream and all the connections to other peers.

function removeLocalStream() {
  if (localStream) {
    const tracks = localStream.getTracks();

    tracks.forEach(function (track) {
      track.stop();
    });

    localVideo.srcObject = null;
  }

  for (let socket_id in peers) {
    removePeer(socket_id);
  }
}

// *********************************************

class AudioVisualizer {
  constructor(audioContext, processFrame) {
    this.audioContext = audioContext;
    this.processFrame = processFrame;
    this.connectStream = this.connectStream.bind(this);
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(this.connectStream)
      .catch((error) => {});
  }

  connectStream(stream) {
    this.analyser = this.audioContext.createAnalyser();
    const source = this.audioContext.createMediaStreamSource(stream);
    source.connect(this.analyser);
    this.analyser.smoothingTimeConstant = 0.5;
    this.analyser.fftSize = 32;

    this.initRenderLoop(this.analyser);
  }

  initRenderLoop() {
    const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    const processFrame = this.processFrame || (() => {});

    const renderFrame = () => {
      this.analyser.getByteFrequencyData(frequencyData);
      processFrame(frequencyData);

      requestAnimationFrame(renderFrame);
    };
    requestAnimationFrame(renderFrame);
  }
}

const init2 = () => {
  // Creating initial DOM elements
  const audioContext = new AudioContext();

  // Swapping values around for a better visual effect
  const dataMap = {
    0: 15,
    1: 10,
    2: 8,
    3: 9,
    4: 6,
    5: 5,
    6: 2,
    7: 1,
    8: 0,
    9: 4,
    10: 3,
    11: 7,
    12: 11,
    13: 12,
    14: 13,
    15: 14,
  };
  const processFrame = (data) => {
    const visualValueCount = 16;
    let visualElements;
    visualElements = document.getElementById("video-container");
    const values = Object.values(data);

    let i;
    for (i = 0; i < visualValueCount; ++i) {
      const value = values[dataMap[i]] / 255;

      const elmStyles = visualElements;

      if (value >= 0.25) {
        elmStyles.classList.add("video-active");
      } else {
        elmStyles.classList.remove("video-active");
      }
    }
  };

  const a = new AudioVisualizer(audioContext, processFrame);
};

// *************************************************************

// Enable/disable microphone

let muteButton = document.getElementById("muteButton");
// console.log(muteButton);
let muteButtonIcon = document.getElementById("muteButtonIcon");

let hideCameraButton = document.getElementById("hideCameraButton");
let hideCameraButtonIcon = document.getElementById("hideCameraButtonIcon");

//user image
let userImageContainer = document.getElementById("userImageContainer");

//leave room button
let leaveRoomButton = document.getElementById("leaveRoomButton");

let muteFlag = false;
let hideCameraFlag = false;

muteButton.addEventListener("click", function () {
  muteFlag = !muteFlag;
  if (muteFlag) {
    localStream.getTracks()[0].enabled = false;
    muteButtonIcon.src =
      "https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2Ficon_mic_slash_white.svg?v=1614747343660";
  } else {
    localStream.getTracks()[0].enabled = true;
    muteButtonIcon.src =
      "https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2Ficon_mic_white.svg?v=1614747341515";
  }
});

hideCameraButton.addEventListener("click", function () {
  hideCameraFlag = !hideCameraFlag;

  if (hideCameraFlag) {
    localStream.getTracks()[1].enabled = false;
    // hideCameraButton.textContent = "Show Camera";
    userImageContainer.innerHTML = "";

    hideCameraButtonIcon.src =
      "https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2FVideo-Camera-Slash.svg?v=1630962345127";
  } else {
    localStream.getTracks()[1].enabled = true;

    userImageContainer.innerHTML =
      '<img class="user-image" id="userImage" src="./images/SmileyCyan.png"/>';

    // hideCameraButton.textContent = "Hide Camera";
    hideCameraButtonIcon.src =
      "https://cdn.glitch.com/f69fa717-be61-48e8-9ad2-e8edd524fe90%2Ficon_camera_white.svg?v=1614747337937";
  }
});
