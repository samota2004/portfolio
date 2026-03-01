const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProjects,
  addProject,
  deleteProject,
} = require("../controllers/projectController");


// 🔓 Public Route (sab dekh sakte hain)
router.get("/", getProjects);


// 🔒 Admin Only Routes
router.post("/", protect, addProject);
router.delete("/:id", protect, deleteProject);


module.exports = router;