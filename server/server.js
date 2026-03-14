const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


// ✅ Proper CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://portfolio-psi-eight-45.vercel.app"
    ],
    credentials: true,
  })
);


// ✅ Middleware
app.use(express.json());


// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));


// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);


// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(5000, () => {
      console.log("Server running on port 5000 🚀");
    });
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });