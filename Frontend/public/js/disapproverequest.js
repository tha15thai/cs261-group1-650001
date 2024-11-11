async function disapproveRequest() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestId = urlParams.get('request_id');
    const reason = document.getElementById('disapproveReason').value;

    if (!requestId) {
        alert("Request ID not found.");
        return;
    }

    if (!reason) {
        alert("Please provide a reason for disapproval.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/requests/${requestId}/disapprove`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'disapproved', disapproval_reason: reason })
        });

        if (response.ok) {
            alert("Request disapproved successfully!");
            window.location.href = 'EmployeeConfirme.html';
        } else {
            alert("Failed to disapprove request.");
        }
    } catch (error) {
        console.error("Error disapproving request:", error);
        alert("An error occurred while disapproving the request.");
    }
}
