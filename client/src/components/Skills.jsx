import { useState, useEffect } from "react";

const API_URL = "https://portfolio-kxuy.onrender.com/api/skills";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // 🔹 Check Admin
  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };

    checkAdmin();
  }, []);

  // 🔹 Fetch Skills from MongoDB
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  // 🔹 Add Skill
  const addSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newSkill }),
      });

      const data = await res.json();
      setSkills([...skills, data]);
      setNewSkill("");
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  // 🔹 Delete Skill
  const deleteSkill = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setSkills(skills.filter((skill) => skill._id !== id));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <section
      id="skills"
      className="bg-[#0E0E0E] text-white px-6 md:px-24 py-20 md:py-32"
    >
      {/* Heading */}
      <div className="mb-12 md:mb-20">
        <p className="text-gold tracking-[3px] text-xs uppercase mb-4">
          Skills & Expertise
        </p>

        <h2 className="text-3xl md:text-6xl leading-tight max-w-4xl">
          Crafting solutions with{" "}
          <span className="text-gold italic">
            modern technologies
          </span>
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mb-12 md:mb-20">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="relative border border-gold 
                       px-6 md:px-8 py-5 md:py-6 text-center tracking-wide
                       hover:bg-gold hover:text-black
                       transition duration-300
                       min-h-[60px] md:min-h-[70px]
                       flex items-center justify-center"
          >
            <span className="font-medium text-base md:text-lg">
              {skill.name}
            </span>

            {isAdmin && (
              <button
                onClick={() => deleteSkill(skill._id)}
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

      {/* Add Skill */}
      {isAdmin && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Add new skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="px-5 py-3 text-black w-full sm:w-72 outline-none"
          />

          <button
            onClick={addSkill}
            className="bg-gold text-black px-8 py-3 hover:bg-white transition"
          >
            Add Skill
          </button>
        </div>
      )}
    </section>
  );
}

export default Skills;
