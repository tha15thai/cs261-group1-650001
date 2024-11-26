document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('additional-docs').addEventListener('change', displaySelectedFiles);
    document.getElementById('request-form').addEventListener('submit', submitRequestForm);
});

function displaySelectedFiles() {
    const fileInput = document.getElementById('additional-docs');
    const filesList = document.getElementById('selected-files-list');
    
    filesList.innerHTML = '';

    if (fileInput.files.length > 5) {
        alert('You can only upload up to 5 files.');
        fileInput.value = '';
        return;
    }

    Array.from(fileInput.files).forEach((file, index) => {
        const maxFileNameLength = 15;
        const truncatedName = file.name.length > maxFileNameLength
            ? file.name.substring(0, maxFileNameLength) + '...'
            : file.name;

        const fileNameElement = document.createElement('p');
        fileNameElement.textContent = `${index + 1}. ${truncatedName}`;
        filesList.appendChild(fileNameElement);
    });
}

async function submitRequestForm(event) {
    event.preventDefault();

    const formDataText = JSON.parse(localStorage.getItem('formData'));
    const formData = new FormData();

    for (const [key, value] of Object.entries(formDataText)) {
        formData.append(key, value);
    }

    const files = document.getElementById('additional-docs').files;
    for (const file of files) {
        formData.append('files', file);
    }

    try {
        const response = await fetch('http://localhost:3000/api/submit-form', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (result.success) {
            alert("Submission success")
            localStorage.setItem('requestId', result.requestId);
            localStorage.removeItem('formData');
            window.location.href = 'ConfirmationPage.html';
        } else {
            alert("try : " + error)
            console.log("Submission failed:", result.message);
        }
    } catch (error) {
        alert("ไฟล์ของคุณมีขนาดเกิน 100 kb")
        console.error("Error submitting form:", error);
    }
}
