const switchBtn = document.querySelector(".swap-button");
const iconContainer = document.querySelector(".habbit-icon-container");
const completedTrackers = document.querySelector(".completed-trackers");

let trackerState = true;

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

// onload, fetch the users data.

// let user;

// const getUserStats = async () => {
//   let id = sessionStorage.getItem("id");
//   const result = await fetch(`http://localhost:3000/user/${id}`{mode:"no-cors"});
//   const user = result.json();
//   console.log(user);
// };

// getUserStats();
