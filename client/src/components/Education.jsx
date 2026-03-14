import { useState, useEffect } from "react";

const API_URL = "https://your-backend-url/api/education"; 
// ⚠️ yaha apna backend URL daalna hai
// example: https://portfolio-api.onrender.com/api/education

function Education() {
  const [education, setEducation] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };

    checkAdmin();
  }, []);

  // 🔹 Fetch Education from MongoDB
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setEducation(data);
      } catch (error) {
        console.error("Error fetching education:", error);
      }
    };

    fetchEducation();
  }, []);

  // 🔹 Add Education
  const handleAdd = async () => {
    const degree = prompt("Enter Degree");
    const college = prompt("Enter College Name");
    const year = prompt("Enter Year");
    const label = prompt("Enter Label (CGPA / Percentage)");
    const score = prompt("Enter Score");

    if (!degree || !college) return;

    const newItem = {
      degree,
      college,
      year,
      score,
      label,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const data = await res.json();
      setEducation([...education, data]);
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  // 🔹 Delete Education
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setEducation(education.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  return (
    <section
      id="education"
      className="bg-white px-6 md:px-24 py-20 md:py-32"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 md:mb-16 gap-6">
        <div>
          <p className="text-gold tracking-[3px] text-xs uppercase mb-4">
            Education
          </p>

          <h2 className="text-3xl md:text-5xl font-serif">
            Academic <span className="text-gold italic">Background</span>
          </h2>
        </div>

        {isAdmin && (
          <button
            onClick={handleAdd}
            className="bg-gold px-6 py-2 text-black w-fit"
          >
            + Add
          </button>
        )}
      </div>

      <div className="space-y-8 md:space-y-12">
        {education.map((item) => (
          <div
            key={item._id}
            className="border-l-4 border-gold pl-5 md:pl-8 relative group
                       hover:bg-[#C6A14A]
                       hover:border-[#C6A14A]
                       transition-all duration-300"
          >
            <h3 className="text-lg md:text-2xl font-semibold group-hover:text-black">
              {item.degree}
            </h3>

            <p className="text-gray-600 mt-2 text-sm md:text-base group-hover:text-black">
              {item.college}
            </p>

            <p className="text-gray-500 mt-1 text-sm md:text-base group-hover:text-black">
              {item.year}
            </p>

            <p className="text-gray-600 mt-3 text-sm md:text-base group-hover:text-black">
              {item.label}:{" "}
              <span className="font-semibold">{item.score}</span>
            </p>

            {isAdmin && (
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute right-0 top-0 bg-red-500 text-white px-3 py-1 text-xs"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
