const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "teacherSchema", required: true },
  childrenIDS: [{ type: Number, ref: "childSchema", required: true }],
});

schema.plugin(AutoIncrement, { id: "class_id", inc_field: "_id" });
module.exports = mongoose.model("classSchema", schema);
