const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

exports.addProject = async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.json(newProject);
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project Deleted" });
};