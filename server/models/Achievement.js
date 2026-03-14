const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: String,
  desc: String,
});

module.exports = mongoose.model("Achievement", achievementSchema);
