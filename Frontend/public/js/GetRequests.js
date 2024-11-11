async function fetchRequests() {
    try {
        const response = await fetch("http://localhost:3000/api/requests");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const complaintContainer = document.getElementById("complaint-container");

        complaintContainer.innerHTML = "";

        data.forEach((request) => {
            const item = document.createElement("div");
            item.classList.add("complaint-item");

            const createdDate = new Date(request.created_at);
            const formattedDate = `${String(createdDate.getUTCHours()).padStart(2, '0')}:${String(createdDate.getUTCMinutes()).padStart(2, '0')} ${String(createdDate.getUTCDate()).padStart(2, '0')}/${String(createdDate.getUTCMonth() + 1).padStart(2, '0')}/${createdDate.getUTCFullYear()}`;

            item.innerText = `${formattedDate} | เรื่อง ${request.subject} เรียน ${request.title} ${request.firstName} ${request.lastName} เหตุผลที่ยื่น ${request.reason.substring(0, 30)}...`;

            item.addEventListener("click", () => {
                window.location.href = `EmployeePageCheck.html?request_id=${request.request_id}`;
            });

            complaintContainer.appendChild(item);
        });
    } catch (error) {
        console.error("Error fetching requests:", error);
    }
}

window.onload = fetchRequests;