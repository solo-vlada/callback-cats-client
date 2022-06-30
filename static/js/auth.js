
const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const lgtBtn = document.querySelector(".logout");


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
    console.log(data);
    if (data.success) {
      sessionStorage.setItem("accesstoken", data.accessToken);
      window.location.replace("/dashboard.html");
    }
    //  login(data);
  } catch (err) {
    console.warn(`Error: ${err}`);
  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  requestLogin(e);
});

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



lgtBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.replace("/index.html");
  localStorage.clear();
  sessionStorage.clear("accesstoken");
  
});

