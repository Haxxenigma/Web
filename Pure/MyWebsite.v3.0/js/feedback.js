// document.querySelector('.form').addEventListener('submit', (event) => {
//     event.preventDefault();

//     const username = document.getElementById('username').value;
//     const email = document.getElementById('email').value;
//     const message = document.getElementById('message').value;

//     const currentDate = new Date();
//     const dateString = currentDate.toLocaleString();

//     const newCommentHTML = `
//         <div class="messages">
//             <p class="message-info">Author: ${username} | Email: ${email} | Date: ${dateString}</p>
//             <p class="message-text">${message}</p>
//         </div>
//     `;

//     const messageSection = document.querySelector('.messages');
//     messageSection.insertAdjacentHTML('beforeend', newCommentHTML);

//     document.getElementById('username').value = '';
//     document.getElementById('email').value = '';
//     document.getElementById('message').value = '';
// });