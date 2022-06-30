const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

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

async function logout() {
  const accessToken = sessionStorage.getItem("accesstoken");
  if (!accessToken) return;
  sessionStorage.clear("accesstoken");
  window.location.replace("/");
}

//REMOVE THIS CODE
// function currentUser() {
//   const usernme = localStorage.getItem("username");
//   return usernme;
// }
