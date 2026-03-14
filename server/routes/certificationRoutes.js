const router = require("express").Router();
const Certification = require("../models/Certification");

router.get("/", async (req, res) => {
  const data = await Certification.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const item = new Certification(req.body);
  await item.save();
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  await Certification.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
