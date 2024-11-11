async function cancelRequest() {
    const requestId = localStorage.getItem('requestId');
    
    if (!requestId) {
        alert("Request ID not found. Cannot cancel the request.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/updateStatus/cancel/${requestId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            alert('Request has been cancelled.');
            localStorage.removeItem('requestId');
            window.location.href = 'FormPage.html';
        } else {
            alert('Failed to cancel the request.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while cancelling the request.');
    }
}
