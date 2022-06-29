const switchBtn = document.querySelector(".swap-button");
const iconContainer = document.querySelector(".habbit-icon-container");
const completedTrackers = document.querySelector(".completed-trackers");

let trackerState = false;
let user;

const getUserData = async () => {
  const accessToken = sessionStorage.getItem("accesstoken");
  const userId = jwt_decode(accessToken);
  const options = new Headers({
    accesstoken: sessionStorage.getItem("accesstoken"),
  });
  try {
    data = await fetch(
      `https://callback-cats-server.herokuapp.com/users/${userId.id}`,
      {
        headers: new Headers({
          accesstoken: sessionStorage.getItem("accesstoken"),
        }),
      }
    );
  } catch (err) {
    console.log(err);
  }

  let result = data.json();
  // this line might be wrong
  user = result.body.user;
};

window.addEventListener("DOMContentLoaded", async () => {
  let checkToken = sessionStorage.getItem("accesstoken");
  if (!checkToken) {
    return window.location.replace("/");
  } else {
    const loggedIn = await getUserData();
  }
});

switchBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  trackerState = !trackerState;
  if (!trackerState) {
    iconContainer.style.animationName = "slide-in";
    completedTrackers.style.animationName = "slide-out";
    switchBtn.textContent = "View Completed";
    switchBtn.style.animationName = "spin";
  } else {
    iconContainer.style.animationName = "slide-out";
    completedTrackers.style.animationName = "slide-in";
    switchBtn.textContent = "View in-progress";
    switchBtn.style.animationName = "unspin";
  }
});

const ctx = document.querySelector("#canvas-left").getContext("2d");

const labels = ["1", "2", "3", "4", "5", "6", "7"];

const data = {
  labels,
  datasets: [
    {
      data: [1, 2, 2, 3, 4, 5, 5, 6, 7],
      label: "Progress This Week",
    },
  ],
};

const config = { type: "line", data, options: { responsive: true } };

const myChart = new Chart(ctx, config);
