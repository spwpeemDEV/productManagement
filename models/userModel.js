const mongoose = require("mongoose");
const users = new mongoose.Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  role: { type: String, default: "user" },
  approve: { type: Boolean, default: false },
});

module.exports = mongoose.model("users", users);
