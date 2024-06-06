const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs=[
    {
        name:'09 - Trunks meets Goku',
        displayName: 'Trunks meets Goku',
        artist: 'Bruce Facloner',
    },

    {
        name:'01 - Mysterious Youth',
        displayName: 'Mysterious Youth',
        artist: 'Bruce Facloner',
    },

    
    {
        name:'03 - Prince of Saiyans',
        displayName: 'Prince of Saiyans',
        artist: 'Bruce Facloner',
    },

    {
        name:'10 - Trunks Story',
        displayName: 'Trunks Story',
        artist: 'Bruce Facloner',
    },

    {
        name:'14 - Android Battle',
        displayName: 'Android Battel',
        artist: 'Bruce Facloner',
    },

    {
        name:'22 - The Saga Continues',
        displayName: 'The Saga Continues',
        artist: 'Bruce Facloner',
    },

    {
        name:'Gokou vs. Vegeta Theme',
        displayName: 'Gokou vs Vegeta',
        artist: 'Bruce Facloner',
    },





]





// check if playing 
let isPlaying = false; 


// Play
function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}
 // pause
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}


// Play or pause event listenr 

playBtn.addEventListener('click', ()=>(isPlaying ? pauseSong() : playSong()));

// Update dom 

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.webp`;
}

// Current Song
let SongIndex=0;

// previous song 

function prevSong()
{
    SongIndex--;
    if(SongIndex<0){
        SongIndex=songs.length-1;
    }
    
    loadSong(songs[SongIndex]);
    playSong();
}



// next song
function nextSong()
{
    SongIndex++;
    if(SongIndex>songs.length-1){
        SongIndex=0;
    }
    
    loadSong(songs[SongIndex]);
    playSong();
}
// on load - selected first song 
loadSong(songs[SongIndex]);

function updateProgressBar(e) {
    if (isPlaying) {
      const { duration, currentTime } = e.srcElement;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      }
      // Calculate display for currentTime
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
  
       
   // Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
  }
  
  // Event Listeners
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  music.addEventListener('ended', nextSong);
  music.addEventListener('timeupdate', updateProgressBar);
  progressContainer.addEventListener('click', setProgressBar);