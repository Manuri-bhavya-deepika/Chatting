import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import Navbar from '../components/Navbar';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateUserProfile: React.FC = () => {
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState<{ github?: string; linkedin?: string }>({});
  const [skills, setSkills] = useState<string[]>([]);
  const [collegeName, setCollegeName] = useState<string>("");
  const [experience, setExperience] = useState<{ companyName: string; title: string; description: string }[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [experienceErrors, setExperienceErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleRemoveExperience = (index: number) => {
    setExperience((prevExperience) => {
      const updatedExperience = prevExperience.filter((_, i) => i !== index);
      validateInputs(updatedExperience); // Revalidate inputs after removing experience
      return updatedExperience;
    });
  };


  // Validate inputs
  const validateInputs = (updatedExperience = experience) => {
    const validationErrors: string[] = [];
    const newExperienceErrors: string[] = [];

    // Check for main inputs
    if (!firstname.trim()) validationErrors.push("First name is required.");
    if (!lastname.trim()) validationErrors.push("Last name is required.");
    if (!collegeName.trim()) validationErrors.push("College name is required.");
    if (bio.length > 300) validationErrors.push("Bio must be 300 characters or fewer.");
    if (socialLinks.github && !/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+$/.test(socialLinks.github)) {
      validationErrors.push("GitHub link must be a valid URL.");
    }
    if (socialLinks.linkedin && !/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+$/.test(socialLinks.linkedin)) {
      validationErrors.push("LinkedIn link must be a valid URL.");
    }

    // Validate experience fields
    updatedExperience.forEach((exp) => {
      if (!exp.companyName.trim() && !newExperienceErrors.includes("Company name is required.")) {
        newExperienceErrors.push("Company name is required.");
      }
      if (!exp.title.trim() && !newExperienceErrors.includes("Title is required.")) {
        newExperienceErrors.push("Title is required.");
      }
      if (!exp.description.trim() && !newExperienceErrors.includes("Description is required.")) {
        newExperienceErrors.push("Description is required.");
      }
    });

    setErrors(validationErrors);
    setExperienceErrors(newExperienceErrors);

    return validationErrors.length === 0 && newExperienceErrors.length === 0;
  };

  // Handle submission
  const handleSubmit = async () => {
    if (!validateInputs()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/user-profile",
        {
          firstname,
          lastname,
          bio,
          socialLinks,
          skills,
          collegeName,
          experience: experience.filter(
            (i) => i.companyName && i.title && i.description
          ),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Saved profile:", response.data);
        navigate("/feed");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setErrors(["Failed to save profile. Please try again."]);
    }
  };

  const handleAddExperience = () => {
    setExperience([...experience, { companyName: "", title: "", description: "" }]);
  };

  const handleInputChange = (
    index: number,
    field: string,
    value: string,
    setter: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    setter((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center p-6">
    <Navbar/>
      <div className="flex flex-col justify-center w-full max-w-2xl mt-20">
        <div className="rounded-lg bg-white pl-6 pr-6 max-h-[90vh] overflow-auto shadow-lg ">
          {/* <Heading label="Update User Profile"/> */}
          <div className="text-lg sm:text-xl md:text-2xl tracking-tight sm:whitespace-normal lg:whitespace-nowrap">
            <Heading label="Update User Profile" />
          </div>

          <SubHeading label="Enter your details below" />
          {errors.length > 0 && (
            <ul className="text-red-500 text-sm mb-2 list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          <Inputbox
            label="First Name"
            placeholder="Enter first name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value.replace(/[^a-zA-Z]/g, ""))} 
          />
          <Inputbox
            label="Last Name"
            placeholder="Enter last name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value.replace(/[^a-zA-Z]/g, ""))} 
          />
          <Inputbox
            label="Bio"
            placeholder="Enter bio (max 300 characters)"
            value={bio}
            onChange={(e) => setBio(e.target.value.replace(/[^a-zA-Z]/g, ""))} 
          />
          <Inputbox
            label="GitHub Profile"
            placeholder="Enter GitHub URL"
            value={socialLinks.github || ""}
            onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
          />
          <Inputbox
            label="LinkedIn Profile"
            placeholder="Enter LinkedIn URL"
            value={socialLinks.linkedin || ""}
            onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
          />
          <Inputbox
            label="Skills (comma-separated)"
            placeholder="Enter tech stacks"
            value={skills.join(", ")}
            onChange={(e) => {
              const input = e.target.value;
              const filteredInput = input.replace(/[^a-zA-Z, ]/g, "");
              setSkills(filteredInput.split(",").map((skill) => skill.trim()));
            }}
          />
          <Inputbox
            label="College Name"
            placeholder="Enter college name"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value.replace(/[^a-zA-Z]/g, ""))} 
          />
          <div className="pt-4">
            <div className="mb-6 px-4">
              <Heading label="Experience" />
            </div>
            {experienceErrors.length > 0 && (
              <ul className="text-red-500 text-sm mb-2 list-disc list-inside">
                {experienceErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            {experience.map((exp, index) => (
              <div key={index} className="border p-4 mb-4 bg-white shadow-lg rounded-lg relative">
                <Inputbox
                  label="Company Name"
                  placeholder="Enter company name"
                  value={exp.companyName}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(value)) {
                      handleInputChange(index, "companyName", value, setExperience);
                    }
                  }}
                />
                <Inputbox
                  label="Title"
                  placeholder="Enter Title"
                  value={exp.title}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(value)) {
                      handleInputChange(index, "title", value, setExperience);
                    }
                  }}
                />
                <Inputbox
                  label="Description"
                  placeholder="Enter description"
                  value={exp.description}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(value)) {
                      handleInputChange(index, "description", value, setExperience);
                    }
                  }}
                />
                <button
                  onClick={() => handleRemoveExperience(index)}
                  className="absolute top-2 right-2 text-black-500 text-sm">
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-6">
              <Button label="Add Experience" onClick={handleAddExperience} />
            </div>
          </div>
          <div className="pt-4">
            <Button label="Update Profile" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateUserProfile;

