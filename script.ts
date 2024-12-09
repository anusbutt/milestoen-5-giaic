document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    // type assertions (form fields)
    const nameElement = document.getElementById('name') as HTMLInputElement;

    const emailElement = document.getElementById('email') as HTMLInputElement;

    const phoneElement = document.getElementById('phone') as HTMLInputElement;

    const educationElement = document.getElementById('education') as HTMLInputElement;

    const experienceElement = document.getElementById('experience') as HTMLInputElement;

    const skillsElement = document.getElementById('skills') as HTMLInputElement;

    const resumeOutputElement = document.getElementById('resumeOutput');

    const shareLinkElement = document.getElementById('shareLink') as HTMLElement;

    // clear previous errors
    const clearPreviousErrors = () => {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(error => error.remove());
    };

    clearPreviousErrors();

    // display error messages
    const showError = (element: HTMLInputElement, message: string) => {
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message'; 
        errorElement.style.color = 'red';
        errorElement.innerText = message;
        element.parentElement?.appendChild(errorElement);  // add error message
    };

    // validation checks
    let formValid = true;
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

    const name = nameElement.value;

    const email = emailElement.value;

    const phone = phoneElement.value;

    const education = educationElement.value;

    const experience = experienceElement.value;

    const skills = skillsElement.value;

    const resumeOutput = `
        <h2>Resume</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Phone number:</strong> ${phone}</p>

        <h3>Education</h3>
        <p>${education}</p>

        <h3>Work Experience</h3>
        <p>${experience}</p>

        <h3>Skills</h3>
        <p>${skills}</p>
    `;

    // display resume
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
    } else {
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
    const username = name.toLowerCase().replace(/\s+/g, '');  
    const currentUrl = window.location.href.split('?')[0];
    const uniqueUrl = `${currentUrl}?username=${username}`;
    
    if (shareLinkElement) {
        shareLinkElement.innerHTML = `<a href="${uniqueUrl}" target="_blank">${uniqueUrl}</a>`;
    }

    // copy link to clipboard

    const copyLinkBtn = document.getElementById('copyLinkBtn') as HTMLButtonElement;

    copyLinkBtn?.addEventListener('click', () => {
        navigator.clipboard.writeText(uniqueUrl).then(() => {
            alert("Link copied to clipboard!");
        }).catch((err) => {
            console.error('Could not copy text: ', err);
        });
    });

// download as PDF

const downloadPdfBtn = document.getElementById('downloadPdfBtn') as HTMLButtonElement;

downloadPdfBtn?.addEventListener('click', () => {
    const element = document.getElementById('resumeOutput');
    if (element) {
        const opt = {
            margin: 1,
            filename: `${username}-resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        // @ts-ignore
        html2pdf().from(element).set(opt).save();
    }
})});
