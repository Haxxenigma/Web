function authenticate() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userInput = "username"
    const passInput = "password"

    if (username === userInput && password === passInput) {
        localStorage.setItem("authenticated", "true");
        window.location.href = "index.html";
    } else {
        let attempts = localStorage.getItem("attempts") || 0;
        attempts = parseInt(attempts) + 1;
        localStorage.setItem("attempts", attempts);

        if (attempts >= 3) {
            window.location.href = "unauth.html";
        } else {
            alert("Invalid username or password");
        }
    }
}