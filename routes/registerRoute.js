const express = require("express");
const teacherController = require("./../controller/teachersController");
const {
  teachersInsertValidator,
} = require("./../midlewares/validation/teachersValidation");
const validatonResult = require("./../midlewares/validation/validatorResult");
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
 * /register:
 *   post:
 *     summary: Register a new teacher
 *     description: Register a new teacher
 *     parameters:
 *       - in: body
 *         name: teacher
 *         description: The teacher object to be registered
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Teacher'
 *     responses:
 *       '200':
 *         description: Successfully registered teacher
 */
router
  .route("/register")
  .post(
    teachersInsertValidator,
    validatonResult,
    teacherController.insertTeacher
  );

module.exports = router;
