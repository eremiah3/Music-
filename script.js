const audio = document.getElementById('audio');
const playPause = document.getElementById('playPause');
const prevSong = document.getElementById('prevSong');
const nextSong = document.getElementById('nextSong');
const playlist = document.getElementById('playlist');
const audioFilesInput = document.getElementById('audioFiles');
let songs = [];
let currentSongIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playPause.textContent = 'Play';
  } else {
    audio.play();
    playPause.textContent = 'Pause';
  }
  isPlaying = !isPlaying;
}

function loadSongs(files) {
  for (const file of files) {
    const listItem = document.createElement('li');
    listItem.textContent = file.name;
    listItem.classList.add('song');
    listItem.addEventListener('click', function() {
      currentSongIndex = songs.indexOf(file);
      playSong(currentSongIndex);
    });
    songs.push(file);
    playlist.appendChild(listItem);
  }
}

function playSong(index) {
  const file = songs[index];
  audio.src = URL.createObjectURL(file);
  audio.play();
  playPause.textContent = 'Pause';
  isPlaying = true;
}

playPause.addEventListener('click', togglePlay);

audioFilesInput.addEventListener('change', function(e) {
  const files = e.target.files;
  loadSongs(files);
});

prevSong.addEventListener('click', function() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
});

nextSong.addEventListener('click', function() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
});
