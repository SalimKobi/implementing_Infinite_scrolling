const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = "BqCCtZsoyiKwyqS2q1laZhK3VYYuYqQXkIOqltcn9Go";

// const apiKey = "jFgS8tteGD425f4soZfygQVaVnD6gt6GucN2yyz3xFek";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all images were Loaded
function imageLoaded() {
  imagesLoaded++;
  //   console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // console.log("ready = ", ready);
  }
}

//Helper function to Set attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create Elements for links, photos and DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  //Run function for each object in the photosArray
  photosArray.forEach((photo) => {
    //Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    // {This line was optimized to the line immedaiately above}

    //create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener , check when each is finished loading

    img.addEventListener("load", imageLoaded);
    // console.log("kobi");
    // img.setAttribute("src", photo.urls.small);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", phot¬øo.alt_description);
    // Put <img> inside <a>, then put both of them inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
    // imageContainer.appendChild(img);
  });
}

//Get photos from Unsplah API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    //catch Error
  }
}

//Check to see if scrolling is near the bottom of the page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    // console.log("load more");
    ready = false;
    getPhotos();
  }
  //   displayPhotos();
  //   console.log("scrolled");
});

// On load
getPhotos();
