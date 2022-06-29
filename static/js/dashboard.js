const switchBtn = document.querySelector(".swap-button");
const iconContainer = document.querySelector(".habbit-icon-container");
const completedTrackers = document.querySelector(".completed-trackers");
const welcomeMessage = document.querySelector(".welcome-message");
const habits = document.querySelector("#habits");
const oldHabits = document.querySelector("#oldhabits");
const getUserData = require("./getUserData");

let trackerState = false;
let user;

const getUserData = async () => {
  let fetchData;
  const accessToken = sessionStorage.getItem("accesstoken");
  const userId = jwt_decode(accessToken);
  try {
    fetchData = await fetch(
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

  let result = await fetchData.json();
  // this line might be wrong
  return result.data.user;
};

window.addEventListener("DOMContentLoaded", async () => {
  let checkToken = sessionStorage.getItem("accesstoken");
  if (!checkToken) {
    return window.location.replace("/");
  } else {
    user = await getUserData();
  }
  if (!user) {
    return window.location.replace("/");
  }
  welcomeMessage.textContent = `Welcome, ${user.username}`;
  user.habits.map((element) => {
    const habitIcon = document.createElement("div");
    habitIcon.className = "habbit-icon";
    habitIcon.textContent = element.habitType;
    habits.append(habitIcon);
  });
  user && user.habits.map((habit) => chart1Arr.push(habit.toString()));
  // await renderChart1();
  console.log(user);
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

// GRAPHS API ////////////////////////////////////////////////////

const renderChart1 = async () => {
  const ctx = document.querySelector("#canvas-left").getContext("2d");
  const labels = [1, 2, 3, 4, 5, 6, 7];

  const data = {
    labels,
    datasets: [
      {
        data: [1, 2, 2, 3, 4, 5, 5, 6, 7],
        label: "Progress This Week",
      },
    ],
  };

  const config = { type: "bar", data, options: { responsive: true } };

  const myChart = new Chart(ctx, config);
};

// GRAPHS API ////////////////////////////////////////////////////
