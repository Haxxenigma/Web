function textToHex(text) {
    var hex = '';
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i).toString(16);
        hex += ('00' + charCode).slice(-2);
    }
    return hex;
}

function hexToText(hex) {
    var text = '';
    for (var i = 0; i < hex.length; i += 2) {
        var charCode = parseInt(hex.substr(i, 2), 16);
        text += String.fromCharCode(charCode);
    }
    return text;
}

document.getElementById('encode').addEventListener('click', function () {
    document.getElementById('output').value = textToHex(document.getElementById('input').value);
})

document.getElementById('decode').addEventListener('click', function () {
    document.getElementById('output').value = hexToText(document.getElementById('input').value);
})