// console.log(playlist + 'asdfasdfasdfasdfasdf');

const queueList = document.getElementsByClassName('queue-list')[0];

// var queue = [
//   {
//     "title": "Welcome Video",
//     "artist": "Karaoke Nite",
//     "album": "Onboarding",
//     "album_image": "https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2Fprofile.png?v=1596924786340",
//     "time": "0:10"
//   },
//   {
//     "title": "Everlong",
//     "artist": "Foo Fighters",
//     "album": "The Colour and the Shape",
//     "album_image": "https://cdn.glitch.com/b316bbdc-0b0c-4c6d-94fb-fffb37f510a9%2FThe_Colour_And_The_Shape.jpeg?v=1632203175507",
//     "time": "4:23"
//   }
// ];

const displayQueue = (songs) => {
  const htmlString = songs
    .map((song) => {
      return `
      <div class="queue-song">
        <img
          class="queue-album"
          src=${song.album_image}
          alt=${song.album}
        />
        <div class="queue-group">
          <div>
            <div class="queue-title">${song.title}</div>
            <div class="queue-artist">${song.artist}</div>
          </div>
          <div class="queue-time">${song.time}</div>
        </div>
      </div>
    `;
    })
    .join('');
  queueList.innerHTML = htmlString;
};

displayQueue(queue);