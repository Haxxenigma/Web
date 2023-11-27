function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-content');
    const arrowSymbol = document.getElementById('arrow-symbol')
    dropdown.classList.toggle('show-dropdown');

    if (dropdown.classList.contains('show-dropdown')) {
        arrowSymbol.style.transform = 'scale(1.6) rotate(90deg)';
    }
    else {
        arrowSymbol.style.transform = 'scale(1.6) rotate(270deg)';
    }
}

/*scroll enabling*/
let scrollEnabled = false;

const element = document.querySelector('.scrollable-imgs');

function enableScroll() {
    scrollEnabled = true;
}

function disableScroll() {
    scrollEnabled = false;
}

element.addEventListener('wheel', (event) => {
    if (scrollEnabled) {
        event.preventDefault();
        const delta = event.deltaY;
        element.scrollLeft += delta;
    }
});

/*comments*/
document.querySelector('.comment-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const commentText = document.getElementById('comment').value;

    const currentDate = new Date();
    const dateString = currentDate.toLocaleString();

    const newCommentHTML = `
        <div class="comment">
            <p class="comment-info">Author: ${username} | Email: ${email} | Date: ${dateString}</p>
            <p class="comment-text">${commentText}</p>
        </div>
    `;

    const commentsSection = document.querySelector('.comments');
    commentsSection.insertAdjacentHTML('beforeend', newCommentHTML);

    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('comment').value = '';
});
