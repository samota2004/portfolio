const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected✅"))
  .catch((err) => console.log(err));

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});