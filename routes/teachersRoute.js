const express = require("express");
const controller = require("./../controller/teachersController");
const photoController = require("./../controller/photoController");
const {
  teachersInsertValidator,
  teachersUpdateValidator,
  teacherIdValidator,
  teachersChangePasswordValidator,
  deleteSupervisorValidator,
} = require("./../midlewares/validation/teachersValidation");
const validatonResult = require("./../midlewares/validation/validatorResult");
const {
  isAdmin,
  isTeacherOrAdmin,
} = require("./../midlewares/authenticationMW");
const router = express.Router();

router.route("/teachers/supervisors").get(controller.getAllSupervisors);

router
  .route("/teachers")
  .get(isAdmin, controller.getAllTeachers)
  .post(
    isAdmin,
    photoController.upload.single("file"),
    teachersInsertValidator,
    validatonResult,
    controller.insertTeacher
  )
  .patch(
    isAdmin,
    photoController.upload.single("file"),
    teachersUpdateValidator,
    validatonResult,
    controller.updateTeacher
  );

router
  .route("/teachers/:id")
  .get(isAdmin, teacherIdValidator, validatonResult, controller.getTeacherById)
  .delete(
    isAdmin,
    teacherIdValidator,
    deleteSupervisorValidator,
    validatonResult,
    controller.deleteTeacher
  );

router
  .route("/teachers/changePassword")
  .patch(
    isAdmin,
    teachersChangePasswordValidator,
    validatonResult,
    controller.changeTeacherPassword
  );

module.exports = router;
