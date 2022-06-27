const navLinks = document.querySelectorAll("a.navLink");
const main = document.querySelector("main");

window.addEventListener('hashchange', updateContent);

function updateNav(hash) {
    const updateLink = link => {
        link.classList = (link.textContent == '+' && hash.includes('new') || hash.includes(link.textContent)) ? ['navLink', 'current'] : ['navLink']
    };

    navLinks.forEach(updateLink);
}
