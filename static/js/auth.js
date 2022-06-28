async function requestLogin(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        //UPDATE WITH SERVER LINK
        const r = await fetch(`http://localhost:3000/users/login`, options);
        const data = await r.json();
        if (data.err){throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}


async function requestRegistration(e) {
    e.preventDefault();

    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        //UPDATE WITH SERVER LINK
        const r = await fetch(`http://localhost:3000/users/register`, options);
        const data  = await r.json();
        if(data.err) {throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(data) {
    console.log(data);
    const payload = jwt_decode(data.token);
    console.log(payload);
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', payload.username);
    localStorag.setItem('email', payload.email);
    location.hash = '#dashboard';

}

function logout(){
    localStorage.clear();
    location.hash = '#login';
}

function currentUser() {
    const usernme = localStorage.getItem('username')
    return usernme;
}
