"use strict";

//-----------------------------------------------------------
// Loading page

//-----------------------------------------------------------
// Hamburger actions

const hamburgerIcon = document.querySelector(".hamburger-menu__icon");
const mobileSideBar = document.querySelector(".mobile-navigation-bar");
const backdropFilter = document.querySelector(".backdrop-filter");

document.addEventListener("click", function (e) {
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
    mobileSideBar.classList.toggle("is-active");
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
  console.log(e.target);
  offerContainers.forEach((container) => {
    container.classList.add("hidden");

    if (container.getAttribute("data-tab") === dataTab) {
      container.classList.remove("hidden");
    }
  });
});

//-----------------------------------------------------------
// Slider

const opinionsContainer = document.querySelector(".opinions__section");
const opinionBox = document.querySelectorAll(".opinions__box");
let position = 0;

function goToSlide() {
  console.log(position);
  opinionBox.forEach((el, i) => {
    el.style.transform = `translateX(${(position - i) * 100}%)`;
  });
}

opinionsContainer.addEventListener("click", function (e) {
  const btnCliked = e.target.closest(".opinions__btn");
  if (!btnCliked) return;

  if (btnCliked.classList.contains("opinions__btn-right")) {
    if (position < 1) position = 3;
    position--;
    goToSlide();
  } else {
    if (position > 1) position = -1;
    position++;
    goToSlide();
  }
});
