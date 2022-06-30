const switchBtn = document.querySelector(".swap-button");
const iconContainer = document.querySelector(".habbit-icon-container");
const completedTrackers = document.querySelector(".completed-trackers");
const welcomeMessage = document.querySelector(".welcome-message");
const habits = document.querySelector("#habits");
const oldHabits = document.querySelector("#old-habits");
const completedChart = document.querySelector("#completed-chart");

const habitFormatter = (num) => {
  switch (num) {
    case 1:
      return (habitType = {
        title: "Exercise 30 min",
        class: "fa-solid fa-person-running",
      });
      break;
    case 2:
      return (habitType = {
        title: "drink water",
        class: "fa-solid fa-faucet-drip",
      });
      break;
    case 3:
      return (habitType = {
        title: "Get 8 hours of sleep",
        class: "fa-solid fa-bed",
      });
      break;
    case 4:
      return (habitType = {
        title: "Healthy meal",
        class: "fa-solid fa-blueberries",
      });
      break;
    case 5:
      return (habitType = {
        title: "Don't smoke",
        class: "fa-solid fa-ban-smoking",
      });
      break;
    case 6:
      return (habitType = {
        title: "Walk the dog",
        class: "fa-solid fa-dog-leashed",
      });
      break;
    default:
      return "Get good";
      break;
  }
};

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
  const generateGraph = (containerElement) => {
    // GRAPHS API ////////////////////////////////////////////////////
    const ctx = containerElement.getContext("2d");
    const labels = ["active", "completed", 3, 4, 5, 6, 7];

    // gradient fill

    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(104, 188, 74, 0.1)");
    gradient.addColorStop(1, "rgba(104, 188, 74, 1)");
    //////////////////  //
    let delayed;
    const data = {
      labels,
      datasets: [
        {
          data: [`${active}`, `${completed}`, "3", "40", "15", "62", "7"],
          label: "Trackers",
          // tension: 0.6,
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (
                context.type === "data" &&
                context.mode === "default" &&
                !delayed
              ) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
        },
      ],
    };

    const config = {
      type: "line",
      data,
      options: {
        hitRadius: 30,
        radius: 5,
        hoverRadius: 10,
        fill: true,
        responsive: true,
        backgroundColor: gradient,
        borderColor: "#7dbfa7",
      },
    };

    const myChart = new Chart(ctx, config);

    // GRAPHS API ////////////////////////////////////////////////////
  };
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
  let completed = user.habits.filter((habit) => habit.completed).length;
  let active = user.habits.filter((habit) => !habit.completed).length;
  user.habits.map((element, index) => {
    const habitIcon = document.createElement("div");

    const habitIllustration = document.createElement("i");
    habitIllustration.addEventListener("click", () => {
      generateHabitStats(element);
    });
    habitIllustration.className = `${
      habitFormatter(element.habitType).class
    } habit-icon`;
    habitIcon.className = "habbit-icon";
    !element.completed
      ? habits.append(habitIllustration)
      : oldHabits.append(habitIllustration);
  });
  generateGraph(completedChart);
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

let currentHabit;

const generateHabitStats = (habit) => {
  const bestStreakP = document.querySelector(".streaks-count-p");
  bestStreakP.textContent = habit.bestStreak.toString();
  console.log("habit title", habitFormatter(habit.habitType).title);
  console.log("current streak", habit.currentStreak);
  console.log("how many times per day", habit.frequencyPerDay);
  bestStreak.append;
  console.log(habit._id);
};
