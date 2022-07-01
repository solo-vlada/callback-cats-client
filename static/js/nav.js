const burger = document.querySelector(".burger");
const dropdownMenu = document.querySelector("#dropdown-menu");

// this state globally tracks whether the dropdown menu is true or false
let menuState = false;

// push the dropdown back up
const hideDropdown = () => {
  menuState = false;
  dropdownMenu.style.animationName = "dropup";
};

// drop down menu comes down from burger menu
const showDropdown = () => {
  menuState = true;
  dropdownMenu.style.animationName = "dropdown";
};

// use state to check true or false, show or hide the dropdown menu
burger.addEventListener("click", (e) => {
  e.stopPropagation();
  !menuState ? showDropdown() : hideDropdown();
});

// if menu is visible, but user clicks anywhere on screen, hide the dropdown
window.addEventListener("click", (e) => {
  e.stopPropagation();
  if (menuState) return hideDropdown();
});

// if user window goes above small screen width while dropdown is visible, hide it!
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    hideDropdown();
  }
});

// Check if user is logged in, if they are, go to the dashboard!

const areYouThere = async () => {
  const accessToken = sessionStorage.getItem("accesstoken");
  if (!accessToken) return;
  window.location.replace("/dashboard.html");
};
window.addEventListener("DOMContentLoaded", () => {
  areYouThere();
});
