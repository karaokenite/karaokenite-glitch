// const sonny = io.connect(window.location.origin);
const sonny1 = socket;
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const roomName = urlParams.get('room');

// console.log('sonny: ', sonny);
// console.log('queryString: ', queryString);
// console.log('urlParams: ', urlParams);
// console.log('roomName: ', roomName);

// Next Button

var el = document.getElementById('nextButton');

if (el.addEventListener) {
  el.addEventListener('click', nextFunction, false);
  console.log('false');
} else {
  el.attachEvent('onclick', nextFunction);
  console.log('true');
}

var video_count = 0;

function nextFunction() {
  console.log('nextFunction!');

  if (video_count < playlist.length - 1) {

    sonny1.emit(SE_NEXT, roomName);
    video_count++;
    
    var video = document.querySelector('#karaoke-video');
    var videoSync = document.querySelector('#karaoke-video source');
  
    video.pause();
    videoSync.setAttribute('src', playlist[video_count]);
    videoSync.setAttribute('currentTime', 0);
    video.load();
    video.play();
  
    console.log('host setting video to ', playlist[video_count]);

  } else {
    // video_count = playlist.length - 1;

    // No more song
    document.getElementById('add-more-song-notice').setAttribute('populated', true);
    setTimeout(dismissAddMoreSongNotice, 2000);
  }
}

// Back Button

var el = document.getElementById('backButton');

if (el.addEventListener) {
  el.addEventListener('click', backFunction, false);
  console.log('false');
} else {
  el.attachEvent('onclick', backFunction);
  console.log('true');
}

// var video_count = 0;

function backFunction() {
  sonny1.emit(SE_PREV, roomName);

  video_count --;
  if (video_count < 0) {
    video_count = 0;
  }

  var video = document.querySelector('#karaoke-video');
  var videoSync = document.querySelector('#karaoke-video source');

  video.pause();
  videoSync.setAttribute('src', playlist[video_count]);
  videoSync.setAttribute('currentTime', 0);
  video.load();
  video.play();

  console.log('host setting video to ', playlist[video_count]);
}

// Down Button
var el = document.getElementById('volumeDownButton');

if (el.addEventListener) {
  el.addEventListener('click', volumnDownFunction, false);
  console.log('false');
} else {
  el.attachEvent('onclick', volumnDownFunction);
  console.log('true');
}

function volumnDownFunction() {
  sonny1.emit('voldec', roomName);

  var video = document.querySelector('#karaoke-video');
  // video.volume = 0.5;
  video.volume = video.volume - 0.2;

  console.log('Volume set to low');
}

// Up Button

var el = document.getElementById('volumeUpButton');

if (el.addEventListener) {
  el.addEventListener('click', volumnUpFunction, false);
  console.log('false');
} else {
  el.attachEvent('onclick', volumnUpFunction);
  console.log('true');
}

function volumnUpFunction() {
  sonny1.emit('volinc', roomName);

  var video = document.querySelector('#karaoke-video');
  // video.volume = 1.0;
  video.volume = video.volume + 0.2;

  console.log('Volume set to low');
}

sonny1.on(SE_GET_PLAY_INFO, (sender) => {
  let video = document.querySelector('#karaoke-video');

  sonny1.emit(
    SE_GET_PLAY_INFO,
    sender,
    {
      isPlaying: !video.paused && !video.ended,
      currentPlayingIndex: video_count,
      currentPlayingTime: video.currentTime
    }
  );
});

sonny1.on(SE_PREV, function () {
  console.log('prev event gotten on the client');

  video_count--;
  if (video_count < 0) {
    video_count = 0;
  }

  var video = document.querySelector('#karaoke-video');
  var videoSync = document.querySelector('#karaoke-video source');

  video.pause();
  videoSync.setAttribute('src', playlist[video_count]);
  videoSync.setAttribute('currentTime', 0);
  video.load();
  video.play();

  console.log('host setting video to ', playlist[video_count]);
});

sonny1.on(SE_NEXT, function () {
  console.log('Next event gotten on the client');
  
  video_count++;
  if (video_count > playlist.length - 1)
    video_count = playlist.length - 1;

  var video = document.querySelector('#karaoke-video');
  var videoSync = document.querySelector('#karaoke-video source');

  video.pause();
  videoSync.setAttribute('src', playlist[video_count]);
  videoSync.setAttribute('currentTime', 0);
  video.load();
  video.play();

  console.log('host setting video to ', playlist[video_count]);
});

sonny1.on('voldec', function () {
  console.log('Volume - event gotten on the client');

  var video = document.querySelector('#karaoke-video');
  // video.volume = 0.5;
  video.volume = video.volume - 0.2;

  console.log('Volume set to low');
});

sonny1.on('volinc', function () {
  console.log('Volume + event gotten on the client');

  var video = document.querySelector('#karaoke-video');
  // video.volume = 1.0;
  video.volume = video.volume + 0.2;

  console.log('Volume set to low');
});
