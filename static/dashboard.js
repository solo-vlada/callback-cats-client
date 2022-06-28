const switchBtn = document.querySelector(".swap-button");
const iconContainer = document.querySelector(".habbit-icon-container");
const completedTrackers = document.querySelector(".completed-trackers");

let trackerState = true;

let userData;

const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  const result = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => res.json())
    .then((data) => (userData = data))
    .catch((err) => console.log(err));
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const result = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => res.json())
    .then((data) => (userData = data))
    .catch((err) => console.log(err));
});

const getUserData = async () => {
  const data = await fetch("http://localhost:3000/users/:id", {
    headers: {
      accesstoken: sessionStorage.getItem.accessToken,
    },
  });
  userData = data.json();
};

window.addEventListener("DOMContentLoaded", () => {});

switchBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  trackerState = !trackerState;
  if (!trackerState) {
    iconContainer.style.animationName = "slide-in";
    completedTrackers.style.animationName = "slide-out";
    switchBtn.textContent = "View in-progress";
    switchBtn.style.animationName = "spin";
  } else {
    iconContainer.style.animationName = "slide-out";
    completedTrackers.style.animationName = "slide-in";
    switchBtn.textContent = "View Completed";
    switchBtn.style.animationName = "unspin";
  }
});
