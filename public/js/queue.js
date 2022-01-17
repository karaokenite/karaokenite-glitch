const queueList = document.getElementsByClassName('queue-list')[0];

const displayQueue = (songs) => {
  const htmlString = songs
  .map(({ album, album_image, length, title, artist }) => `
    <div class="queue-song">
      <div class="queue-album">
        <img
          src=${album_image}
          alt=${album}
        />
        <div class="queue-album-circle"></div>
      </div>
      <div class="queue-group">
        <div>
          <div class="queue-title">${title}</div>
          <div class="queue-artist">${artist}</div>
        </div>
        <div class="queue-time">${length}</div>
      </div>
    </div>
  `)
  .join('');
  queueList.innerHTML = htmlString;
};

displayQueue(queue);