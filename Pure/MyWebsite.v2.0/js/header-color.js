var currentPath = window.location.pathname;

var topBarButtons = document.querySelectorAll('.navbar-elements');

topBarButtons.forEach(function (button) {
  if (button.getAttribute('id') === 'main' && currentPath.includes('index.html')) {
    button.classList.add('active');
  } else if (button.getAttribute('id') === 'hashg' && (currentPath.includes('md5-hash.html') || currentPath.includes('sha-hash.html'))) {
    button.classList.add('active');
  } else if (button.getAttribute('id') === 'encdec' && (currentPath.includes('hex-encoder.html') || currentPath.includes('url-encoder.html') || currentPath.includes('base64-encoder.html'))) {
    button.classList.add('active');
  } else if (button.getAttribute('id') === 'profile' && currentPath.includes('profile.html')) {
    button.classList.add('active');
  }
});
