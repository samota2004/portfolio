const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected✅ "))
  .catch((err) => console.log(err));

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("Pinka$@106", 10);

  const admin = new Admin({
    email: "priyankasamota946@gmail.com",
    password: hashedPassword,
  });

  await admin.save();
  console.log("Admin Created ✅");
  process.exit();
};

createAdmin();