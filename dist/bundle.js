(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
async function requestLogin(e) {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ username, password }),
    };
    //UPDATE WITH SERVER LINK
    const r = await fetch(
      `https://callback-cats-server.herokuapp.com/users/login`,
      options
    );
    const data = await r.json();
    if (data.err) {
      throw Error(data.err);
    }
    if (data.success) {
      sessionStorage.setItem("accesstoken", data.accessToken);
      window.location.replace("/dashboard.html");
    }
    //  login(data);
  } catch (err) {
    console.warn(`Error: ${err}`);
  }
}

const registerForm = document.querySelector('#registerForm');


async function requestRegistration(e) {
  e.preventDefault();
  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ username, email, password }),
    };
    //UPDATE WITH SERVER LINK
    const r = await fetch(
      `https://callback-cats-server.herokuapp.com/users/register`,
      options
    );
    const data = await r.json();
    if (data.err) {
      throw Error(data.err);
    }
    requestLogin(e);
  } catch (err) {
    console.warn(err);
  }
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  requestRegistration(e);
  window.location.replace("/habit.html");
});

//REMOVE CODE BELOW
// async function postFrequency(e) {
// 	e.preventDefault();
// 	try {
// 		const options = {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
// 		};
// 		//UPDATE WITH SERVER LINK
// 		const r = await fetch(`http://localhost:3000/users/habits`, options);
// 		const data = await r.json();
// 		if (data.err) {
// 			throw Error(data.err);
// 		}
// 	} catch (err) {
// 		console.warn(err);
// 	}
// }

//REMOVE THIS CODE
// async function login(data) {
// 	console.log(data);
// 	// const payload = jwt_decode(data.token);
// 	// console.log(payload);
// 	await localStorage.setItem('token', data.accessToken);
// 	location.hash = '#dashboard';
// 	if (data.success) {
// 		window.location.replace('/dashboard.html');
// 	}
// }

function logout() {
  localStorage.clear();
  location.hash = "#login";
}

//REMOVE THIS CODE
function currentUser() {
  const usernme = localStorage.getItem("username");
  return usernme;
}

},{}],2:[function(require,module,exports){
const main = document.querySelector("main");
const header = document.createElement('h2');
const header2 = document.createElement('h2');


//Creates a login form
function renderLoginForm() {
    const fields =  [
        {tag:'input', attributes: { type:'text', name:'username', placeholder:'Username' }},
        {tag:'input', attributes: { type:'password', name:'password', placeholder:'Email' }},
        {tag:'input', attributes: { type:'submit', value:'Login'}},
    ];
    header.textContent = "Login";
    const form = document.createElement('form');
    fields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => field.setAttribute(a,v))
        form.appendChild(field);
    })
    form.addEventListener('submit', requestLogin)
    main.appendChild(header);
    main.appendChild(form);
}

//Creates a registration form 
function renderRegisterForm() {
    const fields = [
        {tag:'input', attributes: { type:'text', name:'username', placeholder:'Username' }},
        {tag:'input', attributes: { type:'email', name:'email', placeholder:'Email' }},
        {tag:'input', attributes: { type:'password', name:'password', placeholder:'Password' }},
        {tag:'input', attributes: { type:'password', name:'passwordConfirmation', placeholder:'Confirm password' }},
        {tag:'input', attributes: { type:'submit', value:'Create Account'}},
    ];

    header.textContent = "Register";
    const form = document.createElement('form');
    fields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => field.setAttribute(a,v))
        form.appendChild(field);
    });
    form.addEventListener('submit', requestRegistration)
    main.appendChild(header);
    main.appendChild(form);
}

//Creates a checkbox to choose a habit 
function renderHabitForm() {
    let checkboxForm = document.createElement('form');
    const habits = ['Exercise 30 min', 'Drink 8 glasses of water', 'Get 8 hours of sleep', 'Healthy meal', 'Don\'t smoke', 'Walk the dog'];

    header.textContent = "Choose a habit that you want to practise";

    for (let i = 0; i < habits.length; i++) {
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = habits[i];
        checkBox.name = habits[i];
        checkBox.value = habits[i];


        let label = document.createElement('label');
        label.htmlFor = habits[i];
        label.appendChild(document.createTextNode(habits[i]));
        let br = document.createElement('br');
    
        checkboxForm.appendChild(checkBox);
        checkboxForm.appendChild(label);
        checkboxForm.appendChild(br);
        
    }
    let button = document.createElement('input');
    button.setAttribute("type", "submit");
    checkboxForm.appendChild(button);
    checkboxForm.addEventListener('submit', renderFrequencyForm)
    main.appendChild(header);
    main.appendChild(checkboxForm);

};

