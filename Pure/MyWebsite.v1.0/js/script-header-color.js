var currentPath = window.location.pathname;
var topBarButtons = document.querySelectorAll('.header-elements');

topBarButtons.forEach(function (button) {
  if (button.getAttribute('id') === 'header-main' && currentPath.includes('main.html')) {
    button.classList.add('active');
  } else if (button.getAttribute('id') === 'header-gallery' && currentPath.includes('gallery.html')) {
    button.classList.add('active');
  } else if (button.getAttribute('id') === 'header-contact' && currentPath.includes('contact.html')) {
    button.classList.add('active');
  }
});

var currentPath2 = window.location.pathname;
var topBarButtons2 = document.querySelectorAll('.sub-header-elements');

topBarButtons2.forEach(function (button) {
  if (button.getAttribute('id') === 'sub-header-profile' && currentPath2.includes('profile.html')) {
    button.classList.add('sub-active-main');
  } else if (button.getAttribute('id') === 'sub-header-signin' && currentPath2.includes('signin.html')) {
    button.classList.add('sub-active-point');
  } else if (button.getAttribute('id') === 'sub-header-signup' && currentPath2.includes('signup.html')) {
    button.classList.add('sub-active-point');
  }
});