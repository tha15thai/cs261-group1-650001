document.addEventListener('DOMContentLoaded', () => {
    const subjectSelect = document.getElementById('subject');
    const editableSubjectInput = document.getElementById('editableSubject');
    const resetButton = document.getElementById('resetButton');
    const additionalInfo = document.querySelector('.additional-info');
    //const form = document.querySelector('form');

    // Event listener for subject selection
    subjectSelect.addEventListener('change', toggleSubject);
    resetButton.addEventListener('click', resetSelection);

    function toggleSubject() {
        const subjectSelect = document.getElementById('subject');
        const editableSubjectInput = document.getElementById('editableSubject');
        const resetButton = document.getElementById('resetButton');
        const additionalInfo = document.querySelector('.additional-info');
        const topic4Info = document.querySelector('.topic4-info'); // New variable for topic 4 info
    
        // If "อื่นๆ" is selected, show the input field
        if (subjectSelect.value === 'other') {
            subjectSelect.style.display = 'none'; // Hide dropdown
            editableSubjectInput.style.display = 'block'; // Show input
            editableSubjectInput.value = ''; // Clear previous input
            editableSubjectInput.focus(); // Focus on the input
            resetButton.style.display = 'block'; // Show reset button
            additionalInfo.style.display = 'none'; // Hide additional info
            topic4Info.style.display = 'none'; // Hide topic 4 info
        } else {
            // Show dropdown and hide input for other selections
            editableSubjectInput.style.display = 'none'; // Hide input
            subjectSelect.style.display = 'block'; // Show dropdown
            resetButton.style.display = 'none'; // Hide reset button
    
            // Show additional info for specific topics
            if (['topic1', 'topic2', 'topic3'].includes(subjectSelect.value)) {
                additionalInfo.style.display = 'block'; // Show additional info box
                topic4Info.style.display = 'none'; // Hide topic 4 info
            } else if (subjectSelect.value === 'topic4') {
                additionalInfo.style.display = 'none'; // Hide additional info for other topics
                topic4Info.style.display = 'block'; // Show topic 4 info
            } else {
                additionalInfo.style.display = 'none'; // Hide if not relevant
                topic4Info.style.display = 'none'; // Hide topic 4 info
            }
        }
    }
    
    function showEditableSubject() {
        subjectSelect.style.display = 'none'; // Hide dropdown
        editableSubjectInput.style.display = 'block'; // Show input
        editableSubjectInput.value = ''; // Clear previous input
        editableSubjectInput.focus(); // Focus on the input
        resetButton.style.display = 'block'; // Show reset button
        additionalInfo.style.display = 'none'; // Hide additional info
    }

    function hideEditableSubject() {
        editableSubjectInput.style.display = 'none'; // Hide input
        subjectSelect.style.display = 'block'; // Show dropdown
        resetButton.style.display = 'none'; // Hide reset button
    }

    function validateInput() {
        // Clear dropdown value if input is filled
        if (editableSubjectInput.value.trim() !== '') {
            subjectSelect.value = ''; // Clear the dropdown value
        }
    }

    function resetSelection() {
        // Reset the dropdown and hide the input
        subjectSelect.value = ''; // Reset dropdown to default
        editableSubjectInput.style.display = 'none'; // Hide input
        editableSubjectInput.value = ''; // Clear input value
        subjectSelect.style.display = 'block'; // Show dropdown
        resetButton.style.display = 'none'; // Hide reset button
        additionalInfo.style.display = 'none'; // Hide additional info on reset
    }

    function clearForm() {
        document.querySelector('form').reset();
        additionalInfo.style.display = 'none'; // Hide additional info on reset
    }

    // Attach clearForm function to cancel button (assuming it exists in your HTML)
    const cancelButton = document.querySelector('.btn-cancel');
    if (cancelButton) {
        cancelButton.addEventListener('click', clearForm);
    }

    /* form.addEventListener('submit', (event) => {
        if (!validateTextField('firstName', 'กรุณากรอกชื่อ') || 
            !validateTextField('lastName', 'กรุณากรอกนามสกุล') || 
            !validateStudentID() || 
            !validatePhoneNumber('student-tel', 'กรุณากรอกเบอร์โทรศัพท์นักศึกษาที่ถูกต้อง') ||
            !validatePhoneNumber('guardian-tel', 'กรุณากรอกเบอร์โทรศัพท์ผู้ปกครองที่ถูกต้อง')) {
            event.preventDefault();
        }
    });

    function validateTextField(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        if (field.value.trim() === '') {
            alert(errorMessage);
            field.focus();
            return false;
        }
        return true;
    }

    function validateStudentID() {
        const studentIDField = document.getElementById('studentID');
        const studentID = studentIDField.value.trim();
        if (studentID === '' || studentID.length !== 10 || isNaN(studentID)) {
            alert('กรุณากรอกรหัสนักศึกษาที่ถูกต้อง (10 หลัก)');
            studentIDField.focus();
            return false;
        }
        return true;
    }

    function validatePhoneNumber(fieldId, errorMessage) {
        const phoneField = document.getElementById(fieldId);
        const phoneNumber = phoneField.value.trim();
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phoneNumber)) {
            alert(errorMessage);
            phoneField.focus();
            return false;
        }
        return true;
    } */

});