// Createas a checkbox form to choose a frequecy 
function renderFrequencyForm () {
    let checkboxForm = document.createElement('form');
    const frequency = [ 'Hourly', 'Daily', 'Weekly', '3-times a day'];

    header2.textContent = "Choose a frequency with which you would like to practice you habit";

    for (let i = 0; i < frequency.length; i++) {
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = frequency[i];
        checkBox.name = frequency[i];
        checkBox.value = frequency[i];


        let label = document.createElement('label');
        label.htmlFor = frequency[i];
        label.appendChild(document.createTextNode(frequency[i]));
        
        let br = document.createElement('br');
    
        checkboxForm.appendChild(checkBox);
        checkboxForm.appendChild(label);
        checkboxForm.appendChild(br);
        
    }
    let button = document.createElement('input');
    button.setAttribute("type", "submit");
    checkboxForm.appendChild(button);
    checkboxForm.addEventListener('submit', postHabit);
    main.appendChild(header2);
    main.appendChild(checkboxForm);
}


function render404() {
    header.textContent = "Oops, we can't find that page sorry!";
}


},{}],3:[function(require,module,exports){
// dom variables
const msf_getFsTag = document.getElementsByTagName("fieldset");

// declaring the active fieldset & the total fieldset count
let msf_form_nr = 0;
let fieldset = msf_getFsTag[msf_form_nr];
fieldset.className = "msf_show";

// creates and stores a number of bullets
let msf_bullet_nr = "<div class='msf_bullet'></div>";
let msf_length = msf_getFsTag.length;
for (let i = 1; i < msf_length; ++i) {
  msf_bullet_nr += "<div class='msf_bullet'></div>";
}
// injects bullets
let msf_bullet_o = document.getElementsByClassName("msf_bullet_o");
for (let i = 0; i < msf_bullet_o.length; ++i) {
  let msf_b_item = msf_bullet_o[i];
  msf_b_item.innerHTML = msf_bullet_nr;
}

// removes the first back button & the last next button
//document.getElementsByName("back")[0].className = "msf_hide";
// document.getElementsByName("next")[msf_bullet_o.length - 1].className = "msf_hide";

// Makes the first dot active
let msf_bullets = document.getElementsByClassName("msf_bullet");
msf_bullets[msf_form_nr].className += " msf_bullet_active";

// Validation loop & goes to the next step
function msf_btn_next() {
  let msf_val = true;

  let msf_fs = document.querySelectorAll("fieldset")[msf_form_nr];
  let msf_fs_i_count = msf_fs.querySelectorAll("input").length;

  for (i = 0; i < msf_fs_i_count; ++i) {
    let msf_input_s = msf_fs.querySelectorAll("input")[i];
    if (msf_input_s.getAttribute("type") === "button") {
      // nothing happens
    } else {
      if (msf_input_s.value === "") {
        msf_input_s.style.backgroundColor = "pink";
        msf_val = false;
      } else {
        if (msf_val === false) {
        } else {
          msf_val = true;
          msf_input_s.style.backgroundColor = "lime";
        }
      }
    }
  }
  if (msf_val === true) {
    // goes to the next step
    var selection = msf_getFsTag[msf_form_nr];
    selection.className = "msf_hide";
    msf_form_nr = msf_form_nr + 1;
    var selection = msf_getFsTag[msf_form_nr];
    selection.className = "msf_show";
    // refreshes the bullet
    var msf_bullets_a = msf_form_nr * msf_length + msf_form_nr;
    msf_bullets[msf_bullets_a].className += " msf_bullet_active";
  }
}

// goes one step back
function msf_btn_back() {
  msf_getFsTag[msf_form_nr].className = "msf_hide";
  msf_form_nr = msf_form_nr - 1;
  msf_getFsTag[msf_form_nr].className = "msf_show";
}

console.log("loaded");

//  habit form /////////////////////////////////////////////
const habitForm = document.querySelector("#habit-form");

async function postHabit(e) {
  e.preventDefault();

  try {
    const options = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        accesstoken: sessionStorage.getItem("accesstoken"),
      }),
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    };
    //UPDATE WITH SERVER LINK
    const r = await fetch(
      `https://callback-cats-server.herokuapp.com/habits`,
      // "http://localhost:3000/habits",
      options
    );
    // console.log("submitted to front end");
    const data = await r.json();

    if (!data.err) {
      return data;
    } else {
      console.log(data.err);
      throw Error(data.err);
    }
  } catch (err) {
    console.warn(err);
  }
}

habitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const result = await postHabit(e);
});
//  habit form /////////////////////////////////////////////

},{}],4:[function(require,module,exports){
const switchBtn = document.querySelector(".swap-button");
const iconContainer = document.querySelector(".habbit-icon-container");
const completedTrackers = document.querySelector(".completed-trackers");
const welcomeMessage = document.querySelector(".welcome-message");
const habits = document.querySelector("#habits");
const oldHabits = document.querySelector("#old-habits");
const getUserData = require("./getUserData");

let trackerState = false;
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

},{"./getUserData":5}],5:[function(require,module,exports){
const getUserData = async () => {
  let fetchUserData;
  const accessToken = sessionStorage.getItem("accesstoken");
  const userId = jwt_decode(accessToken);
  const options = new Headers({
    accesstoken: sessionStorage.getItem("accesstoken"),
  });
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
  return result.data.user;
};

module.exports = getUserData;

},{}],6:[function(require,module,exports){
const nav = document.querySelector("nav");

const publicRoutes = ['#', '#login', '#register'];
const privateRoutes = ['#new-habit', '#dashboard'];

window.addEventListener('hashchange', updateContent);

function updateNav() {
    nav.innerHTML = '';
    let links; 
    let logoutBtn;
    links = publicRoutes.map(createNavLink);
    privateLinks = privateRoutes.map(createNavLink);
    // if(currentUser()){
    //     links = privateRoutes.map(createNavLink);
    //     logoutBtn = document.createElement('button');
    //     logoutBtn.textContent = 'Logout';
    //     logoutBtn.onclick = logout;
    //     nav.appendChild(logoutBtn);
    // } else {
    //     links = publicRoutes.map(createNavLink);
    // }
        links.forEach(l => nav.insertBefore(l, logoutBtn));
        privateLinks.forEach(l=> nav.insertBefore(l, logoutBtn));
    };


function updateMain(path) {
    main.innerHTML = '';
    if(path) {
        switch(path) {
            case '#login':
                renderLoginForm();
                break;
            case '#register':
                renderRegisterForm();
                break;
            case '#new-habit':
                renderHabitForm();
                break;
            case '#dashboard':
                renderDashboard();
                break;
            default:
                render404()
                break;
        }
    } else {
        main.innerHTML += `
            <h1 class="title">Develop good habits!</h1>
            <img class="logo" src="/static/img/habits-hero.png" alt="logo">
            <p class="description">Description...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales mi a risus fermentum vestibulum. Morbi quis massa facilisis, aliquet dui vel, fermentum metus. Fusce mauris tortor, viverra sit amet mi in, accumsan aliquet tortor.</p>
        `;
        }
    }

function createNavLink(route) {
    const link = document.createElement('a');
    link.textContent = route ==='#' ? 'Home' : `${route[1].toUpperCase()}${route.substring(2)}`; 
    link.href = route;
    return link;
}


function updateContent() {
    const path = window.location.hash;
    updateNav();
    updateMain(path);
//     if (privateRoutes.includes(path) && !currentUser()){
//         window.location.hash = '#';
//     } else {
//     updateNav();
//     updateMain(path);
// }
}

updateContent();

},{}],7:[function(require,module,exports){
const { getUserData } = require("./getUserData");

if (window.location === "/habit.html") {
  user ? console.log("user logged in") : console.log("user is not logged in.");
}

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
});

module.exports = user;

},{"./getUserData":5}],8:[function(require,module,exports){
async function getAllUsers() {
    try {
        //UPDATE WITH SERVER LINK
        const options = {headers: new Headers({'Authorization': localStorage.getItem('token')})}
        const response = await fetch('https://callback-cats-server.herokuapp.com/users', options);
        const data = await response.json();
        return data;
    
    } catch (err) {
        console.warn(err);
    }
}

},{}]},{},[1,2,3,4,5,6,7,8]);
