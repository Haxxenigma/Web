window.onload = function () {
    const btn1 = document.querySelector("#btn1");
    btn1.addEventListener("click", function () {
        window.location.href = '#';
    })
    const btn2 = document.querySelector("#btn2");
    btn2.addEventListener("click", function () {
        window.location.href = '#';
    })
    const btn3 = document.querySelector("#btn3");
    btn3.addEventListener("click", function () {
        window.location.href = '#';
    })
    const btn4 = document.querySelector("#btn4");
    btn4.addEventListener("click", function () {
        window.location.href = '#';
    })

    const textarea = document.querySelector('#textarea');
    const name = document.querySelector('#name');
    const mail = document.querySelector('#mail');
    const submit = document.querySelector('#submit')

    submit.addEventListener("click", function (event) {
        event.preventDefault();
        var nameValue = name.value;
        var mailValue = mail.value;
        var textareaValue = textarea.value;

        console.log(nameValue, mailValue)

        let h1 = document.createElement("h4");
        let p1 = document.createElement("p");
        let hr = document.createElement("hr");
        let five = document.querySelector('#five');

        h1.innerHTML = nameValue;
        p1.innerHTML = textareaValue;
        h1.classList = "add-border inline-block-display";
        p1.classList = "add-padding";

        five.append(h1);
        five.append(p1);
        five.append(hr);
    });
}
