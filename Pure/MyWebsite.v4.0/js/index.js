document.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        const input = document.getElementById('password');
        const form = document.getElementById('form');
        const grant = document.getElementById('grant');
        const deny = document.getElementById('deny');

        if (input.value === 'hello') {
            event.preventDefault();
            form.style.display = 'none';
            grant.style.display = 'flex';

            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1500);
        }
        else {
            event.preventDefault();
            form.style.display = 'none';
            deny.style.display = 'flex';

            setTimeout(() => {
                form.style.display = 'flex';
                deny.style.display = 'none';
                input.value = "";
                input.focus();
            }, 1500);
        }
    }
})