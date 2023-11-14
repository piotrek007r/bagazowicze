"use strict";

//-----------------------------------------------------------
// Global variables

const backdropFilter = document.querySelector(".backdrop-filter");
let newDiv;

//-----------------------------------------------------------
// Helper functions

function removeBackdrop() {
  backdropFilter.style.display = "none";
  mobileSideBar.classList.remove("is-active");
  if (!newDiv) return;
  newDiv.remove();
}

backdropFilter.addEventListener("click", function () {
  removeBackdrop();
});

//-----------------------------------------------------------
// NAVIGATION SECTION

const navBar = document.querySelector(".navigation-bar");
const sections = document.querySelectorAll("section");
const hamburgerIcon = document.querySelector(".hamburger-menu__icon");
const mobileSideBar = document.querySelector(".mobile-navigation-bar");

function scrollToPosition(e) {
  const clickedBtn = e.target.closest(".nav__item");
  sections.forEach((section) => {
    if (!clickedBtn) return;
    if (section.dataset.tab === clickedBtn.dataset.tab) {
      const coords = section.getBoundingClientRect();
      window.scrollTo({
        left: coords.left + window.pageXOffset,
        top:
          coords.top +
          window.pageYOffset -
          navBar.getBoundingClientRect().height,
        behavior: "smooth",
      });
    }
  });
}

navBar.addEventListener("click", function (e) {
  scrollToPosition(e);
});

// Hamburger menu

mobileSideBar.addEventListener("click", function (e) {
  e.preventDefault(e);
  scrollToPosition(e);
  removeBackdrop();
});

navBar.addEventListener("click", function (e) {
  e.preventDefault(e);
  // Display hamburger menu
  if (e.target.closest(".hamburger-menu__icon")) {
    mobileSideBar.classList.toggle("is-active");
    backdropFilter.style.display = "block";
  }
  // Hide hamburger menu
  if (e.target.closest(".mobile-nav__btn--close")) removeBackdrop();
});

//-----------------------------------------------------------
// OFFER SECTION

const offerContainers = document.querySelectorAll(".offer-container");
const offerNavBar = document.querySelector(".offer__nav-bar");

// Display on page load
offerContainers.forEach((container, index) => {
  if (index === 0) container.classList.remove("hidden");
});

// Handling tab-offer buttons
offerNavBar.addEventListener("click", function (e) {
  e.preventDefault();
  const dataTab = e.target.getAttribute("data-tab");
  if (!dataTab) return;
  offerContainers.forEach((container) => {
    container.classList.add("hidden");

    if (container.getAttribute("data-tab") === dataTab) {
      container.classList.remove("hidden");
    }
  });
});

//-----------------------------------------------------------
// OPINIONS SECTION

const opinionsSection = document.querySelector(".opinions__container");
const opinionBox = document.querySelectorAll(".opinions__box");
let position = 0;

function goToSlide() {
  opinionBox.forEach((el, i) => {
    el.style.transform = `translateX(${(position + i) * 100}%)`;
  });
}

function slideRight() {
  if (position < -1) position = 1;
  position--;
  goToSlide();
}

function slideLeft() {
  if (position > -1) {
    position = -3;
  }
  position++;
  goToSlide();
}

opinionsSection.addEventListener("click", function (e) {
  const btnCliked = e.target.closest(".opinions__btn");
  if (!btnCliked) return;

  if (btnCliked.classList.contains("opinions__btn-right")) {
    slideRight();
  } else {
    slideLeft();
  }
});

// touch slide

const opinionsContainer = document.querySelector(".opinions__container-child");

let touchstart = 0;
let touchend = 0;

opinionsContainer.addEventListener("touchstart", function (e) {
  touchstart = e.changedTouches[0].clientX;
});

// opinionsContainer.addEventListener("touchmove", function (e) {
//   console.log(e.changedTouches[0].clientX);
// });

opinionsContainer.addEventListener("touchend", function (e) {
  touchend = e.changedTouches[0].clientX;
  if (touchstart > touchend) {
    slideRight();
  } else {
    slideLeft();
  }
});

//-----------------------------------------------------------
// TESTYMONIALS SECTION

const testymonialsContainer = document.querySelector(
  ".testymonials__container"
);
const testymonialBox = document.querySelectorAll(".testimonial__box");

document.addEventListener("click", function (e) {
  const clickedBox = e.target.closest(".testimonial__box");
  // console.log(clickedBox.classList.contains("big-picture"));
  if (!clickedBox) return;
  if (clickedBox.classList.contains("big-picture")) return;
  if (clickedBox) {
    console.log("clicked");
    // Creating div containing img
    newDiv = document.createElement("div");
    testymonialsContainer.appendChild(newDiv);
    newDiv.classList.add("testimonial__box", "big-picture");

    // Creating img inside freshly created div
    const newImg = document.createElement("img");
    newDiv.appendChild(newImg);
    const dateSet = clickedBox.dataset.tab;
    newImg.src = `/assets/img/polecaja${dateSet}max-opt.jpg`;

    // Set a backdrop filter
    backdropFilter.style.display = "block";
  }
});

//-----------------------------------------------------------
// GALLERY SECTION

const image = document.querySelectorAll(".gallery__image");

image.forEach((el) => {
  el.addEventListener("click", function (e) {
    window.location.href = "Gallery/index.html";
  });
});

//-----------------------------------------------------------
// CONTACT SECTION

const submitButton = document.querySelector(".contact__submit");
const inputField = document.querySelectorAll(".contact__input");
const contactForm = document.querySelector(".contact__form");
const modalSending = document.querySelector(".contact__modal--sending");
const modalSendSucces = document.querySelector(".contact__modal--succes");

let misstypedInputs = [];
let deletedPlaceholder = "";

// Clearing and setting placeholder
inputField.forEach((input) => {
  input.addEventListener("focus", (e) => {
    const curElement = e.target;
    deletedPlaceholder = curElement.getAttribute("placeholder");
    curElement.removeAttribute("placeholder");
    // checking for red background
    if (input.style.backgroundColor === "rgb(254, 186, 186)")
      input.style.backgroundColor = "initial";
  });
  input.addEventListener("blur", (e) => {
    e.target.setAttribute("placeholder", deletedPlaceholder);
  });
});

// submitting a form
contactForm.addEventListener("submit", function (e) {
  // collecting all inffiled inputs
  misstypedInputs = Array.from(inputField).filter((input) => {
    return input.value === "";
  });
  // checking inffiled inputs
  misstypedInputs.forEach(
    (input) => (input.style.backgroundColor = "rgb(254, 186, 186)")
  );

  if (misstypedInputs[0]) {
    e.preventDefault();
  } else {
    modalSending.classList.remove("hidden");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.href ===
    "https://bagazowicze.netlify.app/index.html#section2"
  ) {
    console.log("matched");
    modalSendSucces.classList.remove("hidden");
    setTimeout(() => {
      console.log("hide");
      modalSendSucces.classList.add("hidden");
    }, 2000);
  }
});
