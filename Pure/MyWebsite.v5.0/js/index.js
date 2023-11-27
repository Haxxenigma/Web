document.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        const input = document.getElementById('password');
        const container = document.getElementById('container');
        const grant = document.getElementById('grant');
        const deny = document.getElementById('deny');

        if (input.value === 'hello') {
            event.preventDefault();
            container.style.display = 'none';
            grant.style.display = 'flex';

            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1500);
        }
        else {
            event.preventDefault();
            container.style.display = 'none';
            deny.style.display = 'flex';

            setTimeout(() => {
                container.style.display = 'flex';
                deny.style.display = 'none';
                input.value = "";
                input.focus();
            }, 1500);
        }
    }
})