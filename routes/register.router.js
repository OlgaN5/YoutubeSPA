const express = require('express')
const registerController = require('../controllers/register.controller')

const router = express.Router()

const {
    body
} = require('express-validator')


const registerValidation = [
    body('login').notEmpty().escape().isString().isLength({
        min: 3,
        max: 10
    }).withMessage('Login has to be between 3 and 10'),
    body('email').notEmpty().escape().isString().isEmail().withMessage(`It isn't email`),
    body('password').notEmpty().escape().isString().isLength({
        min: 3,
        max: 15
    }).withMessage('Password has to be between 3 and 15'),
]
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