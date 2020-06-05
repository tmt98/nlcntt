const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  user: String,
  password: String,
  name: String,
  address: String,
  living: String,
  joindate: { type: Date, default: Date.now },
  avatar: String,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const User = mongoose.model("User", userSchema, "user");
module.exports = User;
