function copyToClipboard(element, floating) {
    let textToCopy = document.getElementById(element);
    let floatingText = floating.querySelector('span.floating');

    textToCopy.select();
    textToCopy.setSelectionRange(0, textToCopy.value.length);

    navigator.clipboard.writeText(textToCopy.value);
    floatingText.innerHTML = "Copied!";
}

function clearFloatingText(floating) {
    let textToClear = floating.querySelector('span.floating');

    textToClear.innerHTML = "Copy to clipboard";
}