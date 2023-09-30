"use strict";

//-----------------------------------------------------------
// Loading page

//-----------------------------------------------------------
// Global variables

const backdropFilter = document.querySelector(".backdrop-filter");

//-----------------------------------------------------------
// Hamburger actions

const hamburgerIcon = document.querySelector(".hamburger-menu__icon");
const mobileSideBar = document.querySelector(".mobile-navigation-bar");
const navBar = document.querySelector(".navigation-bar");

document.addEventListener("click", function (e) {
  e.preventDefault(e);

  // Display hamburger menu
  if (e.target.closest(".hamburger-menu__icon")) {
    mobileSideBar.classList.toggle("is-active");
    backdropFilter.style.display = "block";
  }

  // Hide hamburger menu
  if (
    e.target.closest(".backdrop-filter") ||
    e.target.closest(".mobile-nav__btn--close")
  ) {
    backdropFilter.style.display = "none";
    mobileSideBar.classList.remove("is-active");
  }
});

//-----------------------------------------------------------
// Offer navigation bar actions

const offerContainers = document.querySelectorAll(".offer-container");
// const offerNavBar = document.querySelector(".offer__nav-bar");

// Display on page load
offerContainers.forEach((container, index) => {
  if (index === 0) container.classList.remove("hidden");
});

// Handling tab-offer buttons
document.addEventListener("click", function (e) {
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
// Slider

const opinionsSection = document.querySelector(".opinions__section");
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
  e.preventDefault(e);
  const btnCliked = e.target.closest(".opinions__btn");
  if (!btnCliked) return;

  if (btnCliked.classList.contains("opinions__btn-right")) {
    slideRight();
  } else {
    slideLeft();
  }
});

// touch slide

const opinionsContainer = document.querySelector(".opinions__container");

let touchstart = 0;
let touchend = 0;

opinionsContainer.addEventListener("touchstart", function (e) {
  touchstart = e.changedTouches[0].clientX;
});

opinionsContainer.addEventListener("touchend", function (e) {
  touchend = e.changedTouches[0].clientX;
  if (touchstart > touchend) {
    slideRight();
  } else {
    slideLeft();
  }
});

//-----------------------------------------------------------
// Testimonials

const testymonialsContainer = document.querySelector(".testymonials__section");
const testymonialBox = document.querySelectorAll(".testimonial__box");

let newDiv;

document.addEventListener("click", function (e) {
  const clickedBox = e.target.closest(".testimonial__box");
  if (e.target.closest(".testimonial__box")) {
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
  if (e.target.closest(".backdrop-filter")) {
    backdropFilter.style.display = "none";
    newDiv.remove();
    // testymonialBox.forEach((el) => el.classList.remove("big-picture"));
  }
});

// document.addEventListener("click", function (e) {
//   const clickeBox = e.target.closest(".testimonial__box");
//   testymonialBox.forEach((el) => {
//     if (!clickeBox) return;
//     if (el.dataset.tab === clickeBox.dataset.tab) {
//       el.classList.add("big-picture");
//       backdropFilter.style.display = "block";
//     }
//   });
//   if (e.target.closest(".backdrop-filter")) {
//     backdropFilter.style.display = "none";
//     testymonialBox.forEach((el) => el.classList.remove("big-picture"));
//   }
// });
