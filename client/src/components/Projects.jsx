import { useState, useEffect } from "react";

const API_URL = "https://portfolio-kxuy.onrender.com/api/projects";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };

    checkAdmin();
  }, []);

  // 🔹 Fetch Projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  // 🔹 Add Project
  const handleAdd = async () => {
    const title = prompt("Enter Project Title");
    const description = prompt("Enter Description");
    const live = prompt("Enter Live Project URL");
    const github = prompt("Enter GitHub Repository URL");

    if (!title || !description) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          live,
          github,
        }),
      });

      const data = await res.json();
      setProjects([...projects, data]);
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  // 🔹 Delete Project
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <section id="projects" className="bg-cream px-6 md:px-24 py-20 md:py-32">

      <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:justify-between md:items-center gap-6">

        <div>
          <p className="text-gold tracking-[3px] text-xs uppercase mb-4">
            Selected Work
          </p>

          <h2 className="text-3xl md:text-6xl leading-tight">
            Featured <span className="text-gold italic">Projects</span>
          </h2>
        </div>

        {isAdmin && (
          <button
            onClick={handleAdd}
            className="bg-gold px-6 py-2 text-black w-fit"
          >
            + Add Project
          </button>
        )}

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

        {projects.map((project) => (
          <div
            key={project._id}
            className="border border-gray-300 bg-white relative"
          >

            <div className="h-[220px] md:h-[300px] bg-black flex items-center justify-center overflow-hidden">

              {project.image ? (
                <img
                  src={`https://portfolio-kxuy.onrender.com${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <h3 className="text-white opacity-40 font-serif text-xl md:text-2xl">
                  Project Image
                </h3>
              )}

            </div>

            <div className="p-6 md:p-8">

              <h3 className="text-xl md:text-2xl font-serif mb-3 md:mb-4">
                {project.title}
              </h3>

              <p className="text-gray-600 text-sm md:text-base mb-5 md:mb-6">
                {project.description}
              </p>

              <div className="flex gap-4 md:gap-6 flex-wrap">

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold text-black px-5 py-2 text-sm"
                >
                  LIVE →
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gold text-gold px-5 py-2 text-sm
                             hover:bg-gold hover:text-black
                             transition duration-300"
                >
                  GITHUB
                </a>

              </div>

            </div>

            {isAdmin && (
              <button
                onClick={() => handleDelete(project._id)}
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

export default Projects;
