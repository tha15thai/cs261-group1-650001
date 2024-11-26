const loginBtn = document.querySelector('.form-control-submit-button');
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

async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem('username', data.user.username);
            messageElement.textContent = 'Login successful!';

            if (data.user.username === '6609650699') {
                window.location.href = './EmployeePage.html';
            } else if (data.user.type === 'student') {
                window.location.href = './Home.html';
            } else if (data.user.type === 'employee') {
                window.location.href = './EmployeePage.html';
            } else {
                messageElement.textContent = 'User type not specified or unknown.';
            }
        } else {
            messageElement.textContent = 'Username หรือ Password ไม่ถูกต้อง';
        }
        
    } catch (error) {
        console.error('Error during login:', error);
        messageElement.textContent = 'Error during login';
    }
}

$(document).ready(function(){
    $('.navbar').click(function(){
        $('.popupbar').addClass('active');
        $('.navbar').css("visibility","hidden")
    });
    $('.close-btnn').click(function(){
        $('.popupbar').removeClass('active');
        $('.navbar').css("visibility","Visible")
    })
})

document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
       window.location.href = "Login.html";
   }
});

function logout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userType");
    
    window.location.href = "Login.html";
}

username.addEventListener('input', validateFields);
password.addEventListener('input', validateFields);