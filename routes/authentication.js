const express = require("express");
const controller = require("./../controller/authenticationController");
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticate a user (either a teacher or an admin) and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: teacher@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: @Password123
 *     responses:
 *       '200':
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Authentication status
 *                   example: Authenticated
 *                 token:
 *                   type: string
 *                   description: JWT token for accessing protected routes
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *     security:
 *       - JWT: []
 * 
 * securityDefinitions:
 *   JWT:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: Enter JWT token in the format `Bearer <token>`
 */

router.post("/login", controller.checkTeacher);

module.exports = router;
