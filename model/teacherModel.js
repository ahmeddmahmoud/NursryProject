const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const schema = new mongoose.Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  image: { type: String },
});

schema.pre("save", function (next) {
  bcryptjs
    .genSalt()
    .then((salt) => {
      bcryptjs.hash(this.password, salt).then((hash) => {
        this.password = hash;
        next();
      });
    })
    .catch((err) => next(err));
});

module.exports = mongoose.model("teacherSchema", schema);
