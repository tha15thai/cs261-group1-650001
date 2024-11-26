document.addEventListener('DOMContentLoaded', () => {
    const subjectSelect = document.getElementById('subject');
    const editableSubjectInput = document.getElementById('editableSubject');
    const resetButton = document.getElementById('resetButton');
    const additionalInfo = document.querySelector('.additional-info');
    const topic4Info = document.querySelector('.topic4-info');

    setTimeout(toggleSubject, 100);

    subjectSelect.addEventListener('change', toggleSubject);
    resetButton.addEventListener('click', resetSelection);

    function toggleSubject() {
        if (subjectSelect.value === 'อื่นๆ') {
            subjectSelect.style.display = 'none';
            editableSubjectInput.style.display = 'block';
            editableSubjectInput.value = '';
            editableSubjectInput.focus();
            resetButton.style.display = 'block';
            additionalInfo.style.display = 'none';
            topic4Info.style.display = 'none';
        } else {
            editableSubjectInput.style.display = 'none';
            subjectSelect.style.display = 'block';
            resetButton.style.display = 'none';

            if (['จดทะเบียนล่าช้า/เพิ่มล่าช้า', 'ขอถอนวิชา/ถอนรายวิชา (Drop W)', 'ขอจดทะเบียนศึกษารายวิชาข้ามหลักสูตร'].includes(subjectSelect.value)) {
                additionalInfo.style.display = 'block';
                topic4Info.style.display = 'none';
            } else if (subjectSelect.value === 'ขอลาออก') {
                additionalInfo.style.display = 'none';
                topic4Info.style.display = 'block';
            } else {
                additionalInfo.style.display = 'none';
                topic4Info.style.display = 'none';
            }
        }
    }

    function resetSelection() {
        subjectSelect.value = '';
        editableSubjectInput.style.display = 'none';
        editableSubjectInput.value = '';
        subjectSelect.style.display = 'block';
        resetButton.style.display = 'none';
        additionalInfo.style.display = 'none';
        topic4Info.style.display = 'none';
    }

    function clearForm() {
        document.querySelector('form').reset();
        additionalInfo.style.display = 'none';
        topic4Info.style.display = 'none';
    }

    const cancelButton = document.querySelector('.btn-cancel');
    if (cancelButton) {
        cancelButton.addEventListener('click', clearForm);
    }
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const requiredFields = [
        'subject', 'details', 'prefix', 'firstName', 'lastName', 'studentID', 'year', 'major',
        'student-tel', 'guardian-tel', 'advisor', 'address', 'district', 'city', 'province', 
        'reason', 'signature', 'applicationDate'
    ];

    const subject = document.getElementById('subject').value;

    if (['จดทะเบียนล่าช้า/เพิ่มล่าช้า', 'ขอถอนวิชา/ถอนรายวิชา (Drop W)', 'ขอจดทะเบียนศึกษารายวิชาข้ามหลักสูตร'].includes(subject)) {
        requiredFields.push('semester', 'academicYear', 'courseCode', 'courseName', 'section');
    } else if (subject === 'ขอลาออก') {
        requiredFields.push('semester-topic4', 'academicYear-topic4');
    }

    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (field && field.offsetParent !== null && field.value.trim() === '') {
            const fieldName = field.placeholder || (field.labels ? field.labels[0].innerText : "ข้อมูลที่ต้องกรอก");
            alert(`กรุณากรอกข้อมูลในช่อง ${fieldName}`);
            field.focus();
            return;
        }
    }

    const formData = {
        subject: document.getElementById('subject').value,
        details: document.getElementById('details').value,
        title: document.getElementById('prefix').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        studentID: document.getElementById('studentID').value,
        year: document.getElementById('year').value,
        major: document.getElementById('major').value,
        studentTel: document.getElementById('student-tel').value,
        parentTel: document.getElementById('guardian-tel').value,
        advisor: document.getElementById('advisor').value,
        address: document.getElementById('address').value,
        district: document.getElementById('district').value,
        city: document.getElementById('city').value,
        province: document.getElementById('province').value,
        reason: document.getElementById('reason').value,
        semester: document.getElementById('semester-topic4')?.value || '',
        academicYear: document.getElementById('academicYear-topic4')?.value || '',
        courseCode: document.getElementById('courseCode')?.value || '',
        courseName: document.getElementById('courseName')?.value || '',
        section: document.getElementById('section')?.value || '',
        debtConfirmation: document.getElementById('no-debt').checked ? 'false' : 'true',
        debtAmount: document.getElementById('debt-amount').value || '',
        signature: document.getElementById('signature').value,
        applicationDate: document.getElementById('applicationDate').value,
        status: 'waiting',
        username: sessionStorage.getItem('username')
    };    

    localStorage.setItem('formData', JSON.stringify(formData));

    window.location.href = 'FormFilePage.html';
});

document.addEventListener('DOMContentLoaded', () => {
    const noDebtCheckbox = document.getElementById('no-debt');
    const hasDebtCheckbox = document.getElementById('has-debt');
    const debtAmountInput = document.getElementById('debt-amount');

    function handleDebtSelection(event) {
        if (event.target === noDebtCheckbox && noDebtCheckbox.checked) {
            hasDebtCheckbox.checked = false;
            debtAmountInput.disabled = true;
            debtAmountInput.value = '';
        } else if (event.target === hasDebtCheckbox && hasDebtCheckbox.checked) {
            noDebtCheckbox.checked = false;
            debtAmountInput.disabled = false;
        }
    }

    noDebtCheckbox.addEventListener('change', handleDebtSelection);
    hasDebtCheckbox.addEventListener('change', handleDebtSelection);

    debtAmountInput.disabled = !hasDebtCheckbox.checked;
});