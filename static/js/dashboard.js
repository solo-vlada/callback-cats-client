const switchBtn = document.querySelector(".swap-button");
const iconContainer = document.querySelector(".habbit-icon-container");
const completedTrackers = document.querySelector(".completed-trackers");
const welcomeMessage = document.querySelector(".welcome-message");
const habits = document.querySelector("#habits");
const oldHabits = document.querySelector("#old-habits");
const completedChart = document.querySelector("#completed-chart");
const singleHabitView = document.querySelector("#single-habit-view");
const userOverview = document.querySelector("#user-overview");
const newHabitBtn = document.querySelector(".add");
const habitTitle = document.querySelector(".habit-title");
let selectedHabit;

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
        class: "fa-solid fa-carrot",
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
        class: "fa-solid fa-dog",
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
  // USER HAS BEEN POPULATED HERE!/////////////////////////////////////////

  populateOverallStats(user.habits);

  welcomeMessage.textContent = `Welcome, ${user.username}`;
  if (user.habits.length === 0) {
    const firstHabitMessage = document.createElement("h1");
    firstHabitMessage.textContent = "Track your first habit!";
    switchBtn.style.display = "none";
    newHabitBtn.style.transform = "translateY(-250px)";
    userOverview.style.display = "none";
    const statsContainer = document.querySelector(".stats-container");
    statsContainer.style.display = "none";

    return habits.append(firstHabitMessage);
    //  HIDE THE ADD TRACKER BUTTON, THEY ARE MAXED OUT.
  } else if (user.habits.length >= 6) {
    newHabitBtn.style.display = "none";
  }
  let completed = user.habits.filter((habit) => habit.completed).length;
  let active = user.habits.filter((habit) => !habit.completed).length;
  user.habits.map(async (element, index) => {
    const habitIcon = document.createElement("div");
    const block = document.createElement("div");
    block.style.backgroundColor = "green";

    // progress bar
    const progressBar = document.querySelector(".completion-progress-bar");
    const tick = await element.days.length;

    for (let i = 0; i < tick; i++) {
      progressBar.append(block);
    }

    const habitIllustration = document.createElement("i");

    // habit click/////////////////////////////////////////////////
    habitIllustration.addEventListener("click", () => {
      userOverview.style.animationName = "slide-out";
      singleHabitView.style.display = "flex";
      singleHabitView.style.animationName = "slide-in";
      generateHabitStats(element);
      selectedHabit = element;
      habitTitle.textContent = habitFormatter(element.habitType).title;
      window.scroll({ behavior: "smooth", top: 900 });
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
    switchBtn.textContent = "Completed";
    switchBtn.style.animationName = "spin";
  } else {
    iconContainer.style.animationName = "slide-out";
    completedTrackers.style.animationName = "slide-in";
    switchBtn.textContent = "Active";
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
  // console.log("habit title", habitFormatter(habit.habitType).title);
  // console.log("current streak", habit.currentStreak);
  // console.log("how many times per day", habit.frequencyPerDay);
  // console.log(habit._id);
};

const populateOverallStats = async (habits) => {
  const overall = document.querySelector("#overall-habits");
  const activeCount = document.querySelector("#active-count");
  const completeCount = document.querySelector("#completed-count");
  overall.textContent = "Overall: " + habits.length;
  activeCount.textContent =
    "Active: " + habits.filter((habit) => !habit.completed).length;
  completeCount.textContent =
    "Completed: " + habits.filter((habit) => habit.completed).length;
};

const statsButton = document.querySelector(".stats-button");
statsButton.addEventListener("click", (e) => {
  e.stopPropagation();
  singleHabitView.style.animationName = "slide-out";
  userOverview.style.animationName = "slide-in";
});

newHabitBtn.addEventListener("click", () => {
  window.location.replace("/habit.html");
});

const deleteBtn = document.querySelector(".delete-btn");
deleteBtn.addEventListener("click", async () => {
  await fetch(
    `https://callback-cats-server.herokuapp.com/habits/${selectedHabit._id}`,
    {
      method: "DELETE",
      mode: "cors",
      headers: new Headers({
        accesstoken: sessionStorage.getItem("accesstoken"),
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return;
      window.location.replace("/dashboard.html");
    })
    .catch((err) => console.log(err));
});

const incrementHabit = async () => {
  const habitType = selectedHabit.habitType;
  await fetch(
    `https://callback-cats-server.herokuapp.com/habits/${selectedHabit._id}`,
    // `http://localhost:3000/habits/${selectedHabit._id}`,
    {
      method: "PUT",
      mode: "cors",
      headers: new Headers({
        accesstoken: sessionStorage.getItem("accesstoken"),
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ habitType }),
    }
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const incrementBtn = document.querySelector(".increment-btn");
incrementBtn.addEventListener("click", () => {
  incrementHabit();
  console.log(selectedHabit.habitType);
});
