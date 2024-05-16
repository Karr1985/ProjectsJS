const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];
// Show were loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
//Show New Quote
function newQuote() {
  loading();
  // Pick a random Quote form API quotes arrya
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if Author feild is blankl replace with quote unkonw

  if (!quote.author) {
    authorText.textContent = "unknow";
  } else {
    authorText.textContent = quote.author;
  }
  // check quote length to detrmine styling
  if (quote.text.length > 75) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set the quote Hide the loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `htpps://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listenrrs
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// On Loads
getQuotes();
