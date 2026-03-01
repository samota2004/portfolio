const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tech: [String],
  live: String,
  github: String,
});

module.exports = mongoose.model("Project", projectSchema);