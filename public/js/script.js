const loginBtn = document.getElementById('btn');
const username = document.getElementById('username');
const password = document.getElementById('password');

function togglePassword() {
    const passwordField = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        togglePassword.classList.remove('bx-hide');
        togglePassword.classList.add('bx-show-alt');
    } else {
        passwordField.type = 'password';
        togglePassword.classList.remove('bx-show-alt');
        togglePassword.classList.add('bx-hide');
    }
}

function validateFields() {
    let isValid = true;

    if (!username.value) {
        document.getElementById('username-error').innerText = 'Please fill username';
        isValid = false;
    } else {
        document.getElementById('username-error').innerText = '';
    }

    if (!password.value) {
        document.getElementById('password-error').innerText = 'Please fill password';
        isValid = false;
    } else {
        document.getElementById('password-error').innerText = '';
    }

    loginBtn.disabled = !isValid;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-btn").addEventListener("click", function() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const data = {
            "UserName": username,
            "PassWord": password
        };

        fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': 'TU15155cbae9f02b0f01554634b97e2febe213f611858b5cf923a3655ba3c810466fb155600418f472fb7bd423c6c3e1fb'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === true) {
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("userType", data.type);

                if (data.type === "student") {
                    window.location.href = "FormPage.html";
                } else if (data.type === "employee") {
                    window.location.href = "EmployeePage.html";
                }
            } else {
                alert("Login failed: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});



username.addEventListener('input', validateFields);
password.addEventListener('input', validateFields);