const songsList = document.getElementsByClassName('catalog-grid')[0];
const searchBar = document.getElementById('searchBar');
let songs = [];

console.log(searchBar);

// After an user type a character in the searchbox
searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredSongs = songs.filter( song => {

    return Object.values(song).some(value => typeof value === 'string' ? value.toLowerCase().includes(searchString) : false)
  
  });
  
  displaysongs(filteredSongs);

  // No results
  if (filteredSongs.length == 0) {
    songsList.innerHTML = "Sorry, we can't find what you are looking for.";
  }
});


const loadsongs = async () => {
  try {
    const res = await fetch('./songs.json');
    songs = await res.json();
    displaysongs(songs);
  } catch (err) {
    console.error(err);
  }
};

const displaysongs = (songs) => {
  const htmlString = songs
    .map((song) => {
      return `
      <button 
        onclick="grabURL(event, ${song.id})"
        class="catalog-item jukebox"
        type="button"
      >
        <img 
          src="${song.album_image}"
          alt="${song.album}"
          width="600"
          height="400">
        </img>

        <div class="title">${song.title}</div>
        <div class="artist">${song.artist}</div>
      </button>
    `;
    })
    .join('');
  songsList.innerHTML = htmlString;
};

loadsongs();