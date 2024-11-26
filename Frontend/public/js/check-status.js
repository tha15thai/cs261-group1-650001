async function fetchRequestStatuses() {
    const username = sessionStorage.getItem('username');
    if (!username) {
        console.error('No username found in sessionStorage');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/requests/status/${username}`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        if (data.success) {
            renderStatuses(data.data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error fetching request statuses:', error);
    }
}

function renderStatuses(requests) {
    const statusContainer = document.querySelector('.status-array');
    statusContainer.innerHTML = ''; // Clear old content
    
    const sortedRequests = requests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    sortedRequests.forEach(request => {
        const requestBox = document.createElement('div');
        requestBox.classList.add('request-box'); // Add custom class for styling

        const statusHTML = getStatusHTML(request);
        requestBox.innerHTML = statusHTML;

        statusContainer.appendChild(requestBox); // Append each box to the container
    });
}

function getStatusHTML(request) {
    const dateParts = request.created_at.split(/[- :T.]/); // แยกปี, เดือน, วัน, ชั่วโมง, นาที
    const year = parseInt(dateParts[0]) + 43; // เพิ่ม 43 ให้กับปี
    const month = dateParts[1];
    const day = dateParts[2];
    const hour = dateParts[3];
    const minute = dateParts[4];

    // สร้างรูปแบบวันที่และเวลา
    const formattedTime = `${hour}:${minute}`;
    const formattedDate = `${day}/${month}/${year.toString().slice(-2)}`; // แสดงปีแบบ 2 หลัก
    const result = `${formattedTime} | ${formattedDate}`;

    let timelineHTML = '';

    if (request.status === 'pending') {
        timelineHTML = `
            <div class="step">
                <div class="step-circle">
                    <i class="fa fa-check-square-o"></i>
                </div>
                <div class="step-text">
                    <h4>ส่งคำร้องสำเร็จ!</h4>
                    <p>อยู่ในกระบวนการส่งไปยังเจ้าหน้าที่</p>
                </div>
            </div>
            <div class="line-temp"></div>
            <div class="step">
                <div class="step-circle-temp">
                    <i class="fa fa-user"></i>
                </div>
                <div class="step-text-temp">
                    <h4>อนุมัติสิทธิ์!</h4>
                    <p>อยู่ในกระบวนการส่งไปยังอาจารย์ที่ปรึกษา</p>
                </div>
            </div>
            <div class="line-temp"></div>
            <div class="step">
                <div class="step-circle-temp">
                    <i class="fa fa-users"></i>
                </div>
                <div class="step-text-temp">
                    <h4>อนุมัติสิทธิ์!</h4>
                    <p>อยู่ในกระบวนการส่งไปยังอธิการบดี</p>
                </div>
            </div>
            <div class="line-temp"></div>
            <div class="step">
                <div class="step-circle-temp">
                    <i class="fa fa-check"></i>
                </div>
                <div class="step-text-temp">
                    <h4>คำร้องสำเร็จ!</h4>
                    <p>คำร้องของคุณได้รับการอนุมัติ</p>
                </div>
            </div>
        `;
    } else if (request.status === 'approved') {
        timelineHTML = `
            <div class="step">
                <div class="step-circle">
                    <i class="fa fa-check-square-o"></i>
                </div>
                <div class="step-text">
                    <h4>ส่งคำร้องสำเร็จ!</h4>
                    <p>อยู่ในกระบวนการส่งไปยังเจ้าหน้าที่</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="step">
                <div class="step-circle">
                    <i class="fa fa-user"></i>
                </div>
                <div class="step-text">
                    <h4>อนุมัติสิทธิ์!</h4>
                    <p>อยู่ในกระบวนการส่งไปยังอาจารย์ที่ปรึกษา</p>
                </div>
            </div>
            <div class="line-temp"></div>
            <div class="step">
                <div class="step-circle-temp">
                    <i class="fa fa-users"></i>
                </div>
                <div class="step-text-temp">
                    <h4>อนุมัติสิทธิ์!</h4>
                    <p>อยู่ในกระบวนการส่งไปยังอธิการบดี</p>
                </div>
            </div>
            <div class="line-temp"></div>
            <div class="step">
                <div class="step-circle-temp">
                    <i class="fa fa-check"></i>
                </div>
                <div class="step-text-temp">
                    <h4>คำร้องสำเร็จ!</h4>
                    <p>คำร้องของคุณได้รับการอนุมัติ</p>
                </div>
            </div>
        </div>
        `;
    } else if (request.status === 'disapproved') {
        timelineHTML = `
            <div class="step">
                <div class="step-circle">
                    <i class="fa fa-check-square-o"></i>
                </div>
                <div class="step-text">
                    <h4>ส่งคำร้องสำเร็จ!</h4>
                    <p>อยู่ในกระบวนการส่งไปยังเจ้าหน้าที่</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="step">
                <div class="step-circle-reject">
                    <i class="fa fa-user"></i>
                </div>
                <div class="step-text">
                    <h5>อนุมัติไม่สำเร็จ</h5>
                    <p>อยู่ในกระบวนการส่งคืนไปยังนักศึกษา</p>
                </div>
            </div>
            <div class="line-temp"></div>
            <div class="step">
                <div class="step-circle-temp">
                    <i class="fa fa-users"></i>
                </div>
                <div class="step-text-temp">
                    <h4>อนุมัติสิทธิ์!</h4>
                    <p>อยู่ในกระบวนการส่งไปยังอธิการบดี</p>
                </div>
            </div>
            <div class="line-temp"></div>
            <div class="step">
                <div class="step-circle-temp">
                    <i class="fa fa-check"></i>
                </div>
                <div class="step-text-temp">
                    <h4>คำร้องสำเร็จ!</h4>
                    <p>คำร้องของคุณได้รับการอนุมัติ</p>
                </div>
            </div>
        </div>
        `;
    } else if (request.status === 'cancel') {
        return ''
    }

    return `
    <div class="status-container">
        <div class="time-info-container">
            <div class="time-info">
                <span>เรื่อง: </span><input type="text" value="${request.subject}" disabled>
                <span>เวลา/วันที่: </span><input type="text" value="${result}" disabled>
                <i class="bx bxs-time"></i>
            </div>
        </div>
        <div class="timeline-container">
            ${timelineHTML}
        </div>
    </div>
    `;
}

window.onload = fetchRequestStatuses;