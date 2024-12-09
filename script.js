var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    // type assertions (form fields)
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var resumeOutputElement = document.getElementById('resumeOutput');
    var shareLinkElement = document.getElementById('shareLink');
    // clear previous errors
    var clearPreviousErrors = function () {
        var errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(function (error) { return error.remove(); });
    };
    clearPreviousErrors();
    // display error messages
    var showError = function (element, message) {
        var _a;
        var errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.innerText = message;
        (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(errorElement); // add error message
    };
    // validation checks
    var formValid = true;
    if (!nameElement.value.trim()) {
        showError(nameElement, 'Name field is required.');
        formValid = false;
    }
    if (!emailElement.value.trim()) {
        showError(emailElement, 'Email field is required.');
        formValid = false;
    }
    if (!phoneElement.value.trim()) {
        showError(phoneElement, 'Phone field is required.');
        formValid = false;
    }
    if (!educationElement.value.trim()) {
        showError(educationElement, 'Education field is required.');
        formValid = false;
    }
    if (!experienceElement.value.trim()) {
        showError(experienceElement, 'Experience field is required.');
        formValid = false;
    }
    if (!skillsElement.value.trim()) {
        showError(skillsElement, 'Skills field is required.');
        formValid = false;
    }
    // if form is not valid, don't do further operations!
    if (!formValid) {
        return;
    }
    // If form is valid, generate the resume output
    var name = nameElement.value;
    var email = emailElement.value;
    var phone = phoneElement.value;
    var education = educationElement.value;
    var experience = experienceElement.value;
    var skills = skillsElement.value;
    var resumeOutput = "\n        <h2>Resume</h2>\n        <p><strong>Name:</strong> ".concat(name, "</p>\n        <p><strong>Email Address:</strong> ").concat(email, "</p>\n        <p><strong>Phone number:</strong> ").concat(phone, "</p>\n\n        <h3>Education</h3>\n        <p>").concat(education, "</p>\n\n        <h3>Work Experience</h3>\n        <p>").concat(experience, "</p>\n\n        <h3>Skills</h3>\n        <p>").concat(skills, "</p>\n    ");
    // display resume
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
    }
    else {
        console.error('The Resume Output Element is missing.');
    }
    // not editable
    nameElement.disabled = true;
    emailElement.disabled = true;
    phoneElement.disabled = true;
    educationElement.disabled = true;
    experienceElement.disabled = true;
    skillsElement.disabled = true;
    // generating uniquee URL
    var username = name.toLowerCase().replace(/\s+/g, '');
    var currentUrl = window.location.href.split('?')[0];
    var uniqueUrl = "".concat(currentUrl, "?username=").concat(username);
    if (shareLinkElement) {
        shareLinkElement.innerHTML = "<a href=\"".concat(uniqueUrl, "\" target=\"_blank\">").concat(uniqueUrl, "</a>");
    }
    // copy link to clipboard
    var copyLinkBtn = document.getElementById('copyLinkBtn');
    copyLinkBtn === null || copyLinkBtn === void 0 ? void 0 : copyLinkBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(uniqueUrl).then(function () {
            alert("Link copied to clipboard!");
        }).catch(function (err) {
            console.error('Could not copy text: ', err);
        });
    });
    // download as PDF
    var downloadPdfBtn = document.getElementById('downloadPdfBtn');
    downloadPdfBtn === null || downloadPdfBtn === void 0 ? void 0 : downloadPdfBtn.addEventListener('click', function () {
        var element = document.getElementById('resumeOutput');
        if (element) {
            var opt = {
                margin: 1,
                filename: "".concat(username, "-resume.pdf"),
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            // @ts-ignore
            html2pdf().from(element).set(opt).save();
        }
    });
});
