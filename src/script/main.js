"use strict";

//-----------------------------------------------------------
// Loading page

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

//-----------------------------------------------------------
// Navigation bar actions

const navBar = document.querySelector(".navigation-bar");
const sections = document.querySelectorAll("section");
const topgGap = navBar.getBoundingClientRect().height;
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
        top: coords.top + window.pageYOffset - topgGap,
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
  scrollToPosition(e);
  removeBackdrop();
});

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
  )
    removeBackdrop();
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

const opinionsSection = document.querySelector(".opinions__container");
const opinionBox = document.querySelectorAll(".opinions__box");
let position = 0;

function goToSlide() {
  opinionBox.forEach((el, i) => {
    el.style.transform = `translateX(${(position + i) * 100}%)`;
  });
}

function slideRight() {
  console.log("right");
  if (position < -1) position = 1;
  position--;
  goToSlide();
}

function slideLeft() {
  console.log("left");

  if (position > -1) {
    position = -3;
  }
  position++;
  goToSlide();
}

opinionsSection.addEventListener("click", function (e) {
  // e.preventDefault(e);
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
// Testimonials

const testymonialsContainer = document.querySelector(".testymonials__section");
const testymonialBox = document.querySelectorAll(".testimonial__box");

document.addEventListener("click", function (e) {
  const clickedBox = e.target.closest(".testimonial__box");
  // console.log(clickedBox.classList.contains("big-picture"));
  if (!clickedBox) return;
  if (clickedBox.classList.contains("big-picture")) return;
  if (clickedBox) {
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
