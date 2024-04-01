const express = require("express");
const controller = require("./../controller/childController");
const photoController = require("./../controller/photoController");
const {
  isAdmin,
  isTeacherOrAdmin,
} = require("./../midlewares/authenticationMW");

const {
  childrenInsertValidator,
  childrenUpdateValidator,
  childrenIdValidator,
} = require("./../midlewares/validation/childrenValidation");
const validatonResult = require("./../midlewares/validation/validatorResult");
const router = express.Router();

/**
 * @swagger
 * /child:
 *   get:
 *     summary: Get all children
 *     description: Retrieve a list of all children
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a new child
 *     description: Create a new child with provided information
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: file
 *         in: formData
 *         type: file
 *         description: The image of the child (optional)
 *       - name: fullName
 *         in: formData
 *         type: string
 *         required: true
 *         description: The full name of the child
 *       - name: age
 *         in: formData
 *         type: integer
 *         required: true
 *         description: The age of the child
 *       - name: level
 *         in: formData
 *         type: string
 *         required: true
 *         enum: [PreKG, KG1, KG2]
 *         description: The level of the child
 *       - name: city
 *         in: formData
 *         type: string
 *         required: true
 *         description: The city of the child's address
 *       - name: street
 *         in: formData
 *         type: string
 *         required: true
 *         description: The street of the child's address
 *       - name: building
 *         in: formData
 *         type: string
 *         required: true
 *         description: The building of the child's address
 *     responses:
 *       201:
 *         description: Created
 *   patch:
 *     summary: Update a child
 *     description: Update an existing child with new information
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: id
 *         in: query
 *         type: integer
 *         required: true
 *         description: The ID of the child to update
 *       - name: file
 *         in: formData
 *         type: file
 *         description: The updated image of the child (optional)
 *       - name: fullName
 *         in: formData
 *         type: string
 *         description: The updated full name of the child
 *       - name: age
 *         in: formData
 *         type: integer
 *         description: The updated age of the child
 *       - name: level
 *         in: formData
 *         type: string
 *         enum: [PreKG, KG1, KG2]
 *         description: The updated level of the child
 *       - name: city
 *         in: formData
 *         type: string
 *         description: The updated city of the child's address
 *       - name: street
 *         in: formData
 *         type: string
 *         description: The updated street of the child's address
 *       - name: building
 *         in: formData
 *         type: string
 *         description: The updated building of the child's address
 *     responses:
 *       200:
 *         description: Updated
 */

router
  .route("/child")
  .get(isTeacherOrAdmin, controller.getAllChildren)
  .post(
    isAdmin,
    photoController.upload.single("file"),
    childrenInsertValidator,
    validatonResult,
    controller.insertChild
  )
  .patch(
    isAdmin,
    photoController.upload.single("file"),
    childrenUpdateValidator,
    validatonResult,
    controller.updateChild
  );

/**
 * @swagger
 *  securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 * /child/{id}:
 *   get:
 *     summary: Get child by ID
 *     description: Retrieve a child by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *         description: The ID of the child to retrieve
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete child by ID
 *     description: Delete a child by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *         description: The ID of the child to delete
 *     responses:
 *       204:
 *         description: No Content
 */

router
  .route("/child/:id")
  .get(
    isTeacherOrAdmin,
    childrenIdValidator,
    validatonResult,
    controller.getChildById
  )
  .delete(
    isAdmin,
    childrenIdValidator,
    validatonResult,
    controller.deleteChild
  );

module.exports = router;
