const { body, param, query } = require("express-validator");

exports.classInsertValidator = [
  body("name")
    .isString()
    .withMessage("class name should be string")
    .isLength({ min: 5 })
    .withMessage(" class name lenght>5"),
  body("supervisor").isMongoId().withMessage("supervisor ID must be a mongoId"),
  body("childrenIDS").isArray().withMessage("children IDs should be an array"),
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
    .withMessage("supervisor ID must be a mongoId"),
  body("childrenIDS")
    .optional()
    .isArray()
    .withMessage("children should be an array"),
  body("childrenIDS.*")
    .optional()
    .isInt()
    .withMessage("children ID should be integer"),
];

exports.classIdValidator = [
  param("id").isInt().withMessage("id should be integer"),
];
