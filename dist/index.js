"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var html2pdf_js_1 = __importDefault(require("html2pdf.js"));
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
    // Show the initial dummy resume if no data in localStorage
    resumeSection === null || resumeSection === void 0 ? void 0 : resumeSection.classList.remove("hidden");
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
        experience: document.getElementById("jobTitle").value,
        skills: document.getElementById("skills").value
            .split(",")
            .map(function (skill) { return skill.trim(); }),
        profileImage: profileImageDisplay.src, // Include profile image URL
    };
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
    // Update the profile image if available
    var profileImage = document.getElementById("profile-image-display");
    if (data.profileImage) {
        profileImage.src = data.profileImage;
    }
}
// Function to handle profile image update
function handleImageUpload(event) {
    var _a;
    var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader_1 = new FileReader();
        reader_1.onloadend = function () {
            // Update the image display source with the uploaded file
            profileImageDisplay.src = reader_1.result;
        };
        reader_1.readAsDataURL(file);
    }
}
// Attach event listener to the file input
profileImageInput === null || profileImageInput === void 0 ? void 0 : profileImageInput.addEventListener("change", handleImageUpload);
// Download resume as PDF
downloadResumeBtn.addEventListener("click", function () {
    var resumeElement = document.getElementById("resume"); // The section you want to export as PDF
    if (resumeElement) {
        // Use html2pdf to generate PDF from the resume section
        (0, html2pdf_js_1.default)()
            .from(resumeElement)
            .set({
            margin: 1,
            filename: "resume.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { format: "a4", orientation: "portrait" },
        })
            .save();
    }
});
// Show form when "Edit Resume" is clicked
editResumeBtn.addEventListener("click", function () {
    // Populate form with existing data
    var data = JSON.parse(localStorage.getItem("resumeData") || "{}");
    document.getElementById("name").value = data.name || "";
    document.getElementById("email").value =
        data.email || "";
    document.getElementById("phone").value =
        data.phone || "";
    document.getElementById("degree").value =
        data.education || "";
    document.getElementById("jobTitle").value =
        data.experience || "";
    document.getElementById("skills").value =
        data.skills.join(", ") || "";
    // Set the profile image if available
    if (data.profileImage) {
        profileImageDisplay.src = data.profileImage;
    }
    resumeSection === null || resumeSection === void 0 ? void 0 : resumeSection.classList.add("hidden");
    formSection === null || formSection === void 0 ? void 0 : formSection.classList.remove("hidden");
});
