const AUTH_API = "http://localhost:3000/api/auth";

function signup() {
    fetch(`${AUTH_API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Signup successful");
        window.location = "login.html";
    });
}

function login() {
    fetch(`${AUTH_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("name", data.name);
        window.location = "index.html";
    });
}
