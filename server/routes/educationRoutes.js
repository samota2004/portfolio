const router = require("express").Router();
const Education = require("../models/Education");

// GET
router.get("/", async (req, res) => {
  const data = await Education.find();
  res.json(data);
});

// ADD
router.post("/", async (req, res) => {
  const item = new Education(req.body);
  await item.save();
  res.json(item);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
