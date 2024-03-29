const { body, param, query } = require("express-validator");

exports.teachersInsertValidator = [
  body("fullName")
    .isAlpha()
    .withMessage("Teacher username should be string")
    .isLength({ min: 4 })
    .withMessage(" Teacher userName lenght>5"),
  body("password")
    .isStrongPassword()
    .withMessage("You should provide a strong password"),
  body("role")
    .isIn(["admin", "teacher"])
    .withMessage("role should be within admin,teacher"),
  body("email")
    .isEmail()
    .withMessage("You should provide a correct form email"),
  body("image").isString().withMessage("You should provide a string"),
];

exports.teachersUpdateValidator = [
  body("_id").isMongoId().withMessage("Id should be Mongo ID"),
  body("fullName")
    .optional()
    .isAlpha()
    .withMessage("Teacher username should be string")
    .isLength({ min: 4 })
    .withMessage(" Teacher userName lenght>5"),
  body("password")
    .optional()
    .isStrongPassword()
    .withMessage("You should provide a strong password"),
  body("role")
    .optional()
    .isIn(["admin", "teacher"])
    .withMessage("role should be within admin,teacher"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("You should provide a correct form email"),
  body("image")
    .optional()
    .isString()
    .withMessage("You should provide a string"),
];

exports.teacherIdValidator = [
  param("id").isMongoId().withMessage("Teacher ID must be Mongo ID"),
];
