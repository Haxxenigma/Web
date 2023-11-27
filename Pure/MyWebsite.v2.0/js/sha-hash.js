async function generateSHA256Hash(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

document.getElementById('generate').addEventListener('click', function () {
    let text = document.getElementById('input').value;
    generateSHA256Hash(text)
        .then(sha256Hash => document.getElementById('output').value = sha256Hash)
        .catch(error => console.error(error));
})