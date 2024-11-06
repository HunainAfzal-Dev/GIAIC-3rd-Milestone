// Elements
const profileImageInput = document.getElementById("profileImage") as HTMLInputElement;
const profileImageDisplay = document.getElementById("profile-image-display") as HTMLImageElement;
const resumeSection = document.getElementById("resume");
const formSection = document.getElementById("resumeForm");
const generateResumeBtn = document.getElementById("generateResumeBtn")!;
const resumeForm = document.getElementById("resumeForm")!;
const downloadResumeBtn = document.getElementById("downloadResume")!;
const editResumeBtn = document.getElementById("editResumeBtn")!; // Edit button

// Check if there's any data in localStorage
const storedData = localStorage.getItem("resumeData");
if (storedData) {
  const data = JSON.parse(storedData);
  updateResume(data);
} else {
  // Show the initial dummy resume if no data in localStorage
  resumeSection?.classList.remove("hidden");
}

// Show form when "Generate Resume" is clicked
generateResumeBtn.addEventListener("click", () => {
  resumeSection?.classList.add("hidden");
  formSection?.classList.remove("hidden");
  generateResumeBtn?.classList.add("hidden")
});

// Handle form submission
resumeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: (document.getElementById("name") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    phone: (document.getElementById("phone") as HTMLInputElement).value,
    education: (document.getElementById("degree") as HTMLInputElement).value,
    experience: (document.getElementById("jobTitle") as HTMLInputElement).value,
    skills: (document.getElementById("skills") as HTMLInputElement).value.split(",").map((skill) => skill.trim()),
    profileImage: profileImageDisplay.src, // Include profile image URL
  };

  // Save data to localStorage
  localStorage.setItem("resumeData", JSON.stringify(formData));

  // Update resume with form data
  updateResume(formData);

  // Hide form and show resume
  formSection?.classList.add("hidden");
  resumeSection?.classList.remove("hidden");
});

// Function to update the resume with form data
function updateResume(data: any) {
  const nameElement = document.querySelector("#resume h1")!;
  (nameElement as HTMLElement).innerText = data.name;

  const emailElement = document.querySelector("#resume p")!;
  (emailElement as HTMLElement).innerText = data.email;

  const phoneElement = document.querySelector("#resume p:nth-of-type(2)")!;
  (phoneElement as HTMLElement).innerText = data.phone;

  const skillsList = document.querySelector("#skillsSection ul")!;
  skillsList.innerHTML = ""; // Clear existing skills
  data.skills.forEach((skill: string) => {
    const li = document.createElement("li");
    li.innerText = skill;
    skillsList.appendChild(li);
  });

  const educationElement = document.querySelector("#education h3")!;
  (educationElement as HTMLElement).innerText = data.education;

  const experienceElement = document.querySelector("#experience h3")!;
  (experienceElement as HTMLElement).innerText = data.experience;

  // Update the profile image if available
  const profileImage = document.getElementById("profile-image-display") as HTMLImageElement;
  if (data.profileImage) {
    profileImage.src = data.profileImage;
  }
}

// Function to handle profile image update
function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();

    reader.onloadend = function () {
      // Update the image display source with the uploaded file
      profileImageDisplay.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}


// Show form when "Edit Resume" is clicked
editResumeBtn.addEventListener("click", () => {
  // Populate form with existing data
  const data = JSON.parse(localStorage.getItem("resumeData") || "{}");
  (document.getElementById("name") as HTMLInputElement).value = data.name || "";
  (document.getElementById("email") as HTMLInputElement).value = data.email || "";
  (document.getElementById("phone") as HTMLInputElement).value = data.phone || "";
  (document.getElementById("degree") as HTMLInputElement).value = data.education || "";
  (document.getElementById("jobTitle") as HTMLInputElement).value = data.experience || "";
  (document.getElementById("skills") as HTMLInputElement).value = data.skills.join(", ") || "";

  // Set the profile image if available
  if (data.profileImage) {
    profileImageDisplay.src = data.profileImage;
  }

  resumeSection?.classList.add("hidden");
  formSection?.classList.remove("hidden");
});
