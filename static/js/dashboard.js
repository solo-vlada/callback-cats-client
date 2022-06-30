const switchBtn = document.querySelector(".swap-button");
const iconContainer = document.querySelector(".habbit-icon-container");
const completedTrackers = document.querySelector(".completed-trackers");
const welcomeMessage = document.querySelector(".welcome-message");
const habits = document.querySelector("#habits");
const oldHabits = document.querySelector("#old-habits");

let trackerState = false;
let user;

const getUserData = async () => {
  let fetchUserData;
  const accessToken = sessionStorage.getItem("accesstoken");
  const userId = jwt_decode(accessToken);
  try {
    fetchUserData = await fetch(
      `https://callback-cats-server.herokuapp.com/users/${userId.id}`,
      {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          accesstoken: sessionStorage.getItem("accesstoken"),
        }),
      }
    );
  } catch (err) {
    console.log(err);
  }

  let result = await fetchUserData.json();
  // this line might be wrong
  console.log(result.data.user);
  return result.data.user;
};

window.addEventListener("DOMContentLoaded", async () => {
  let checkToken = sessionStorage.getItem("accesstoken");
  if (!checkToken) {
    return window.location.replace("/");
  } else {
    console.log("accesstoken present, getting user data.");
    user = await getUserData();
  }
  if (!user) {
    return window.location.replace("/");
  }
  welcomeMessage.textContent = `Welcome, ${user.username}`;
  user.habits.map((element, index) => {
    if (index > 5) return;
    // console.log(user.habits);
    const habitIcon = document.createElement("div");
    habitIcon.className = "habbit-icon";
    habitIcon.textContent = element.habitType;
    !element.completed ? habits.append(habitIcon) : oldHabits.append(habitIcon);
  });
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

async function logout() {
  const accessToken = sessionStorage.getItem("accesstoken");
  if (!accessToken) return;
  sessionStorage.clear("accesstoken");
  window.location.replace("/");
}

const logoutBtn = document.querySelector(".logout-button");
logoutBtn.addEventListener("click", () => {
  logout();
});
