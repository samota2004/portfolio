import { useState, useEffect } from "react";

const API_URL = "https://portfolio-kxuy.onrender.com/api/projects";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    live: "",
    github: "",
    image: null
  });

  // Admin check
  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Image
  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // Add project
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("tech", form.tech);
    formData.append("live", form.live);
    formData.append("github", form.github);
    formData.append("image", form.image);

    await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    setForm({
      title: "",
      description: "",
      tech: "",
      live: "",
      github: "",
      image: null
    });

    fetchProjects();
  };

  // Delete project
  const deleteProject = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchProjects();
  };

  return (
    <section id="projects" className="px-6 md:px-24 py-20 bg-cream">

      <h2 className="text-4xl font-serif mb-16">
        Featured <span className="text-gold italic">Projects</span>
      </h2>

      {/* ADMIN FORM */}
      {isAdmin && (
        <form onSubmit={handleSubmit} className="mb-16 space-y-4">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project Title"
            className="w-full p-3 border"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Project Description"
            className="w-full p-3 border"
            required
          />

          <input
            name="tech"
            value={form.tech}
            onChange={handleChange}
            placeholder="Tech Stack (React, Node, MongoDB)"
            className="w-full p-3 border"
          />

          <input
            name="live"
            value={form.live}
            onChange={handleChange}
            placeholder="Live URL"
            className="w-full p-3 border"
          />

          <input
            name="github"
            value={form.github}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="w-full p-3 border"
          />

          <input 
            type="file"
            name = "image"
            accept="image/*"
            onChange={handleImage} />

          <button className="bg-gold px-6 py-3">
            Add Project
          </button>

        </form>
      )}

      {/* PROJECT GRID */}
      <div className="grid md:grid-cols-2 gap-12">

        {projects.map((project) => (

          <div key={project._id} className="border bg-white relative">

            {/* IMAGE */}
            <div className="h-[260px] bg-black flex items-center justify-center overflow-hidden">

              {project.image ? (
                <img
                  src={`https://portfolio-kxuy.onrender.com${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <h3 className="text-white opacity-40 text-xl">
                  Project Image
                </h3>
              )}

            </div>

            {/* CONTENT */}
            <div className="p-8">

              <h3 className="text-2xl font-serif mb-2">
                {project.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {project.description}
              </p>

              {/* TECH */}
              {project.tech?.length > 0 && (
                <p className="text-sm text-gray-500 mb-6">
                  {project.tech.join(", ")}
                </p>
              )}

              {/* BUTTONS */}
              <div className="flex gap-6 mb-6">

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold px-5 py-2 text-sm"
                  >
                    LIVE →
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gold px-5 py-2 text-sm
                               hover:bg-gold hover:text-black
                               transition"
                  >
                    GITHUB
                  </a>
                )}

              </div>

              {/* IMAGE NAME */}
              {isAdmin && project.image && (
                <div className="flex justify-between text-xs text-gray-500">

                  <span>
                    Image:
                  </span>

                  <span>
                    {project.image.split("/").pop()}
                  </span>

                </div>
              )}

            </div>

            {/* DELETE BUTTON */}
            {isAdmin && (
              <button
                onClick={() => deleteProject(project._id)}
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
