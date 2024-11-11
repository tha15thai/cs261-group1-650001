const UserName = sessionStorage.getItem('username');

if (UserName) {
    fetch(`http://localhost:3000/api/user/${UserName}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('user-name').textContent = data.data.displayname_en;
                document.getElementById('user-email').textContent = data.data.email;

                document.getElementById('user-name-sidebar').textContent = data.data.displayname_en;
                document.getElementById('user-email-sidebar').textContent = data.data.email;
            } else {
                console.error('User not found');
            }
        })
        .catch(error => console.error('Error fetching user info:', error));
} else {
    console.error('No username found in session storage.');
}
