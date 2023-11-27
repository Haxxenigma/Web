document.getElementById('encode').addEventListener('click', function () {
    document.getElementById('output').value = encodeURIComponent(document.getElementById('input').value);
})

document.getElementById('decode').addEventListener('click', function () {
    document.getElementById('output').value = decodeURIComponent(document.getElementById('input').value);
})