const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad =true;


//Unsplasih Api
const count = 5;
const apiKey = 'ahZ5Vi9aNYtWCVuX-mXeD868OTsFuYrBfMxO92wEI00';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded 
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    
    count =30;
  }
}

// Helper function
function setAttribute(elment, attributes) {
  for (const key in attributes) {
    elment.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos & Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
   photosArray.forEach((photo) => {
    // Create <a> to link to unsplash </a>
    const item = document.createElement('a');

    setAttribute(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // create <image > for photo
    const img = document.createElement('img');

    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event Listener , check when each is finished loading 
    img.addEventListener('load', imageLoaded);
    // put the img inside <a> then put booth inside image Continer elment </a>
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos form unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error here
  }
}

// Check to See if scrolling near bottom of the page , load more photos
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrolly >= document.body.offsetHeight -1000 && ready){
    ready = false;
    getPhotos();
    
  }
})

// On load
getPhotos();
