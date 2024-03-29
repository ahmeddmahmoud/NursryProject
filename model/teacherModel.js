const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["teacher", "admin"], required: true },
  email: { type: String, unique: true, required: true },
  image: { type: String },
});

module.exports = mongoose.model("teacherSchema", schema);
