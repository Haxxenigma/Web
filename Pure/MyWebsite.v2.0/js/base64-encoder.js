document.getElementById('encode').addEventListener('click', function () {
    document.getElementById('output').value = btoa(document.getElementById('input').value);
})

document.getElementById('decode').addEventListener('click', function () {
    document.getElementById('output').value = atob(document.getElementById('input').value);
})