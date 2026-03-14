import { useState, useEffect } from "react";

function Education() {
  const [education, setEducation] = useState([]);
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

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("education"));
    if (saved) {
      setEducation(saved);
    } else {
      const defaultData = [
        {
          id: 1,
          degree: "B.Tech in Computer Science",
          college: "XYZ Engineering College, Rajasthan",
          year: "2022 – 2026",
          score: "8.5 / 10",
          label: "CGPA",
        },
        {
          id: 2,
          degree: "Senior Secondary (12th)",
          college: "ABC Senior Secondary School",
          year: "2021",
          score: "85%",
          label: "Percentage",
        },
      ];

      setEducation(defaultData);
      localStorage.setItem("education", JSON.stringify(defaultData));
    }
  }, []);

  const handleAdd = () => {
    const degree = prompt("Enter Degree");
    const college = prompt("Enter College Name");
    const year = prompt("Enter Year");
    const label = prompt("Enter Label (CGPA / Percentage)");
    const score = prompt("Enter Score");

    if (!degree || !college) return;

    const newItem = {
      id: Date.now(),
      degree,
      college,
      year,
      score,
      label,
    };

    const updated = [...education, newItem];
    setEducation(updated);
    localStorage.setItem("education", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = education.filter((item) => item.id !== id);
    setEducation(updated);
    localStorage.setItem("education", JSON.stringify(updated));
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
            key={item.id}
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
              <span className="font-semibold">
                {item.score}
              </span>
            </p>

            {isAdmin && (
              <button
                onClick={() => handleDelete(item.id)}
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
