const express = require("express");
const controller = require("./../controller/classController");
const {
  classInsertValidator,
  classUpdateValidator,
  classIdValidator,
} = require("./../midlewares/validation/classValidation");
const validatonResult = require("./../midlewares/validation/validatorResult");
const { isAdmin,isTeacherOrAdmin } = require("./../midlewares/authenticationMW");
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Class:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       supervisor:
 *         type: string
 *       childrenIDS:
 *         type: array
 *         items:
 *           type: integer
 */

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all classes
 *     description: Retrieve a list of all classes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of classes
 *   post:
 *     summary: Create a new class
 *     description: Create a new class
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: class
 *         description: The class object to be created
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Class'
 *     responses:
 *       '200':
 *         description: Successfully created class
 *   patch:
 *     summary: Update a class
 *     description: Update an existing class
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: class
 *         description: The class object to be updated
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Class'
 *     responses:
 *       '200':
 *         description: Successfully updated class
 */

router
  .route("/class")
  .get(isTeacherOrAdmin, controller.getAllClasses)
  .post(isAdmin, classInsertValidator, validatonResult, controller.insertClass)
  .patch(
    isAdmin,
    classUpdateValidator,
    validatonResult,
    controller.updateClass
  );

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get class by ID
 *     description: Retrieve a class by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the class to retrieve
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: A single class object
 *   delete:
 *     summary: Delete class by ID
 *     description: Delete a class by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the class to delete
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: Successfully deleted class
 */

router
  .route("/class/:id")
  .get(isTeacherOrAdmin, controller.getClassById)
  .delete(isAdmin, controller.deleteClass);

/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Get children of a class
 *     description: Retrieve children belonging to a class by class ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the class to retrieve children from
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: A list of children belonging to the class
 */

router
  .route("/class/child/:id")
  .get(isTeacherOrAdmin, classIdValidator, validatonResult, controller.getClassChildren);


/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Get supervisor of a class
 *     description: Retrieve supervisor of a class by class ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the class to retrieve supervisor from
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: Supervisor of the class
 */  

router
  .route("/class/teacher/:id")
  .get(
    isAdmin,
    classIdValidator,
    validatonResult,
    controller.getClassSupervisor
  );

module.exports = router;
