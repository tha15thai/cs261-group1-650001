async function approveRequest() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestId = urlParams.get('request_id');

    if (!requestId) {
        alert("Request ID not found.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/requests/${requestId}/approve`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'approved' })
        });

        if (response.ok) {
            alert("Request approved successfully!");
            window.location.href = 'EmployeeConfirme.html';
        } else {
            alert("Failed to approve request.");
        }
    } catch (error) {
        console.error("Error approving request:", error);
        alert("An error occurred while approving the request.");
    }
}
