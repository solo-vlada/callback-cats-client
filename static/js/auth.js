
const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');



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
      // window.location.replace("/dashboard.html");
    }
    //  login(data);
  } catch (err) {
    console.warn(`Error: ${err}`);
  }
}

loginForm.addEventListener("submit", async (e) =>  {
  e.preventDefault();
  let result = await requestLogin(e);
  window.location.replace("/dashboard.html");
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
      mode: "cors",
      body: JSON.stringify({ username, email, password }),
    };
    //UPDATE WITH SERVER LINK
    const r = await fetch(
      `https://callback-cats-server.herokuapp.com/users/register`,
      options
    );
    const data = await r.json();
    console.log(data);
    console.log(typeof data.status);
    if (data.err) {
      throw Error(data.err);
    }
    if (data.status === 201) {
      let result = await requestLogin(e);
      window.location.replace("/habit.html");
    }
  } catch (err) {
    console.warn(err);
  }
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  requestRegistration(e);
  //const result = await requestLogin(e);
  // window.location.replace("/habit.html");

});


