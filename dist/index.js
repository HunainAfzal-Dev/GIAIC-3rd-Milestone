"use strict";
// Elements
var profileImageInput = document.getElementById("profileImage");
var profileImageDisplay = document.getElementById("profile-image-display");
var resumeSection = document.getElementById("resume");
var formSection = document.getElementById("resumeForm");
var generateResumeBtn = document.getElementById("generateResumeBtn");
var resumeForm = document.getElementById("resumeForm");
var downloadResumeBtn = document.getElementById("downloadResume");
var editResumeBtn = document.getElementById("editResumeBtn"); // Edit button
// Check if there's any data in localStorage
var storedData = localStorage.getItem("resumeData");
if (storedData) {
    var data = JSON.parse(storedData);
    updateResume(data);
}
else {
    resumeSection === null || resumeSection === void 0 ? void 0 : resumeSection.classList.remove("hidden");
    // Show the initial dummy resume if no data in localStorage
}
// Show form when "Generate Resume" is clicked
generateResumeBtn.addEventListener("click", function () {
    resumeSection === null || resumeSection === void 0 ? void 0 : resumeSection.classList.add("hidden");
    formSection === null || formSection === void 0 ? void 0 : formSection.classList.remove("hidden");
    generateResumeBtn === null || generateResumeBtn === void 0 ? void 0 : generateResumeBtn.classList.add("hidden");
});
// Handle form submission
resumeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Get form data
    var formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        education: document.getElementById("degree").value,
        institution: document.getElementById("institution").value,
        experience: document.getElementById("jobTitle").value,
        company: document.getElementById("company").value,
        skills: document.getElementById("skills").value.split(",").map(function (skill) { return skill.trim(); }),
        profileImage: profileImageDisplay.src, // Include profile image URL
    };
    console.log(formData);
    // Save data to localStorage
    localStorage.setItem("resumeData", JSON.stringify(formData));
    // Update resume with form data
    updateResume(formData);
    // Hide form and show resume
    formSection === null || formSection === void 0 ? void 0 : formSection.classList.add("hidden");
    resumeSection === null || resumeSection === void 0 ? void 0 : resumeSection.classList.remove("hidden");
});
// Function to update the resume with form data
function updateResume(data) {
    var nameElement = document.querySelector("#resume h1");
    nameElement.innerText = data.name;
    var emailElement = document.querySelector("#resume p");
    emailElement.innerText = data.email;
    var phoneElement = document.querySelector("#resume p:nth-of-type(2)");
    phoneElement.innerText = data.phone;
    var skillsList = document.querySelector("#skillsSection ul");
    skillsList.innerHTML = ""; // Clear existing skills
    data.skills.forEach(function (skill) {
        var li = document.createElement("li");
        li.innerText = skill;
        skillsList.appendChild(li);
    });
    var educationElement = document.querySelector("#education h3");
    educationElement.innerText = data.education;
    var experienceElement = document.querySelector("#experience h3");
    experienceElement.innerText = data.experience;
    // Update profile image
    profileImageDisplay.src = data.profileImage;
}
// Edit resume button logic
editResumeBtn.addEventListener("click", function () {
    var _a;
    resumeSection === null || resumeSection === void 0 ? void 0 : resumeSection.classList.add("hidden");
    formSection === null || formSection === void 0 ? void 0 : formSection.classList.remove("hidden");
    var data = JSON.parse(localStorage.getItem("resumeData") || "{}");
    document.getElementById("name").value = data.name || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("phone").value = data.phone || "";
    document.getElementById("degree").value = data.education || "";
    document.getElementById("institution").value = data.institution || "";
    document.getElementById("jobTitle").value = data.experience || "";
    document.getElementById("company").value = data.company || "";
    document.getElementById("skills").value = ((_a = data.skills) === null || _a === void 0 ? void 0 : _a.join(", ")) || "";
    profileImageDisplay.src = data.profileImage || "./assets/myProfile.webp";
    generateResumeBtn === null || generateResumeBtn === void 0 ? void 0 : generateResumeBtn.classList.remove("hidden");
});
console.log("hello");
