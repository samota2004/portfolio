const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: String,
  college: String,
  year: String,
  score: String,
  label: String,
});

module.exports = mongoose.model("Education", educationSchema);
