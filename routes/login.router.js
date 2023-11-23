const express = require('express')

const {
    loginValidation
} = require('../utils/validations')

const router = express.Router()
const loginController = require('../controllers/login.controller')
/**
 * @swagger
 * /api/login/:
 *   post:
 *     tags: 
 *       - Login
 *     description: gets login and password. Checks if such user is exist is system and returns token if everything ok
 *     summary: use to get token and login user
 *     requestBody:
 *       description: user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 default: login
 *               password:
 *                 type: string
 *                 default: password
 *     responses:
 *       '200':
 *         description: Logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAwNTc0MjA2fQ.3dUH8wUMJVx__Kp1-7RDo6L47e2HccbcwYpnDnYvCjA
 *       '400':
 *         description: Bad Request 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: login not exist
 *       '401':
 *         description: Unauthorized 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: password invalid
 */
router.post('/', loginValidation, loginController.login)

module.exports = router