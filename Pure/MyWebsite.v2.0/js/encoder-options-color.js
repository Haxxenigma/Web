var currentPath = window.location.pathname;

var topBarButtons = document.querySelectorAll('.option');

topBarButtons.forEach(function (button) {
  if (button.getAttribute('id') === 'hex' && currentPath.includes('hex-encoder.html')) {
    button.classList.add('active');
  } else if (button.getAttribute('id') === 'url' && currentPath.includes('url-encoder.html')) {
    button.classList.add('active');
  } else if (button.getAttribute('id') === 'base64' && currentPath.includes('base64-encoder.html')) {
    button.classList.add('active');
  }
});
