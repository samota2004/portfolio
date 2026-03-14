const Project = require("../models/Project");

// 🔓 GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// 🔒 ADD project (Admin only)
exports.addProject = async (req, res) => {
  try {
    const { title, description, live, github } = req.body;

    const newProject = new Project({
      title,
      description,
      live,
      github,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newProject.save();

    res.json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Error adding project" });
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