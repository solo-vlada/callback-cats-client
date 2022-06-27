const navLinks = document.querySelectorAll("a.navLink");
const main = document.querySelector("main");

window.addEventListener('hashchange', updateContent);

function updateNav(hash) {
    const updateLink = link => {
        link.classList = (link.textContent == '+' && hash.includes('new') || hash.includes(link.textContent)) ? ['navLink', 'current'] : ['navLink']
    };

    navLinks.forEach(updateLink);
}

function updateMain(hash) {
    main.innerHTML = '';
    if(hash) {
        let [category, id] = hash.split('/');
        id ? loadModalFor(category,id) : loadIndexFor(category)
    } else {
        main.innerHTML += `
            <h1 class="title">Develop good habits!</h1>
            <img class="logo" src="#" alt="logo">
            <p class="description">Description...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales mi a risus fermentum vestibulum. Morbi quis massa facilisis, aliquet dui vel, fermentum metus. Fusce mauris tortor, viverra sit amet mi in, accumsan aliquet tortor.</p>
        `;
        }
    }

function updateContent() {
    let hash = window.location.hash.substring(1);
    updateNav(hash);
    updateMain(hash);
}
