async function confirmRequest() {
    const requestId = localStorage.getItem('requestId');
    
    if (!requestId) {
        alert("Request ID not found. Cannot confirm the request.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/updateStatus/pending/${requestId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            localStorage.removeItem('requestId');
            window.location.href = 'FormPage.html';
        } else {
            alert('Failed to confirm the request.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while confirming the request.');
    }
}
