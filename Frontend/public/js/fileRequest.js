async function fetchRequests() {
    try {
        const response = await fetch("http://localhost:3000/api/requests");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const complaintContainer = document.getElementById("complaint-container");

        complaintContainer.innerHTML = "";

        const pendingRequests = data.filter(request => request.status.toLowerCase() === "pending");

        pendingRequests.forEach((request) => {
            const item = document.createElement("div");
            item.classList.add("complaint-item");

            const createdDate = new Date(request.created_at);
            const formattedDate = `${String(createdDate.getUTCHours()).padStart(2, '0')}:${String(createdDate.getUTCMinutes()).padStart(2, '0')} ${String(createdDate.getUTCDate()).padStart(2, '0')}/${String(createdDate.getUTCMonth() + 1).padStart(2, '0')}/${createdDate.getUTCFullYear()}`;

            item.innerText = `${formattedDate} | เรื่อง ${request.subject} เรียน ${request.title} ${request.firstName} ${request.lastName} เหตุผลที่ยื่น ${request.reason.substring(0, 30)}...`;

            item.addEventListener("click", () => {
                window.location.href = `EmployeePageCheck2.html?request_id=${request.request_id}`;
            });

            complaintContainer.appendChild(item);
        });
    } catch (error) {
        console.error("Error fetching requests:", error);
    }
}

async function fetchFilesForRequest() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestId = urlParams.get('request_id');

    if (requestId) {
        try {
            const response = await fetch(`http://localhost:3000/api/request/files/${requestId}`);
            
            if (response.status === 404) {
                displayNoFilesMessage();
                return;
            }

            if (!response.ok) throw new Error("Failed to fetch files");

            const files = await response.json();
            const fileUploadSection = document.querySelector('.file-upload-section');
            fileUploadSection.innerHTML = '';

            if (files.length > 0) {
                files.forEach(file => {
                    const fileItem = document.createElement('div');
                    fileItem.classList.add('file-item');

                    const fileIcon = document.createElement('span');
                    fileIcon.classList.add('file-icon');
                    fileIcon.innerHTML = '📄';

                    const fileLink = document.createElement('a');
                    fileLink.href = `http://127.0.0.1:5501/backend/${file.file_path}`;
                    fileLink.target = '_blank';
                    fileLink.download = file.file_name;
                    fileLink.classList.add('file-link');

                    const maxNameLength = 20;
                    const truncatedName = file.file_name.length > maxNameLength 
                        ? file.file_name.substring(0, maxNameLength) + '...'
                        : file.file_name;
                    fileLink.innerText = truncatedName;

                    fileItem.appendChild(fileIcon);
                    fileItem.appendChild(fileLink);
                    fileUploadSection.appendChild(fileItem);
                });
            } else {
                displayNoFilesMessage();
            }
        } catch (error) {
            console.error("Error fetching files:", error);
            displayNoFilesMessage();
        }
    } else {
        console.error("No request ID found in URL");
    }
}

function displayNoFilesMessage() {
    const fileUploadSection = document.querySelector('.file-upload-section');
    fileUploadSection.innerText = 'No files attached to this request.';
}

window.onload = fetchFilesForRequest;
