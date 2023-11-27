var currentPath = window.location.pathname;

var headerElements = document.querySelectorAll('.header-elements');

headerElements.forEach(function (element) {
    if (element.getAttribute('id') === 'main' && currentPath.includes('index.html')) {
        element.classList.add('active');
    } else if (element.getAttribute('id') === 'feedback' && currentPath.includes('feedback.html')) {
        element.classList.add('active');
    }
});