const express = require("express");
const teacherController = require("./../controller/teachersController");
const {
  teachersInsertValidator,
} = require("./../midlewares/validation/teachersValidation");
const validatonResult = require("./../midlewares/validation/validatorResult");
const router = express.Router();

router
  .route("/register")
  .post(
    teachersInsertValidator,
    validatonResult,
    teacherController.insertTeacher
  );

module.exports = router;
