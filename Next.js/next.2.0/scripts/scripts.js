export const createRipples = (e, styles) => {
    const ripples = document.createElement('span');

    const XPos = e.clientX - e.target.parentElement.offsetLeft;
    const YPos = e.clientY - e.target.parentElement.offsetTop;

    ripples.style.left = XPos + 'px';
    ripples.style.top = YPos + 'px';

    e.target.appendChild(ripples);
    ripples.classList.add(styles.ripples);

    setTimeout(() => {
        ripples.remove();
    }, 1500);
};