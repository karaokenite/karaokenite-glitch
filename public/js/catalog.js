const songsList = document.getElementById('songsList');
const searchBar = document.getElementById('searchBar');
let songs = [];

console.log(searchBar);

// After an user type a character in the searchbox
searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredSongs = songs.filter( song => {
    console.log(song.title);
    console.log(song.artist);

    return (
      song.title.toLowerCase().includes(searchString) || 
      song.artist.toLowerCase().includes(searchString) ||
      song.album.toLowerCase().includes(searchString)
    );
  });
  
  displaysongs(filteredSongs);
  // console.log(filteredsongs);
});


const loadsongs = async () => {
  try {
    const res = await fetch('./songs.json');
    songs = await res.json();
    displaysongs(songs);
    console.log(songs);
  } catch (err) {
    console.error(err);
  }
};

const displaysongs = (songs) => {
  const htmlString = songs
    .map((song) => {
      return `
      <li class="song">
        <h2>${song.title}</h2>
        <p>${song.artist}</p>
        <img src="${song.album_image}"></img>
      </li>
    `;
    })
    .join('');
  songsList.innerHTML = htmlString;
};

loadsongs();