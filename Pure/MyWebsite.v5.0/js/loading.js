window.onload = function () {
    setTimeout(() => {
        console.log(1)
        document.getElementById('section').classList.add('loaded');
        document.getElementById('section').classList.remove('is-loading');
        document.getElementById('loading-container').style.display = 'none';
        console.log(2)
    }, 3000);
}