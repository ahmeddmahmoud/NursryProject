const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const addressSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true },
  },
  { _id: false }
);

const schema = new mongoose.Schema({
  _id: { type: Number },
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  level: { type: String, enum: ["PreKG", "KG1", "KG2"], required: true },
  address: { type: addressSchema, required: true },
});

schema.plugin(AutoIncrement, { id: "child_id", inc_field: "_id" });
module.exports = mongoose.model("childSchema", schema);
