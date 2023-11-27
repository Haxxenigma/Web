const textarea = document.querySelector('#content');
const addHeading = document.querySelector('#addHeading');
const addBold = document.querySelector('#addBold');
const addItalic = document.querySelector('#addItalic');
const addUnderline = document.querySelector('#addUnderline');
const addCross = document.querySelector('#addCross');
const addCode = document.querySelector('#addCode');
const addWarning = document.querySelector('#addWarning');
const addTip = document.querySelector('#addTip');
const addLink = document.querySelector('#addLink');

if (textarea) {
    addHeading.addEventListener('click', () => {
        addText('<h3></h3>', 4);
    });

    addBold.addEventListener('click', () => {
        addText('<b></b>', 3);
    });

    addItalic.addEventListener('click', () => {
        addText('<i></i>', 3);
    });

    addUnderline.addEventListener('click', () => {
        addText('<u></u>', 3);
    });

    addCross.addEventListener('click', () => {
        addText('<s></s>', 3);
    });

    addCode.addEventListener('click', () => {
        addText('<pre></pre>', 5);
    });

    addWarning.addEventListener('click', () => {
        addText('<div class="warning"></div>', 21);
    });

    addTip.addEventListener('click', () => {
        addText('<div class="tip"></div>', 17);
    });

    addLink.addEventListener('click', () => {
        addText('<a href=""></a>', 9);
    });


    function addText(text, finPos) {
        const textareaValue = textarea.value;
        const startPos = textarea.selectionStart;
        textarea.value = textareaValue.slice(0, startPos) + text + textareaValue.slice(startPos);

        const pos = startPos + finPos;
        textarea.setSelectionRange(pos, pos);
        textarea.focus();
    }
}