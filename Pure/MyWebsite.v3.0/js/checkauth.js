function checkAuthentication() {
    const isAuthenticated = localStorage.getItem("authenticated");

    if (!isAuthenticated) {
        window.location.href = "auth.html";
    }
}

checkAuthentication()