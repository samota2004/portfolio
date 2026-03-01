import { useState, useEffect } from "react";

function Skills() {
  const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  const checkAdmin = () => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  };

  checkAdmin();
  window.addEventListener("storage", checkAdmin);

  return () => {
    window.removeEventListener("storage", checkAdmin);
  };
}, []);

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  // 🔹 Load from localStorage
  useEffect(() => {
    const savedSkills = JSON.parse(localStorage.getItem("skills"));

    if (savedSkills) {
      setSkills(savedSkills);
    } else {
      const defaultSkills = [
        "HTML & CSS",
        "JavaScript",
        "React JS",
        "Node JS",
        "MongoDB",
        "UI / UX Design",
      ];
      setSkills(defaultSkills);
      localStorage.setItem("skills", JSON.stringify(defaultSkills));
    }
  }, []);

  // ✅ Add Skill
  const addSkill = () => {
    if (newSkill.trim() !== "") {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      localStorage.setItem("skills", JSON.stringify(updatedSkills));
      setNewSkill("");
    }
  };

  // ✅ Delete Skill
  const deleteSkill = (indexToDelete) => {
    const updatedSkills = skills.filter(
      (_, index) => index !== indexToDelete
    );
    setSkills(updatedSkills);
    localStorage.setItem("skills", JSON.stringify(updatedSkills));
  };

  return (
    <section
      id="skills"
      className="bg-[#0E0E0E] text-white px-24 py-32"
    >
      {/* Heading */}
      <div className="mb-20">
        <p className="text-gold tracking-[3px] text-xs uppercase mb-6">
          Skills & Expertise
        </p>

        <h2 className="text-6xl leading-tight max-w-4xl">
          Crafting solutions with{" "}
          <span className="text-gold italic">
            modern technologies
          </span>
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="relative border border-gold 
                       px-8 py-6 text-center tracking-wide
                       hover:bg-gold hover:text-black
                       transition duration-300
                       min-h-[70px]
                       flex items-center justify-center"
          >
            <span className="font-medium text-lg">
              {skill}
            </span>

            {/* ❌ Delete Button (Admin Only) */}
            {isAdmin && (
              <button
                onClick={() => deleteSkill(index)}
                className="absolute top-2 right-3 
                           text-xs text-red-400 
                           hover:text-white transition"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ➕ Add Skill (Admin Only) */}
      {isAdmin && (
        <div className="flex justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Add new skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="px-5 py-3 text-black w-72 outline-none"
          />

          <button
            onClick={addSkill}
            className="bg-gold text-black px-8 py-3 
                       hover:bg-white transition"
          >
            Add Skill
          </button>
        </div>
      )}
    </section>
  );
}

export default Skills;