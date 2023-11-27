const navLinksCnt = document.querySelector('.navLinks');
const navLinks = navLinksCnt.querySelectorAll('a');
const footerNavLinks = document.querySelector('.footerNavLinks');

navLinks.forEach(navLink => {
    if (location.href === navLink.href) {
        navLink.classList.add('active');
    } else if (location.href.includes('article')) {
        navLinks[2].classList.add('active');
    }
    // const copyNavLink = navLink.cloneNode(true);
    // footerNavLinks.appendChild(copyNavLink);
});

const articleNav = document.querySelector('.articleNav');
if (articleNav) {
    const articleNavLinks = articleNav.querySelectorAll('a');
    const article = document.querySelector('.article');
    const sections = article.querySelectorAll('section');

    articleNavLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            sections.forEach(section => {
                section.classList.remove('active');
                articleNavLinks.forEach(link => {
                    link.classList.remove('active');
                });
            });
            const target = article.querySelector(link.getAttribute('href'));
            target.classList.add('active');
            link.classList.add('active');

            scrollTo(0, 0);
        });
    });
}