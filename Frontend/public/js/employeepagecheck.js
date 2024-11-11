async function fetchRequestDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestId = urlParams.get('request_id');

    if (requestId) {
        try {
            const response = await fetch(`http://localhost:3000/api/request/${requestId}`);
            if (!response.ok) throw new Error("Failed to fetch request details");

            const requestData = await response.json();
            document.getElementById("subject").value = requestData.subject;
            document.getElementById("details").value = requestData.details;
            document.getElementById("prefix").value = requestData.title;
            document.getElementById("firstName").value = requestData.firstName;
            document.getElementById("lastName").value = requestData.lastName;
            document.getElementById("studentID").value = requestData.studentID;
            document.getElementById("year").value = requestData.year;
            document.getElementById("major").value = requestData.major;
            document.getElementById("student-tel").value = requestData.studentTel;
            document.getElementById("guardian-tel").value = requestData.parentTel;
            document.getElementById("advisor").value = requestData.advisor;
            document.getElementById("address").value = requestData.address;
            document.getElementById("district").value = requestData.district;
            document.getElementById("city").value = requestData.city;
            document.getElementById("province").value = requestData.province;
            document.getElementById("reason").value = requestData.reason;
            document.getElementById("semester").value = requestData.semester || '';
            document.getElementById("academicYear").value = requestData.academicYear || '';
            document.getElementById("courseCode").value = requestData.courseCode || '';
            document.getElementById("courseName").value = requestData.courseName || '';
            document.getElementById("section").value = requestData.section || '';
            document.getElementById("semester-topic4").value = requestData.semesterTopic4 || '';
            document.getElementById("academicYear-topic4").value = requestData.academicYearTopic4 || '';
            document.getElementById("debt-amount").value = requestData.debtAmount || '';
            document.getElementById("signature").value = requestData.signature;

            if (requestData.applicationDate) {
                const date = new Date(requestData.applicationDate);
                const formattedDate = date.toISOString().split('T')[0];
                document.getElementById("applicationDate").value = formattedDate;
            } else {
                document.getElementById("applicationDate").value = '';
            }
        } catch (error) {
            console.error("Error fetching request details:", error);
        }
    }
}

function goToEmployeePageCheck2() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestId = urlParams.get('request_id');
    
    if (requestId) {
        window.location.href = `EmployeePageCheck2.html?request_id=${requestId}`;
    } else {
        console.error("No request ID found in URL of EmployeePageCheck.html");
    }
}

window.onload = fetchRequestDetails;
