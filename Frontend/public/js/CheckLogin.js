document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "Login.html";
    }
});

//<button onclick="logout()">Logout</button>

/* function logout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userType");
    
    window.location.href = "Login.html";
} */