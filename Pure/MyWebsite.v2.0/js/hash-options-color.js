var currentPath = window.location.pathname;

var topBarButtons = document.querySelectorAll('.option');

topBarButtons.forEach(function (button) {
    if (button.getAttribute('id') === 'md5' && currentPath.includes('md5-hash.html')) {
        button.classList.add('active');
    } else if (button.getAttribute('id') === 'sha' && currentPath.includes('sha-hash.html')) {
        button.classList.add('active');
    }
});
