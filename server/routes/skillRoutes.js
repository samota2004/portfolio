const router = require("express").Router();
const Skill = require("../models/Skill");

router.get("/", async (req, res) => {
  const data = await Skill.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const item = new Skill(req.body);
  await item.save();
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
