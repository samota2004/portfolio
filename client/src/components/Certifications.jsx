import { useState, useEffect } from "react";

function Certifications() {
  const [certifications, setCertifications] = useState([]);
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
    const saved = JSON.parse(localStorage.getItem("certifications"));

    if (saved && saved.length > 0) {
      setCertifications(saved);
    } else {
      const defaultData = [
        {
          id: 1,
          title: "Full Stack Web Development",
          org: "Coursera – Meta Professional Certificate",
        },
        {
          id: 2,
          title: "React Advanced Course",
          org: "Udemy – Advanced React & Redux",
        },
        {
          id: 3,
          title: "MongoDB Workshop",
          org: "Hands-on Database Optimization Workshop",
        },
        {
          id: 4,
          title: "Web Development Internship",
          org: "XYZ Company – 3 Months Internship",
        },
      ];

      setCertifications(defaultData);
      localStorage.setItem("certifications", JSON.stringify(defaultData));
    }
  }, []);

  const handleAdd = () => {
    const title = prompt("Enter Certification Title");
    const org = prompt("Enter Organization");

    if (!title || !org) return;

    const newItem = {
      id: Date.now(),
      title,
      org,
    };

    const updated = [...certifications, newItem];
    setCertifications(updated);
    localStorage.setItem("certifications", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = certifications.filter((c) => c.id !== id);
    setCertifications(updated);
    localStorage.setItem("certifications", JSON.stringify(updated));
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
            key={item.id}
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
                onClick={() => handleDelete(item.id)}
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
