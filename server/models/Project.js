const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    tech: [
      {
        type: String,
      },
    ],

    live: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    image: {
      type: String, // image URL
      default: "",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model("Project", projectSchema);
