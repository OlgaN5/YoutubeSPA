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
 *       '200': 
 *         description: User registered succesfully
 *       '400': 
 *         description: Email or login is exist       
 */

router.post('/', registerValidation, registerController.register)

module.exports = router