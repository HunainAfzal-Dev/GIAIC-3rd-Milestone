interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

interface Education {
  degree: string;
  institution: string;
}

interface Experience {
  jobTitle: string;
  company: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education;
  experience: Experience;
  skills: string[];
}

function getFormData(): ResumeData {
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;

  const degree = (document.getElementById("degree") as HTMLInputElement).value;
  const institution = (
    document.getElementById("institution") as HTMLInputElement
  ).value;

  const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement).value;
  const company = (document.getElementById("company") as HTMLInputElement).value;


  const skillsInput = (document.getElementById("skills") as HTMLInputElement).value;
  const skills = skillsInput ? skillsInput.split(",").map((skill) => skill.trim()) : [];
  
  
  console.log( "skillsinput", skillsInput)
  console.log("Captured Skills:", skills);

  return {
    personalInfo: { name, email, phone },
    education: { degree, institution },
    experience: { jobTitle, company },
    skills,
  };
}

function renderResume(resumeData: ResumeData) {
  const personalInfoSection = document.getElementById("personal-info")!;
  personalInfoSection.innerHTML = `
    <h1>${resumeData.personalInfo.name}</h1>
    <p>${resumeData.personalInfo.email}</p>
    <p>${resumeData.personalInfo.phone}</p>
    `;

  const educationSection = document.getElementById("education")!;

  educationSection.innerHTML = `
    <h1>Education</h1>  
    <p>${resumeData.education.degree}</p>
    <p>${resumeData.education.institution}</p>
    `;

  const experienceSection = document.getElementById("experience")!;
  experienceSection.innerHTML = `
    <h1>Work Experience</h1>
    <h3>${resumeData.experience.jobTitle}</h3>
    <p>${resumeData.experience.company}</p>
  `;

  const skillsSection = document.querySelector('.skills-list')!;
  skillsSection.innerHTML = ''; 

  if(resumeData.skills.length > 0){
    resumeData.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsSection.appendChild(li);
    })
  } 
  else{
    const li = document.createElement('li');
    li.textContent = "No Skills Provided"
    skillsSection.appendChild(li)
  }

}

const form = document.getElementById("resumeForm");

form?.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const formData = getFormData();
  renderResume(formData);
});
