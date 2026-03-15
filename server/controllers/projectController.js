const Project = require("../models/Project");


// 🔓 GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// 🔒 ADD project (Admin only)
exports.addProject = async (req, res) => {
  try {

    const { title, description, tech, live, github } = req.body;

    const project = new Project({
      title,
      description,
      tech: tech ? tech.split(",") : [],   // ⭐ string → array
      live,
      github,
      image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    const savedProject = await project.save();

    res.status(201).json(savedProject);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔒 DELETE project
exports.deleteProject = async (req, res) => {
  try {

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project Deleted" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting project" });
  }
};
