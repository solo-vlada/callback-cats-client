const { getUserData } = require("./getUserData");

let user;
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
  user.habits.map((element) => {
    const habitIcon = document.createElement("div");
    habitIcon.className = "habbit-icon";
    habitIcon.textContent = element.habitType;
    habits.append(habitIcon);
  });
  user && user.habits.map((habit) => chart1Arr.push(habit.toString()));
  await renderChart1();
  console.log(user);
  user ? console.log("user logged in") : console.log("user is not logged in.");
});

module.exports = user;
