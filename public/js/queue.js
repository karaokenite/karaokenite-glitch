const queueList = document.getElementsByClassName('queue-list')[0];

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
          <div class="queue-time">${song.length}</div>
        </div>
      </div>
    `;
    })
    .join('');
  queueList.innerHTML = htmlString;
};

displayQueue(queue);