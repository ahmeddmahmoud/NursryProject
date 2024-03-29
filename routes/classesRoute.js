const express = require("express");
const controller = require("./../controller/classController");
const {
  classInsertValidator,
  classUpdateValidator,
  classIdValidator,
} = require("./../midlewares/validation/classValidation");
const validatonResult = require("./../midlewares/validation/validatorResult");
const { isAdmin } = require("./../midlewares/authenticationMW");
const router = express.Router();

router
  .route("/class")
  .get(isAdmin, controller.getAllClasses)
  .post(isAdmin, classInsertValidator, validatonResult, controller.insertClass)
  .patch(
    isAdmin,
    classUpdateValidator,
    validatonResult,
    controller.updateClass
  );

router
  .route("/class/:id")
  .get(isAdmin, controller.getClassById)
  .delete(isAdmin, controller.deleteClass);

router
  .route("/class/child/:id")
  .get(isAdmin, classIdValidator, validatonResult, controller.getClassChildren);

router
  .route("/class/teacher/:id")
  .get(
    isAdmin,
    classIdValidator,
    validatonResult,
    controller.getClassSupervisor
  );

module.exports = router;
