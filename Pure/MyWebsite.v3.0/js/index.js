document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('dropdown');
    const arrowSymbol = document.getElementById('arrow-symbol');
    const dropdownContent = document.getElementById('dropdown-content');

    if (!dropdown.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.classList.remove('show-dropdown');
        arrowSymbol.style.transform = 'scale(1.6) rotate(270deg)';
    }
})

function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdown-content');
    const arrowSymbol = document.getElementById('arrow-symbol');

    dropdownContent.classList.toggle('show-dropdown');

    if (dropdownContent.classList.contains('show-dropdown')) {
        arrowSymbol.style.transform = 'scale(1.6) rotate(90deg)';
    }
    else {
        arrowSymbol.style.transform = 'scale(1.6) rotate(270deg)';
    }
}

/*scroll enabling*/
let scrollEnabled = false;

const scrollableImgs = document.querySelector('.scrollable-imgs');

function enableScroll() {
    scrollEnabled = true;
}

function disableScroll() {
    scrollEnabled = false;
}

scrollableImgs.addEventListener('wheel', (event) => {
    if (scrollEnabled) {
        event.preventDefault();
        const delta = event.deltaY;
        scrollableImgs.scrollLeft += delta;
    }
});
