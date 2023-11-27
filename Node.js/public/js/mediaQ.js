const mediaQ = window.matchMedia('(max-width: 500px)');
const profileMenu = document.querySelector('.profileMenu');
const profileMenuLink = document.querySelector('.profileMenuLink');
const createBtn = document.getElementById('adminCntCreateBtn');

if (mediaQ.matches) {
    profileMenu.classList.remove('profileMenuHoverable');
    profileMenuLink.addEventListener('click', (e) => {
        e.preventDefault();
        profileMenu.classList.toggle('active');
    });
    if (createBtn) {
        createBtn.innerHTML = '+';
    }
}