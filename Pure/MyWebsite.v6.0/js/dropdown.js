document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('header-link-btn').addEventListener('click', () => {
        const dropdown = document.getElementById('dropdown');
        const headerArrow = document.getElementById('header-arrow');

        dropdown.classList.toggle('active');
        headerArrow.classList.toggle('active');
    })

    document.addEventListener('click', event => {
        const btn = document.getElementById('header-link-btn');
        const dropdown = document.getElementById('dropdown');
        const headerArrow = document.getElementById('header-arrow');

        if (!btn.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
            headerArrow.classList.remove('active');
        }
    })

    let aboutLinks = document.querySelectorAll('.link-body');

    aboutLinks.forEach(aboutLink => {
        let link = aboutLink.querySelector('a').getAttribute('href');
        let content = aboutLink.querySelector('a').innerHTML;

        const newLi = document.createElement('li');
        const newA = document.createElement('a');

        newA.setAttribute('href', link);
        newA.setAttribute('target', '_blank');
        newA.innerHTML = content;

        let dropdown = document.querySelector('.dropdown');
        dropdown.appendChild(newLi).appendChild(newA);
    });
});