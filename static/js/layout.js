const nav = document.querySelector("nav");

const publicRoutes = ['#', '#login', '#register'];
const privateRoutes = ['#habit', '#frequency', '#dashboard'];

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
            case '#habit':
                renderHabitForm();
                break;
            case '#frequency':
                renderFrequencyForm();
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
            <img class="logo" src="#" alt="logo">
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
