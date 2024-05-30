const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK


// Disable /Enable button
function toggleButton(){
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke){
    console.log('tell me:', joke );
    VoiceRSS.speech({
        key: '9b77f5abdc30489a9e96ef5336b93d96',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
})};


// Get Jokes form Joke API
async function getJokes() {
  let joke = '';
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //Test-to-Speach
    tellMe(joke);
    // Disable Button 
    toggleButton();
  } catch (error) {
    // Catch Erros Here
    console.log('whoops', error);
  }
}

// Event Listners 
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended', toggleButton);