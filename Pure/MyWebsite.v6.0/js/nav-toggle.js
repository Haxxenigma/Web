document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('nav-toggle-btn').addEventListener('click', () => {
        document.getElementById('page').classList.toggle('nav-show');
        document.getElementById('nav').classList.toggle('nav-show');
    });
});