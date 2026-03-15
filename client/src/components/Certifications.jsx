import { useState, useEffect } from "react";

const API_URL = "https://portfolio-kxuy.onrender.com/api/certifications";

function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // 🔹 Check Admin
  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };

    checkAdmin();
  }, []);

  // 🔹 Fetch Certifications
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setCertifications(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    fetchCertifications();
  }, []);

  // 🔹 Add Certification
  const handleAdd = async () => {
    const title = prompt("Enter Certification Title");
    const org = prompt("Enter Organization");

    if (!title || !org) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, org }),
      });

      const data = await res.json();
      setCertifications([...certifications, data]);
    } catch (error) {
      console.error("Error adding certification:", error);
    }
  };

  // 🔹 Delete Certification
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setCertifications(
        certifications.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting certification:", error);
    }
  };

  return (
    <section
      id="certifications"
      className="bg-white px-6 md:px-24 py-20 md:py-32"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-16 gap-6">

        <div>
          <p className="text-gold tracking-[3px] text-xs uppercase mb-4">
            Certifications
          </p>

          <h2 className="text-3xl md:text-5xl font-serif">
            Professional <span className="text-gold italic">Certifications</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

        {certifications.map((item) => (
          <div
            key={item._id}
            className="border p-6 md:p-8 shadow-sm relative group
                       hover:bg-[#C6A14A]
                       hover:border-[#C6A14A]
                       transition-all duration-300"
          >

            <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-black">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm md:text-base group-hover:text-black">
              {item.org}
            </p>

            {isAdmin && (
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 text-xs"
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

export default Certifications;
