const express = require("express");
const controller = require("./../controller/teachersController");
const {
  teachersInsertValidator,
  teachersUpdateValidator,
  teacherIdValidator,
  teachersChangePasswordValidator,
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
    teachersInsertValidator,
    validatonResult,
    controller.insertTeacher
  )
  .patch(
    isAdmin,
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
