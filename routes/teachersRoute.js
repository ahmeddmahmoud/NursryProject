const express = require("express");
const controller = require("./../controller/teachersController");
const {
  teachersInsertValidator,
  teachersUpdateValidator,
  teacherIdValidator,
} = require("./../midlewares/validation/teachersValidation");
const validatonResult = require("./../midlewares/validation/validatorResult");
const { isAdmin } = require("./../midlewares/authenticationMW");
const router = express.Router();

router.route("/teachers/supervisors").get(controller.getAllSupervisors);

router
  .route("/teachers")
  .get(isAdmin, controller.getAllTeachers)
  .post(isAdmin, teachersInsertValidator, validatonResult, controller.insertTeacher)
  .patch(isAdmin, teachersUpdateValidator, validatonResult, controller.updateTeacher);

router
  .route("/teachers/:id")
  .get(isAdmin, teacherIdValidator, validatonResult, controller.getTeacherById)
  .delete(isAdmin, teacherIdValidator, validatonResult, controller.deleteTeacher);

module.exports = router;
