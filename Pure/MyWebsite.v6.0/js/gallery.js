document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.gallery-ctr');

  container.addEventListener('wheel', event => {
    event.preventDefault();

    const direction = event.deltaY > 0 ? 1 : -1;

    container.scrollLeft += direction * 100;

    container.scrollLeft = Math.max(0, Math.min(container.scrollLeft, container.scrollWidth - container.offsetWidth));
  });

  let images = document.querySelectorAll('.image');
  let timer;

  images.forEach(image => {
    let img = image.querySelector('.img');
    let imgInfo = image.querySelector('.img-info');

    let imgLink = imgInfo.querySelector('a').getAttribute('href');
    let imgCaption = imgInfo.querySelector('a').innerHTML;

    img.querySelector('a').setAttribute('href', imgLink);
    img.querySelector('img').setAttribute('alt', imgCaption);
    img.querySelector('a').innerHTML = imgCaption;

    img.querySelector('img').addEventListener('click', () => {
      window.open(imgInfo.querySelector('a').getAttribute('href'));
    })

    image.addEventListener("mouseenter", event => {
      timer = setTimeout(() => {
        imgInfo.classList.add('show');
      }, 500);
    });

    image.addEventListener("mouseleave", () => {
      clearTimeout(timer);
      imgInfo.classList.remove('show');
    });
  });
});

