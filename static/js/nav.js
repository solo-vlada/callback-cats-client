const burger = document.querySelector(".burger");
const dropdownMenu = document.querySelector("#dropdown-menu");

let menuState = false;
const hideDropdown = () => {
  menuState = false;
  dropdownMenu.style.animationName = "dropup";
};

const showDropdown = () => {
  menuState = true;
  dropdownMenu.style.animationName = "dropdown";
};

burger.addEventListener("click", (e) => {
  e.stopPropagation();
  !menuState ? showDropdown() : hideDropdown();
});

window.addEventListener("click", (e) => {
  e.stopPropagation();
  if (menuState) return hideDropdown();
});
