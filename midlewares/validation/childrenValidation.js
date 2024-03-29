const { body, param, query } = require("express-validator");

exports.childrenInsertValidator = [
  body("fullName")
    .isAlpha()
    .withMessage("Child username should be string")
    .isLength({ min: 4 })
    .withMessage(" Child userName lenght>5"),
  body("age")
    .isInt({ min: 3, max: 10 })
    .withMessage("Age should be an integer"),
  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level should be within PreKG,KG1,KG2"),
  body("address").isObject().withMessage("Address should be object"),
  body("address.city").isString().withMessage("City should be a string"),
  body("address.street").isInt().withMessage("Street should be a number"),
  body("address.building").isInt().withMessage("Building should be a string"),
];

exports.childrenUpdateValidator = [
  body("fullName")
    .optional()
    .isAlpha()
    .withMessage("Child username should be string")
    .isLength({ min: 4 })
    .withMessage(" Child userName lenght>5"),
  body("age")
    .optional()
    .isInt({ min: 3, max: 10 })
    .withMessage("Age should be an integer"),
  body("level")
    .optional()
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level should be within PreKG,KG1,KG2"),
  body("address").optional().isObject().withMessage("Address should be object"),
  body("address.city")
    .optional()
    .isString()
    .withMessage("City should be a string"),
  body("address.street")
    .optional()
    .isInt()
    .withMessage("Street should be a number"),
  body("address.building")
    .optional()
    .isInt()
    .withMessage("Building should be a string"),
];

exports.childrenIdValidator = [
  param("id").isInt().withMessage("id should be integer"),
];
