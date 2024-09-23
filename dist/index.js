"use strict";
function getFormData() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var degree = document.getElementById("degree").value;
    var institution = document.getElementById("institution").value;
    var jobTitle = document.getElementById("jobTitle").value;
    var company = document.getElementById("company").value;
    var skillsInput = document.getElementById("skills").value;
    var skills = skillsInput ? skillsInput.split(",").map(function (skill) { return skill.trim(); }) : [];
    console.log("skillsinput", skillsInput);
    console.log("Captured Skills:", skills);
    return {
        personalInfo: { name: name, email: email, phone: phone },
        education: { degree: degree, institution: institution },
        experience: { jobTitle: jobTitle, company: company },
        skills: skills,
    };
}
function renderResume(resumeData) {
    var personalInfoSection = document.getElementById("personal-info");
    personalInfoSection.innerHTML = "\n    <h1>".concat(resumeData.personalInfo.name, "</h1>\n    <p>").concat(resumeData.personalInfo.email, "</p>\n    <p>").concat(resumeData.personalInfo.phone, "</p>\n    ");
    var educationSection = document.getElementById("education");
    educationSection.innerHTML = "\n    <h1>Education</h1>  \n    <p>".concat(resumeData.education.degree, "</p>\n    <p>").concat(resumeData.education.institution, "</p>\n    ");
    var experienceSection = document.getElementById("experience");
    experienceSection.innerHTML = "\n    <h1>Work Experience</h1>\n    <h3>".concat(resumeData.experience.jobTitle, "</h3>\n    <p>").concat(resumeData.experience.company, "</p>\n  ");
    var skillsSection = document.querySelector('.skills-list');
    skillsSection.innerHTML = '';
    if (resumeData.skills.length > 0) {
        resumeData.skills.forEach(function (skill) {
            var li = document.createElement('li');
            li.textContent = skill;
            skillsSection.appendChild(li);
        });
    }
    else {
        var li = document.createElement('li');
        li.textContent = "No Skills Provided";
        skillsSection.appendChild(li);
    }
}
var form = document.getElementById("resumeForm");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = getFormData();
    renderResume(formData);
});
