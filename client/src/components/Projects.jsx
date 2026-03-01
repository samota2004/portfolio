import { useState, useEffect } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
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
    const savedProjects = JSON.parse(localStorage.getItem("projects"));
    if (savedProjects) {
      setProjects(savedProjects);
    } else {
      const defaultProjects = [
        {
          id: 1,
          title: "Luxury E-Commerce Platform",
          description:
            "A full-featured e-commerce website with authentication and Stripe integration.",
          live: "#",
          github: "#",
          image: null,
        },
      ];
      setProjects(defaultProjects);
      localStorage.setItem("projects", JSON.stringify(defaultProjects));
    }
  }, []);

  const handleDelete = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  const handleAdd = () => {
    const title = prompt("Enter Project Title");
    const description = prompt("Enter Description");
    const live = prompt("Enter Live Project URL");
    const github = prompt("Enter GitHub Repository URL");

    if (!title || !description) return;

    const newProject = {
      id: Date.now(),
      title,
      description,
      live: live || "#",
      github: github || "#",
      image: null,
    };

    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const updated = projects.map((p) =>
        p.id === id ? { ...p, image: reader.result } : p
      );
      setProjects(updated);
      localStorage.setItem("projects", JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="projects" className="bg-cream px-24 py-32">
      <div className="mb-20 flex justify-between items-center">
        <div>
          <p className="text-gold tracking-[3px] text-xs uppercase mb-6">
            Selected Work
          </p>
          <h2 className="text-6xl leading-tight">
            Featured <span className="text-gold italic">Projects</span>
          </h2>
        </div>

        {isAdmin && (
          <button
            onClick={handleAdd}
            className="bg-gold px-6 py-2 text-black"
          >
            + Add Project
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-16">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-300 bg-white relative"
          >
            <div className="h-[300px] bg-black flex items-center justify-center overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <h3 className="text-white opacity-40 font-serif text-2xl">
                  Project Image
                </h3>
              )}
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-serif mb-4">
                {project.title}
              </h3>

              <p className="text-gray-600 text-sm mb-6">
                {project.description}
              </p>

              <div className="flex gap-6">
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

              {isAdmin && (
                <div className="mt-4">
                  <label className="text-sm cursor-pointer text-gold">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, project.id)}
                    />
                  </label>
                </div>
              )}
            </div>

            {isAdmin && (
              <button
                onClick={() => handleDelete(project.id)}
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