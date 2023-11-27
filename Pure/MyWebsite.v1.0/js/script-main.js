const navLinks = document.querySelectorAll('.nav-link');

function handleScroll() {
  const scrollPosition = window.scrollY;

  document.querySelectorAll('.main h3').forEach((header) => {
    const headerPosition = header.offsetTop;

    if (scrollPosition + 85 >= headerPosition) {
      const headerId = header.getAttribute('id');
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${headerId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', handleScroll);
