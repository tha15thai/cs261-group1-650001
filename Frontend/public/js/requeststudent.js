async function fetchRequests() {
    try {
        const username = sessionStorage.getItem("username");
        if (!username) {
            throw new Error("Username not found in session storage");
        }
        const queryURL = `http://localhost:3000/api/requests/${username}`;
        console.log(`Query URL: ${queryURL}`);

        const response = await fetch(queryURL);
        if (!response.ok) throw new Error("Failed to fetch data");

        let data = await response.json(); // ใช้ let แทน const
        console.log("Data fetched:", data);

        const complaintContainer = document.getElementById("complaint-container");
        if (!complaintContainer) throw new Error("Complaint container element not found");

        complaintContainer.innerHTML = "";

        // ตรวจสอบว่าข้อมูลเป็น Object เดี่ยว
        if (!Array.isArray(data)) {
            data = [data]; // แปลง Object เป็น Array
        }

        if (data.length === 0) {
            complaintContainer.innerHTML = "<p>No requests found</p>";
            return;
        }
        
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        sortedData.forEach((request) => {
            const item = document.createElement("div");
            item.classList.add("list-item");

            const createdDate = new Date(request.created_at);
            const formattedDate = `${String(createdDate.getUTCHours()).padStart(2, '0')}:${String(createdDate.getUTCMinutes()).padStart(2, '0')} ${String(createdDate.getUTCDate()).padStart(2, '0')}/${String(createdDate.getUTCMonth() + 1).padStart(2, '0')}/${createdDate.getUTCFullYear()}`;

            // สร้างข้อความตาม pattern
            item.innerHTML = `
                <span class="time">${formattedDate}</span> ${request.subject} เรียน ${request.title} ${request.firstName} ${request.lastName} เหตุผลที่ยื่น ${request.reason.substring(0, 30)}...`;

            // เพิ่ม Event Listener สำหรับการคลิก
            item.addEventListener("click", () => {
                window.location.href = `StudentPageCheck.html?request_id=${request.request_id}`;
            });

            complaintContainer.appendChild(item);
        });
    } catch (error) {
        console.error("Error fetching requests:", error);
        const complaintContainer = document.getElementById("complaint-container");
        if (complaintContainer) {
            complaintContainer.innerHTML = `<p>Error loading requests. Please try again later.</p>`;
        }
    }
}

window.onload = fetchRequests;