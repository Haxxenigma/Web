async function generateMD5Hash(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const buffer = await crypto.subtle.digest('MD5', data);
    const hashArray = Array.from(new Uint8Array(buffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

document.getElementById('generate').addEventListener('click', function () {
    let text = document.getElementById('input').value;
    generateMD5Hash(text)
        .then(md5Hash => document.getElementById('output').value = md5Hash)
        .catch(error => console.error(error));
})

