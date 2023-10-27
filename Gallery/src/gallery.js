"use strict";

//----------------------------------------------------------
// NAV BAR

// return to home page
const navBar = document.querySelector(".navigation-bar");

navBar.addEventListener("click", (e) => {
  window.location.href = "../index.html";
});

//----------------------------------------------------------
// MAIN GALLERY

const image = document.querySelectorAll(".image");
const galleryContainer = document.querySelector(".main-gallery");
const backdropFilter = document.querySelector(".backdrop-filter");
let newImageContainer;
let newImage;
let newButton;

// generating empty images
image.forEach((image) => {
  const src = image.getAttribute("src");
  if (src === "") image.src = "/assets/img/empty.jpg";
});

//-------------------------
// displaying big picture

function bigPicture(e) {
  const clickedContainer = e.target.closest(".main-gallery__image-container");
  if (!clickedContainer) return;
  const clickedConstainerTab = clickedContainer.getAttribute("data-tab");

  function createBigPicture(image) {
    const imageSrc = image.getAttribute("src");
    //creating container for image
    newImageContainer = document.createElement("div");
    newImageContainer.classList.add("new-picture__container");
    galleryContainer.appendChild(newImageContainer);
    //inserting an image into freshly created container
    newImage = document.createElement("img");
    newImageContainer.appendChild(newImage);
    newImage.src = imageSrc;
    newImage.classList.add("new-picture__image");
    // inserting close button
    newButton = document.createElement("div");
    newImageContainer.appendChild(newButton);
    newButton.classList.add("new-picture__close-button");
    // force to reflow
    newImageContainer.offsetWidth;
    // transform displayed image
    newImageContainer.classList.add("big-picture__container");
  }

  image.forEach((image) => {
    const imageTab = image
      .closest(".main-gallery__image-container")
      .getAttribute("data-tab");
    if (image.getAttribute("src") === "/assets/img/empty.jpg") return;

    if (clickedConstainerTab === imageTab) {
      createBigPicture(image);
      //set backdrop
      backdropFilter.style.display = "block";
    }
  });
}

// Media match for controlling bigPicture on moblie
function handleMediaQuerryChange(mq) {
  if (mq.matches) {
    console.log("remove");
    galleryContainer.removeEventListener("click", bigPicture);
  } else {
    galleryContainer.addEventListener("click", bigPicture);
  }
}

const mediaQerry = window.matchMedia("(max-width: 600px");
handleMediaQuerryChange(mediaQerry);

mediaQerry.addListener(handleMediaQuerryChange);

//-------------------------
// CLOSING BIG PICTURE
document.addEventListener("click", (e) => {
  if (
    e.target.closest(".backdrop-filter") ||
    e.target.closest(".new-picture__close-button")
  ) {
    backdropFilter.style.display = "none";
    newImageContainer.remove();
  }
});
