async function fetchFilteredRequests(filterType) {
    try {
        const response = await fetch(`http://localhost:3000/api/requests/filter/${filterType}`);
        if (!response.ok) throw new Error("Failed to fetch filtered requests");

        const { data } = await response.json();
        const complaintContainer = document.getElementById("complaint-container");

        complaintContainer.innerHTML = "";

        if (data.length === 0) {
            return;
        }
        
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        sortedData.forEach((request) => {
            const item = document.createElement("div");
            item.classList.add("complaint-item");

            if (request.status === "approved") {
                item.classList.add("approved-request");
            } else if (request.status === "disapproved") {
                item.classList.add("disapproved-request");
            }

            const createdDate = new Date(request.created_at);
            const formattedDate = `${String(createdDate.getUTCHours()).padStart(2, '0')}:${String(createdDate.getUTCMinutes()).padStart(2, '0')} ${String(createdDate.getUTCDate()).padStart(2, '0')}/${String(createdDate.getUTCMonth() + 1).padStart(2, '0')}/${createdDate.getUTCFullYear()}`;

            item.innerText = `${formattedDate} | เรื่อง ${request.subject} เรียน ${request.title} ${request.firstName} ${request.lastName} เหตุผลที่ยื่น ${request.reason.substring(0, 30)}...`;

            item.addEventListener("click", async () => {
                await markAsRead(request.request_id);
                window.location.href = `EmployeePageCheck.html?request_id=${request.request_id}`;
            });

            complaintContainer.appendChild(item);
        });
    } catch (error) {
        console.error("Error fetching filtered requests:", error);
    }
}

async function markAsRead(requestId) {
    try {
        const response = await fetch(`http://localhost:3000/api/requests/${requestId}/read`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error("Failed to mark request as read");
    } catch (error) {
        console.error("Error marking request as read:", error);
    }
}

document.querySelector('.new-request').addEventListener('click', () => fetchFilteredRequests('new'));
document.querySelector('.in-progress').addEventListener('click', () => fetchFilteredRequests('inProgress'));
document.querySelector('.history').addEventListener('click', () => fetchFilteredRequests('history'));

window.onload = () => fetchFilteredRequests('new');
