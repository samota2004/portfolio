import { useState, useEffect } from "react";

function Achievements() {
  const [achievements, setAchievements] = useState([]);
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
    const saved = JSON.parse(localStorage.getItem("achievements"));

    if (saved) {
      setAchievements(saved);
    } else {
      const defaultData = [
        {
          id: 1,
          title: "Hackathon Finalist",
          desc: "National Level Hackathon – Built AI Based Portfolio Analyzer",
        },
        {
          id: 2,
          title: "Coding Competition Winner",
          desc: "College Tech Fest – 1st Position",
        },
        {
          id: 3,
          title: "Technical Club Coordinator",
          desc: "Organized Web Development Workshops",
        },
      ];

      setAchievements(defaultData);
      localStorage.setItem("achievements", JSON.stringify(defaultData));
    }
  }, []);

  const handleAdd = () => {
    const title = prompt("Enter Achievement Title");
    const desc = prompt("Enter Description");

    if (!title || !desc) return;

    const newItem = {
      id: Date.now(),
      title,
      desc,
    };

    const updated = [...achievements, newItem];
    setAchievements(updated);
    localStorage.setItem("achievements", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = achievements.filter((item) => item.id !== id);
    setAchievements(updated);
    localStorage.setItem("achievements", JSON.stringify(updated));
  };

  return (
    <section id="achievements" className="bg-cream px-24 py-32">
      <div className="flex justify-between items-center mb-16">
        <div>
          <p className="text-gold tracking-[3px] text-xs uppercase mb-6">
            Achievements
          </p>

          <h2 className="text-5xl font-serif">
            Awards & <span className="text-gold italic">Activities</span>
          </h2>
        </div>

        {isAdmin && (
          <button
            onClick={handleAdd}
            className="bg-gold px-6 py-2 text-black"
          >
            + Add
          </button>
        )}
      </div>

      <div className="space-y-8">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="border-l-4 border-gold pl-6 relative group 
                       hover:bg-[#C6A14A] 
                       hover:border-[#C6A14A]
                       transition-all duration-300 
                       cursor-pointer"
          >
            <h3 className="text-xl font-semibold">
              {item.title}
            </h3>

            <p className="text-gray-600">
              {item.desc}
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

export default Achievements;