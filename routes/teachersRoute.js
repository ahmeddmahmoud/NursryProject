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

/**
 * @swagger
 * definitions:
 *   Teacher:
 *     type: object
 *     properties:
 *       fullName:
 *         type: string
 *       password:
 *         type: string
 *       email:
 *         type: string
 *       image:
 *         type: string
 */

/**
 * @swagger
 * /teachers/supervisors:
 *   get:
 *     summary: Get all supervisors
 *     description: Retrieve a list of all supervisors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of supervisors
 */
router.route("/teachers/supervisors").get(controller.getAllSupervisors);

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     description: Retrieve a list of all teachers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of teachers
 *   post:
 *     summary: Create a new teacher
 *     description: Create a new teacher
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: teacher
 *         description: The teacher object to be created
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Teacher'
 *     responses:
 *       '200':
 *         description: Successfully created teacher
 *   patch:
 *     summary: Update a teacher
 *     description: Update an existing teacher
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: teacher
 *         description: The teacher object to be updated
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Teacher'
 *     responses:
 *       '200':
 *         description: Successfully updated teacher
 */
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

  /**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     description: Retrieve a teacher by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the teacher to retrieve
 *         required: true
 *         type: ObjectId
 *     responses:
 *       '200':
 *         description: A single teacher object
 *   delete:
 *     summary: Delete teacher by ID
 *     description: Delete a teacher by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the teacher to delete
 *         required: true
 *         type: ObjectId
 *     responses:
 *       '200':
 *         description: Successfully deleted teacher
 */
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

  /**
 * @swagger
 * /teachers/changePassword:
 *   patch:
 *     summary: Change teacher password
 *     description: Change password of a teacher
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: password
 *         description: The new password for the teacher
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: ObjectId
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: Password changed successfully
 */
router
  .route("/teachers/changePassword")
  .patch(
    isAdmin,
    teachersChangePasswordValidator,
    validatonResult,
    controller.changeTeacherPassword
  );

module.exports = router;
