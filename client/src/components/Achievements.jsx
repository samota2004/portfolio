import { useState, useEffect } from "react";

const API_URL = "https://portfolio-kxuy.onrender.com/api/achievements";

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // 🔹 Check Admin
  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };

    checkAdmin();
  }, []);

  // 🔹 Fetch Achievements
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setAchievements(data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    fetchAchievements();
  }, []);

  // 🔹 Add Achievement
  const handleAdd = async () => {
    const title = prompt("Enter Achievement Title");
    const desc = prompt("Enter Description");

    if (!title || !desc) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, desc }),
      });

      const data = await res.json();
      setAchievements([...achievements, data]);
    } catch (error) {
      console.error("Error adding achievement:", error);
    }
  };

  // 🔹 Delete Achievement
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setAchievements(achievements.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
  };

  return (
    <section
      id="achievements"
      className="bg-cream px-6 md:px-24 py-20 md:py-32"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-16 gap-6">

        <div>
          <p className="text-gold tracking-[3px] text-xs uppercase mb-4">
            Achievements
          </p>

          <h2 className="text-3xl md:text-5xl font-serif">
            Awards & <span className="text-gold italic">Activities</span>
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

      <div className="space-y-8">

        {achievements.map((item) => (
          <div
            key={item._id}
            className="border-l-4 border-gold pl-6 relative group
                       hover:bg-[#C6A14A]
                       hover:border-[#C6A14A]
                       transition-all duration-300"
          >

            <h3 className="text-lg md:text-xl font-semibold">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm md:text-base">
              {item.desc}
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

export default Achievements;
