const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getProjects,
  addProject,
  deleteProject,
} = require("../controllers/projectController");


// 🔓 Public Route (sab users projects dekh sakte hain)
router.get("/", getProjects);


// 🔒 Admin Only Routes
router.post("/", protect, upload.single("image"), addProject);

router.delete("/:id", protect, deleteProject);


module.exports = router;
