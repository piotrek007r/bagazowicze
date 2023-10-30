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
// Navigation bar actions

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
// OFFER NAVIGATION BAR

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
// SLIDER

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
    // window.location.href = "Gallery/index.html";
    window.location.href = "index.html#contact";
    console.log("click");
  });
});

//-----------------------------------------------------------
// CONTACT SECTION

const submitButton = document.querySelector(".contact__submit");
const inputField = document.querySelectorAll(".contact__input");
const contactForm = document.querySelector(".contact__form");
const modalSending = document.querySelector(".contact__modal--sending");
// const inputName = document.querySelector(".input-name");
// const inputPhone = document.querySelector(".input-phone");
// const inputMail = document.querySelector(".input-mail");
// const inputMessage = document.querySelector(".input-message");
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

  // Change this and remove e.preventDefault(); above when site gonna would be connected
  if (misstypedInputs[0]) {
    e.preventDefault();
  }
  modalSending.classList.remove("hidden");
  console.log("load");
});

document.addEventListener("DOMContentLoaded", function () {
  const desiredPath = "https://bagazowicze.netlify.app/index.html#section2";
  console.log(window.location.href);
  console.log(desiredPath);
  if (
    window.location.href ===
    "https://bagazowicze.netlify.app/index.html#section2"
  ) {
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

// document.addEventListener("DOMContentLoaded", function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const success = urlParams.get("success");

//   console.log(urlParams);

//   if (success === "true") {
//     // Display success modal or message
//     openSuccessModal(); // Define this function to display your success message or modal
//   }
// });
