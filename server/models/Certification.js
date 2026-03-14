const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  title: String,
  org: String,
});

module.exports = mongoose.model("Certification", certificationSchema);
