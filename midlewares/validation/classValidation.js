const { body, param, query } = require("express-validator");
const teacherSchema = require("../../model/teacherModel");
const childSchema = require("../../model/childModel");

exports.classInsertValidator = [
  body("name")
    .isString()
    .withMessage("class name should be string")
    .isLength({ min: 5 })
    .withMessage(" class name lenght>5"),
  body("supervisor")
    .isMongoId()
    .withMessage("supervisor ID must be a mongoId")
    .custom((value) => {
      return teacherSchema.findOne({ _id: value }).then((object) => {
        if (!object) throw new Error("this supervisor doesn't exist");
      });
    }),
  body("childrenIDS")
    .isArray()
    .withMessage("children IDs should be an array")
    .custom((value) => {
      return childSchema.find({ _id: { $in: value } }).then((data) => {
        if (data.length != value.length)
          throw new Error("The ID you entered doesn't exist");
      });
    }),
  body("childrenIDS.*").isInt().withMessage("children ID should be integer"),
];

exports.classUpdateValidator = [
  body("name")
    .optional()
    .isString()
    .withMessage("class name should be string")
    .isLength({ min: 5 })
    .withMessage(" class name lenght>5"),
  body("supervisor")
    .optional()
    .isMongoId()
    .withMessage("supervisor ID must be a mongoId")
    .custom((value) => {
      return teacherSchema.findOne({ _id: value }).then((object) => {
        if (!object) throw new Error("this supervisor doesn't exist");
      });
    }),
  body("childrenIDS")
    .optional()
    .isArray()
    .withMessage("children should be an array")
    .custom((value) => {
      return childSchema.find({ _id: { $in: value } }).then((data) => {
        if (data.length != value.length)
          throw new Error("The ID you entered doesn't exist");
      });
    }),
  body("childrenIDS.*")
    .optional()
    .isInt()
    .withMessage("children ID should be integer"),
];

exports.classIdValidator = [
  param("id").isInt().withMessage("id should be integer"),
];
