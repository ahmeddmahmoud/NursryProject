const express = require("express");
const controller = require("./../controller/childController");
const photoController = require("./../controller/photoController");
const { isAdmin, isTeacherOrAdmin } = require("./../midlewares/authenticationMW");

const {
  childrenInsertValidator,
  childrenUpdateValidator,
  childrenIdValidator,
} = require("./../midlewares/validation/childrenValidation");
const validatonResult = require("./../midlewares/validation/validatorResult");
const router = express.Router();

router
  .route("/child")
  .get(isTeacherOrAdmin, controller.getAllChildren)
  .post(
    isAdmin,
    photoController.upload.single('file'),
    childrenInsertValidator,
    validatonResult,
    controller.insertChild
  )
  .patch(
    isAdmin,
    photoController.upload.single('file'),
    childrenUpdateValidator,
    validatonResult,
    controller.updateChild
  );

router
  .route("/child/:id")
  .get(isTeacherOrAdmin, childrenIdValidator, validatonResult, controller.getChildById)
  .delete(
    isAdmin,
    childrenIdValidator,
    validatonResult,
    controller.deleteChild
  );

module.exports = router;
