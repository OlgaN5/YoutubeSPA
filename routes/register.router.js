const express = require('express')
const registerController = require('../controllers/register.controller')

const router = express.Router()
const {
    registerValidation
} = require('../utils/validations')
/**
 * @swagger
 * /api/register/:
 *   post:
 *     tags:
 *       - Register
 *     requestBody:
 *       description: user
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             required: 
 *               - login
 *               - email
 *               - password
 *             properties: 
 *               login:
 *                 type: string
 *                 default: login
 *               email:
 *                 type: string
 *                 default: email@gmail.com
 *               password:
 *                 type: string
 *                 default: password              
 *     description: returns registered user
 *     summary: use to register user
 *     responses:
 *       '201': 
 *         description: User registered succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 login: 
 *                   type: string
 *                   default: login
 *                 email: 
 *                   type: string
 *                   default: email@gmail.com
 *                 googleToken: 
 *                   type: object
 *                   default: null
 *                 createdAt: 
 *                   type: string
 *                   default: 2023-11-21T11:46:49.630Z
 *                 updatedAt: 
 *                   type: string
 *                   default: 2023-11-21T11:46:49.630Z
 *       '400': 
 *         description: Bad Request  
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   default: login is exist   
 */

router.post('/', registerValidation, registerController.register)

module.exports = router